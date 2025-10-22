// slick-carousel.js - Refactored
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slick-carousel-track");
  const nextBtn = document.querySelector(".btn-slick-next");
  const prevBtn = document.querySelector(".btn-slick-prev");
  const dotsContainer = document.querySelector(".carousel-dots");

  let state = {
    originalSlides: [],
    allSlides: [],
    currentIndex: 0,
    slidesToShow: 4,
    resizeTimer: null,
  };

  // Utilities
  const getSlidesToShow = () => {
    const w = window.innerWidth;
    return w <= 480 ? 1 : w <= 768 ? 2 : w <= 1024 ? 3 : 4;
  };

  const debounce =
    (fn, wait = 150) =>
    (...args) => {
      clearTimeout(state.resizeTimer);
      state.resizeTimer = setTimeout(() => fn(...args), wait);
    };

  const setSlideStyle = (slides, pct) =>
    slides.forEach((el) => {
      el.style.cssText = `flex: 0 0 ${pct}%; max-width: ${pct}%; display: block;`;
    });

  // Cleanup
  const cleanup = () => {
    dotsContainer.innerHTML = "";
    track.querySelectorAll('[data-clone="true"]').forEach((el) => el.remove());
    state.originalSlides.forEach((img) => (img.style.cssText = ""));
  };

  // Create clones
  const createClones = () => {
    const { originalSlides, slidesToShow } = state;
    const count = originalSlides.length;

    const cloneSlides = (slides) =>
      slides.map((img) => {
        const clone = img.cloneNode(true);
        clone.dataset.clone = "true";
        return clone;
      });

    const firstGroup = cloneSlides(originalSlides.slice(0, slidesToShow));
    const lastGroup = cloneSlides(originalSlides.slice(count - slidesToShow));

    firstGroup.forEach((n) => track.appendChild(n));
    lastGroup.reverse().forEach((n) => track.insertBefore(n, track.firstChild));
  };

  // Update position
  const updatePosition = (withTransition = true) => {
    const slideWidth = track.clientWidth / state.slidesToShow;
    track.style.transition = withTransition ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(-${state.currentIndex * slideWidth}px)`;
    updateDots();
  };

  // Update dots
  const updateDots = () => {
    const { originalSlides, slidesToShow, currentIndex } = state;
    const dotCount = Math.max(1, originalSlides.length - slidesToShow + 1);
    const activeDotIndex =
      (((currentIndex - slidesToShow) % dotCount) + dotCount) % dotCount;

    [...dotsContainer.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === activeDotIndex);
    });
  };

  // Create dots
  const createDots = () => {
    const { originalSlides, slidesToShow } = state;
    const dotCount = Math.max(1, originalSlides.length - slidesToShow + 1);

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.onclick = () => {
        state.currentIndex = slidesToShow + i;
        updatePosition();
      };
      dotsContainer.appendChild(dot);
    }
  };

  // Handle transition end
  const handleTransitionEnd = () => {
    const { originalSlides, slidesToShow } = state;
    const count = originalSlides.length;

    if (state.currentIndex >= slidesToShow + count) {
      state.currentIndex = slidesToShow;
      updatePosition(false);
    } else if (state.currentIndex < slidesToShow) {
      state.currentIndex = slidesToShow + count - 1;
      updatePosition(false);
    }
  };

  // Slide navigation
  const slideTo = (index) => {
    state.currentIndex = index;
    updatePosition();
  };

  // Initialize
  const init = () => {
    state.originalSlides = [...track.querySelectorAll("img:not([data-clone])")];
    if (state.originalSlides.length === 0) return;

    state.slidesToShow = getSlidesToShow();
    cleanup();

    const pct = 100 / state.slidesToShow;
    setSlideStyle(state.originalSlides, pct);

    createClones();
    state.allSlides = [...track.children];
    setSlideStyle(state.allSlides, pct);

    state.currentIndex = state.slidesToShow;
    updatePosition(false);
    createDots();

    track.addEventListener("transitionend", handleTransitionEnd, {
      once: false,
    });
    prevBtn.onclick = () => slideTo(state.currentIndex - 1);
    nextBtn.onclick = () => slideTo(state.currentIndex + 1);
  };

  // Handle resize
  const handleResize = debounce(() => {
    track.removeEventListener("transitionend", handleTransitionEnd);
    cleanup();
    init();
  }, 120);

  window.addEventListener("resize", handleResize);
  init();
});
