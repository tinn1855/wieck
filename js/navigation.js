(() => {
  const boot = () => {
    const header = document.querySelector(".header");
    const hero = document.querySelector(".hero-section");
    if (header) {
      const updateHeaderState = () => {
        const scrolledPastHero = hero
          ? window.scrollY >= hero.offsetHeight - header.offsetHeight
          : window.scrollY > 0;
        const scrolled = window.scrollY > 0;

        header.style.padding = scrolled ? "10px 0" : "";

        header.classList.toggle("header--scrolled", scrolledPastHero);
      };

      updateHeaderState();
      window.addEventListener("scroll", updateHeaderState, { passive: true });
      window.addEventListener("resize", updateHeaderState);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
