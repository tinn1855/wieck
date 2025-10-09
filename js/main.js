document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const button = item.querySelector("button");
    const content = item.querySelector(".accordion-item-content");

    if (button && content) {
      button.addEventListener("click", () => {
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherContent = otherItem.querySelector(
              ".accordion-item-content"
            );
            const otherButton = otherItem.querySelector("button");
            if (otherContent) otherContent.classList.remove("open");
            if (otherButton) otherButton.classList.remove("active");
          }
        });

        content.classList.toggle("open");
        button.classList.toggle("active");
      });
    }
  });

  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const mobileNavClose = document.getElementById("mobile-nav-close");
  const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
  const mobileNavIcon = mobileNavToggle?.querySelector("i");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", () => {
      const isActive = mobileNavOverlay.classList.contains("active");

      if (isActive) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  function openMobileNav() {
    mobileNavOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    if (mobileNavIcon) {
      mobileNavIcon.className = "fa-solid fa-xmark";
    }
  }

  function closeMobileNav() {
    mobileNavOverlay.classList.remove("active");
    document.body.style.overflow = "";

    if (mobileNavIcon) {
      mobileNavIcon.className = "fa-solid fa-bars";
    }
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

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const dropdownMenu = toggle.nextElementSibling;
      const isActive = toggle.classList.contains("active");

      dropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          otherToggle.classList.remove("active");
          otherToggle.nextElementSibling.classList.remove("active");
        }
      });

      toggle.classList.toggle("active");
      dropdownMenu.classList.toggle("active");
    });
  });

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
    if (e.key === "Escape" && mobileNavOverlay.classList.contains("active")) {
      closeMobileNav();
    }
  });
});
