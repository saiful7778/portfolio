const autoTypingSentence = [
  "web development",
  "template to HTML",
  "wordpress",
  "framework",
];

const autoTyping = new Typed(".auto-type", {
  strings: autoTypingSentence,
  typeSpeed: 30,
  backSpeed: 1,
  loop: true,
  loopCount: Infinity,
  showCursor: true,
  cursorChar: "  >_",
});

const portfolioNavbar = document.querySelectorAll(".portfolio-nav .btn");
const portfolioItem = document.querySelectorAll(".portfolio-items .item");

portfolioNavbar.forEach((ele) => {
  ele.addEventListener("click", () => {
    portfolioNavbar.forEach((item) => item.classList.remove("active"));

    ele.classList.add("active");
    hideAll();

    const portfolioItem = document.querySelectorAll(
      "." + ele.getAttribute("data-target")
    );
    portfolioItem.forEach((ele) => {
      ele.classList.remove("not-show");
      ele.classList.add("show");
    });
  });
});

const hideAll = () => {
  portfolioItem.forEach((ele) => {
    ele.classList.add("not-show");
    ele.classList.remove("show");
  });
};

const createPreviewElement = (img, title, des, link, mainElement) => {
  const previewBox = document.createElement("div"),
    container = document.createElement("div"),
    imgCol = document.createElement("div"),
    previewImage = document.createElement("img"),
    desCol = document.createElement("div"),
    closBtn = document.createElement("button"),
    preTitle = document.createElement("h5"),
    preDescription = document.createElement("p"),
    button = document.createElement("a");

  previewBox.className = "preview";
  container.className = "main-container";
  imgCol.className = "preview-img-section";
  previewImage.className = "preview-img";
  desCol.className = "des-col";
  closBtn.className = "close-btn btn";
  closBtn.type = "button";
  preTitle.className = "preview-title title";
  preDescription.className = "description";
  button.className = "btn";

  previewImage.src = img;
  closBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  preTitle.innerText = title;
  preDescription.innerText = des;
  button.innerText = "live preview";
  button.href = link;
  button.setAttribute("target", "_blank");

  previewBox.appendChild(container);
  container.appendChild(imgCol);
  imgCol.appendChild(previewImage);
  container.appendChild(desCol);
  desCol.appendChild(closBtn);
  desCol.appendChild(preTitle);
  desCol.appendChild(preDescription);
  desCol.appendChild(button);

  mainElement.appendChild(previewBox);
};

// portfolio section
const portfolioSection = document.querySelector(".portfolio-section");
const portfolioTemplate = portfolioSection.querySelector("#preview-template");
const showBtn = portfolioSection.querySelectorAll(".overlay .btn");

portfolioItem.forEach((ele) => {
  createPreviewElement(
    ele.querySelector(".portfolio-img").src,
    ele.querySelector(".item-title").innerText,
    ele.querySelector(".item-description").innerText,
    ele.querySelector(".item-link").innerText,
    portfolioSection
  );
});
const previewItem = portfolioSection.querySelectorAll(".preview");

showBtn.forEach((ele, idx) => {
  ele.addEventListener("click", () => {
    const previewItem = portfolioSection.querySelectorAll(".preview");
    previewItem[
      idx
    ].style = `display: flex; justify-content: center; align-items: center`;
  });
});
const closeBtn = document.querySelectorAll(".close-btn");
previewItem.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return;
    ele.style.display = "none";
  });
  closeBtn.forEach((button) => {
    button.addEventListener("click", () => {
      ele.style.display = "none";
    });
  });
});
