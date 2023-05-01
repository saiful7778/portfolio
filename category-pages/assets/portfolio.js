// declear variables
const portfolioSection = document.querySelector(".portfolio-section");
const portfolioItems = portfolioSection.querySelectorAll(
  ".portfolio-items .portfolio-item"
);
const showBtns = portfolioSection.querySelectorAll(".overlay .btn");
const portfolioTitle = portfolioSection.querySelectorAll(".item-title");
let previewItems;
let closeBtn;

// function to create elements
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
  button.className = "btn live-preview";
  button.setAttribute("href", `${link}`);

  previewImage.src = img;
  closBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  preTitle.innerHTML = title;
  preDescription.innerHTML = des;
  button.innerText = "live preview";

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
// create elements
portfolioItems.forEach((item) => {
  createPreviewElement(
    item.querySelector(".portfolio-img").src,
    item.querySelector(".preview-item-title").innerHTML,
    item.querySelector(".preview-item-description").innerHTML,
    item.querySelector(".preview-item-link").innerHTML,
    portfolioSection
  );
});

showBtns.forEach((btn, idx) => {
  previewItems = portfolioSection.querySelectorAll(".preview");

  btn.addEventListener("click", () => {
    previewItems.forEach((ele) => ele.classList.remove("active"));
    previewItems[idx].classList.add("active");
  });
});

previewItems.forEach((ele) => {
  closeBtn = document.querySelectorAll(".close-btn");
  ele.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return;
    ele.classList.remove("active");
  });
  closeBtn.forEach((button) => {
    button.addEventListener("click", () => {
      ele.classList.remove("active");
    });
  });
});
