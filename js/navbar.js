const navbar = (navbar) => {
  const mainNavbar = document.querySelector(navbar);
  const toggleBtn = mainNavbar.querySelector(".navbar-toggler");
  const collapse = mainNavbar.querySelector(".collapse");
  const navLinks = mainNavbar.querySelectorAll(".nav-link");
  const allSections = document.querySelectorAll("section");

  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("change");
    collapse.classList.toggle("show");
  });

  navLinks.forEach((ele) => {
    ele.addEventListener("click", () => {
      navLinks.forEach((ele) => ele.classList.remove("active"));

      if (toggleBtn.classList.contains("change")) {
        toggleBtn.classList.remove("change");
        collapse.classList.remove("show");
      }
      ele.classList.add("active");
    });
  });
  const sectionProprarities = {
    rootMargin: "0px 0px 50px 0px",
    threshold: 0.2,
  };

  const allSectionOnObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.attributes.id.value;
        if (currentId !== "home") {
          mainNavbar.classList.add("sticky");
        } else {
          mainNavbar.classList.remove("sticky");
        }
        navLinks.forEach((navLink) => {
          navLink.classList.remove("active");
          if (navLink.getAttribute("href") === `#${currentId}`) {
            navLink.classList.add("active");
          }
        });
      }
    });
  }, sectionProprarities);

  allSections.forEach((section) => {
    allSectionOnObserver.observe(section);
  });
};

navbar(".navbar");
