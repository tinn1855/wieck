document.addEventListener("DOMContentLoaded", function () {
  // Data for 20 team members
  const teamMembers = [
    {
      name: "Tim Roberts",
      position: "Chief Executive Officer",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Sarah Johnson",
      position: "Chief Technology Officer",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Michael Chen",
      position: "Chief Marketing Officer",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Emily Rodriguez",
      position: "Head of Product Development",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "David Thompson",
      position: "Senior Software Engineer",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Jessica Wang",
      position: "UX/UI Designer",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Robert Martinez",
      position: "Data Scientist",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Lisa Anderson",
      position: "Project Manager",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "James Wilson",
      position: "DevOps Engineer",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Maria Garcia",
      position: "Quality Assurance Lead",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Kevin Lee",
      position: "Frontend Developer",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Amanda Taylor",
      position: "Content Strategist",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Christopher Brown",
      position: "Backend Developer",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Nicole Davis",
      position: "Business Analyst",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Ryan Miller",
      position: "Systems Administrator",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Stephanie Clark",
      position: "Customer Success Manager",
      image: "",
    },
    {
      name: "Daniel Lewis",
      position: "Security Specialist",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Rachel Turner",
      position: "HR Manager",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Brian Harris",
      position: "Sales Director",
      image: "assets/image/avatar/tim-roberts.png",
    },
    {
      name: "Jennifer White",
      position: "Operations Manager",
      image: "",
    },
  ];

  function createCardItem(member, index) {
    return `
      <div class="card-item" data-index="${index}">
        <img
          src="${member.image || "assets/image/avatar/default-avatar.png"}"
          alt="${member.name} - ${member.position}"
        />
        <div class="card-item-content">
          <h5 class="heading-5">${member.name}</h5>
          <p class="text-line-clamp-4">${member.position}</p>
        </div>
      </div>
    `;
  }

  function renderTeamMembers() {
    const listCardContainer = document.querySelector(".list-card");

    if (!listCardContainer) {
      console.warn("List card container not found");
      return;
    }

    const teamHTML = teamMembers.map(createCardItem).join("");
    listCardContainer.innerHTML = teamHTML;

    const cardItem = document.querySelectorAll(".card-item");
    cardItem.forEach((item) => {
      item.addEventListener("click", () => {
        const index = item.dataset.index;
        openModal(teamMembers[index]);
      });
    });
  }

  const modal = document.getElementById("teamModal");
  const modalImage = document.getElementById("modalImage");
  const modalName = document.getElementById("modalName");
  const modalPosition = document.getElementById("modalPosition");
  const closeBtn = modal.querySelector(".close-btn");

  function openModal(member) {
    modalImage.src = member.image || "assets/image/avatar/default-avatar.png";
    modalName.textContent = member.name;
    modalPosition.textContent = member.position;

    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  renderTeamMembers();
});
