const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-content");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const dotsContainer = document.querySelectorAll(".carousel-dots");

let currentIndex = 0;
const dots = [];

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("carousel-dot");
  if (i === 0) dot.classList.add("active");
  dotsContainer[0].appendChild(dot);
  dots.push(dot);
});

function showSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // dịch chuyển track
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // cập nhật dots
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

prevBtn.addEventListener("click", () => {
  showSlide(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
  });
});

// khởi tạo
showSlide(currentIndex);
