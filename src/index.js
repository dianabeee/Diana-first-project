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
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}ºC`;
  currentWeather.innerHTML = response.data.weather[0].main.toUpperCase();
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value.toUpperCase();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
}

let currentWeather = document.querySelector("#current-weather");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
