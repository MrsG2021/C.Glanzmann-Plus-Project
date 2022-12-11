//Display date and time
let now = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[now.getMonth()];
  let date = now.getDate();
  return `${day},
  ${date} ${month},
   ${hours}:${minutes}`;
}
let currentDay = document.querySelector("h5#currentDay");
currentDay.innerHTML = formatDate();
//search engine
//Celsius and Farenhiet
//weather API

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let relevantHigh = document.querySelector("#currentHigh");
  let high = Math.round(response.data.main.temp_max);
  relevantHigh.innerHTML = `${high}°`;
  let relevantLow = document.querySelector("#currentLow");
  let low = Math.round(response.data.main.temp_min);
  relevantLow.innerHTML = `${low}°`;
  let relevantDetail = document.querySelector("#currentDetail");
  let detail = response.data.weather[0].description;
  relevantDetail.innerHTML = `${detail}`;

  let relevantTemp = document.querySelector("#currentTemp");
  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  relevantTemp.innerHTML = `${temperature}°`;

  let relevantFeel = document.querySelector("#currentFeel");
  let feel = Math.round(response.data.main.feels_like);
  relevantFeel.innerHTML = `${feel}°`;
  let relevantWind = document.querySelector("#currentWind");
  let wind = Math.round(response.data.wind.speed);
  relevantWind.innerHTML = `${wind}km/h`;
  let relevantHumid = document.querySelector("#currentHumidity");
  let humid = Math.round(response.data.main.humidity);
  relevantHumid.innerHTML = `${humid}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//figure
function searchCity(city) {
  let apiKey = "927cbb061ad81f32a640cb7d1573db66";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showWeather);
}

function yourLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "927cbb061ad81f32a640cb7d1573db66";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let farenhietTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenhietTemp);
}
let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", yourLocation);

let locationbtn = document.querySelector("#location-pin");
locationbtn.addEventListener("click", getCurrentLocation);
