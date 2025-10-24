(() => {
  const boot = () => {
    // Header scroll state
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

    // Mobile navigation toggle
    const mobileNavToggle = document.getElementById("mobile-nav-toggle");
    const mobileNavClose = document.getElementById("mobile-nav-close");
    const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
    const mobileNavIcon = mobileNavToggle?.querySelector("i");
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    function openMobileNav() {
      if (mobileNavOverlay) {
        mobileNavOverlay.classList.add("active");
        document.body.style.overflow = "hidden";

        if (mobileNavIcon) {
          mobileNavIcon.className = "fa-solid fa-xmark";
        }
      }
    }

    function closeMobileNav() {
      if (mobileNavOverlay) {
        mobileNavOverlay.classList.remove("active");
        document.body.style.overflow = "";

        if (mobileNavIcon) {
          mobileNavIcon.className = "fa-solid fa-bars";
        }
      }
    }

    if (mobileNavToggle) {
      mobileNavToggle.addEventListener("click", () => {
        const isActive = mobileNavOverlay?.classList.contains("active");

        if (isActive) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (mobileNavClose) {
      mobileNavClose.addEventListener("click", closeMobileNav);
    }

    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener("click", (e) => {
        if (e.target === mobileNavOverlay) {
          closeMobileNav();
        }
      });
    }

    // Mobile nav dropdown toggles
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const dropdownMenu = toggle.nextElementSibling;
        const isActive = toggle.classList.contains("active");

        dropdownToggles.forEach((otherToggle) => {
          if (otherToggle !== toggle) {
            otherToggle.classList.remove("active");
            otherToggle.nextElementSibling?.classList.remove("active");
          }
        });

        toggle.classList.toggle("active");
        dropdownMenu?.classList.toggle("active");
      });
    });

    // Close mobile nav when clicking on links (except dropdown toggles)
    const mobileNavLinks = document.querySelectorAll(
      ".mobile-nav-link:not(.dropdown-toggle)"
    );
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!link.classList.contains("dropdown-toggle")) {
          closeMobileNav();
        }
      });
    });

    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        mobileNavOverlay?.classList.contains("active")
      ) {
        closeMobileNav();
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
