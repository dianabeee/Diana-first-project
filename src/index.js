//Function that gets the input value and replace it with the city name
//function search(event) {
//event.preventDefault();
//let searchInput = document.querySelector("#search-input");
//let countryName = document.querySelector("#country-name");
//countryName.innerHTML = searchInput.value;

function updateDateTime() {
  let dateContainer = document.querySelector("#current-date-time");
  let currentTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let monthNames = [
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
    "December"
  ];

  let day = currentTime.getDate();
  let year = currentTime.getFullYear();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDay = days[currentTime.getDay()];
  let month = monthNames[currentTime.getMonth()];

  dateContainer.innerHTML = `<span class="highlight-color">${weekDay}</span>  |  ${day} ${month} ${year}  |  ${hours}h${minutes}`;
}

updateDateTime();

let apiKey = "90bc80c014027dcb3d7d5c00b2878266";
//let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${apiKey}`;

function displayTemperature(response) {
  //let temperature = Math.round(response.data.main.temp);
  //let h2 = document.querySelector("h2");
  //h2.innerHTML = `${temperature}ºC`;
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${celsiusTemperature}`;
  currentWeather.innerHTML = response.data.weather[0].main.toUpperCase();
  let precipitation = document.querySelector("#Precipitation");
  precipitation.innerHTML = Math.round(response.data.main.humidity) + "%";
  let wind = document.querySelector("#Wind");
  wind.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function formatHours(timestamp) {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastElement.innerHTML = `
  <div class="col-2">
    <h3>${formatHours(forecast.dt)}</h3>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt="icon" />
    <div class="weather-forecast-temperature">
    <strong>${Math.round(forecast.main.temp_max)}º </strong>|
     ${Math.round(forecast.main.temp_min)}º</div>
  </div>`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value.toUpperCase();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentWeather = document.querySelector("#current-weather");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
