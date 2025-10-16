document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");
  const service = [
    {
      title: "Enterprise Newsrooms",
      icon: "",
      image: "/assets/image/thumbnail/thumbnail.jpg",
      description:
        "Our enterprise newsroom solutions streamline content creation, collaboration, and distribution, empowering your team to deliver news faster and more efficiently.",
    },
    {
      title: "Digital Asset Management",
      icon: "",
      image: "/assets/image/thumbnail/thumbnail-02.jpg",
      description:
        "Our digital asset management solutions help you organize, store, and retrieve your media assets efficiently, ensuring your team can find and use the right content at the right time.",
    },
    {
      title: "Enterprise Newsrooms",
      icon: "",
      image: "/assets/image/thumbnail/thumbnail-03.jpg",
      description:
        "Our enterprise newsroom solutions streamline content creation, collaboration, and distribution, empowering your team to deliver news faster and more efficiently.",
    },
    {
      title: "Enterprise Newsrooms",
      icon: "",
      image: "/assets/image/thumbnail/thumbnail-04.jpg",
      description:
        "Our enterprise newsroom solutions streamline content creation, collaboration, and distribution, empowering your team to deliver news faster and more efficiently.",
    },
  ];

  const renderServices = document.getElementById("services");

  renderServices.innerHTML = service
    .map(
      (item) => `
        <a href="#">
          <div class="service-card hover-card">
            <div class="service-card-content">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 21H33"
                  stroke="#006E9E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 27H33"
                  stroke="#006E9E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 37.5C6.79565 37.5 7.55871 37.1839 8.12132 36.6213C8.68393 36.0587 9 35.2956 9 34.5V12C9 11.6022 9.15804 11.2206 9.43934 10.9393C9.72064 10.658 10.1022 10.5 10.5 10.5H40.5C40.8978 10.5 41.2794 10.658 41.5607 10.9393C41.842 11.2206 42 11.6022 42 12V34.5C42 35.2956 41.6839 36.0587 41.1213 36.6213C40.5587 37.1839 39.7956 37.5 39 37.5H6Z"
                  stroke="#006E9E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 37.5C5.20435 37.5 4.44129 37.1839 3.87868 36.6213C3.31607 36.0587 3 35.2956 3 34.5V16.5"
                  stroke="#006E9E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div>
                <h4 class="heading-4">${item.title}</h4>
                <p class="text-line-clamp-4">
                  ${item.description}
                </p>
              </div>
            </div>
            <div>
              <img
                src="${item.image}"
                alt="Thumbnail Card"
              />
            </div>
          </div>
        </a>
    `
    )
    .join("");

  accordionItems.forEach((item) => {
    const button = item.querySelector("button");
    const toggle = item.querySelector(".accordion-toggle");
    const content = item.querySelector(".accordion-item-content");

    if (button && content) {
      button.addEventListener("click", () => {
        // Kiểm tra nếu item hiện tại đang mở
        const isCurrentlyOpen = content.classList.contains("open");

        // Đếm số item đang mở
        const openItems = Array.from(accordionItems).filter((otherItem) =>
          otherItem
            .querySelector(".accordion-item-content")
            .classList.contains("open")
        );

        // Nếu chỉ có 1 item mở và đó là item hiện tại, không cho phép đóng
        if (isCurrentlyOpen && openItems.length === 1) {
          return;
        }

        // Đóng tất cả các item khác
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherContent = otherItem.querySelector(
              ".accordion-item-content"
            );
            const otherToggle = otherItem.querySelector(".accordion-toggle");
            const otherButton = otherItem.querySelector("button");
            if (otherContent) otherContent.classList.remove("open");
            if (otherToggle) otherToggle.classList.remove("active");
            if (otherButton) otherButton.classList.remove("active");
          }
        });

        // Toggle item hiện tại
        content.classList.toggle("open");
        if (toggle) toggle.classList.toggle("active");
        button.classList.toggle("active");
      });
    }
  });

  // Mở item đầu tiên mặc định
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    const firstContent = firstItem.querySelector(".accordion-item-content");
    const firstToggle = firstItem.querySelector(".accordion-toggle");
    const firstButton = firstItem.querySelector("button");
    if (firstContent) firstContent.classList.add("open");
    if (firstToggle) firstToggle.classList.add("active");
    if (firstButton) firstButton.classList.add("active");
  }

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
