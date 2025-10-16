(() => {
  const boot = () => {
    const header = document.querySelector(".header");

    console.log("Header element found:", !!header);

    if (header) {
      const updateHeaderState = () => {
        const scrolled = window.scrollY > 0;

        console.log("Scroll position:", window.scrollY);
        console.log("Should be scrolled:", scrolled);

        if (scrolled) {
          header.classList.add("header--scrolled");
          document.body.classList.add("body--header-scrolled");
        } else {
          header.classList.remove("header--scrolled");
          document.body.classList.remove("body--header-scrolled");
        }

        console.log(
          "Header has scrolled class:",
          header.classList.contains("header--scrolled")
        );
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
