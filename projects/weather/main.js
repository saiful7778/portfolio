const mainContainer = document.querySelector(".container"),
  inputPart = mainContainer.querySelector(".input-section"),
  infoData = mainContainer.querySelector(".info"),
  inputField = mainContainer.querySelector(".input-field"),
  button = mainContainer.querySelector("button"),
  dataSection = mainContainer.querySelector(".data-section"),
  weatherIcon = mainContainer.querySelector(".weather-icon"),
  closeBtn = mainContainer.querySelector(".back-btn");

let api;
const apiKey = "9a958c66648cff65619f5a8d3c929a6c";

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  infoData.innerHTML = error.message;
  infoData.classList.add("error");
}

function requestApi(place) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`;
  fetchData();
}

function fetchData() {
  infoData.innerHTML = "Gettings weather details.....";
  infoData.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((data) => weatherDetails(data));
}

function weatherDetails(info) {
  infoData.classList.replace("pending", "error");
  if (info.cod == "404") {
    infoData.innerHTML = `${inputField.value} not valid`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    if (id == 800) {
      weatherIcon.src = "./Weather Icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      weatherIcon.src = "./Weather Icons/strom.svg";
    } else if (id >= 600 && id <= 622) {
      weatherIcon.src = "./Weather Icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      weatherIcon.src = "./Weather Icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      weatherIcon.src = "./Weather Icons/cloud.svg";
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      weatherIcon.src = "./Weather Icons/rain.svg";
    }

    dataSection.querySelector(".temp-data-1").innerText = `${Math.floor(
      temp
    )}°C`;
    dataSection.querySelector(".weather-status").innerText = description;
    dataSection.querySelector(".location").innerText = `${city}, ${country}`;
    dataSection.querySelector(".temp-data-2").innerText = `${feels_like}°C`;
    dataSection.querySelector(".hume-data").innerText = `${humidity}%`;

    infoData.classList.remove("pending", "error");
    mainContainer.classList.add("active");
  }
}

closeBtn.addEventListener("click", () => {
  mainContainer.classList.remove("active");
});
