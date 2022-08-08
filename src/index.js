//  Current Date

let now = new Date();
function timeDay(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day}, ${hour}:${minutes}`;
  return formattedDate;
}
let date = document.querySelector("#currentDate");
date.innerHTML = timeDay(now);

// City Search

function searchCity(city) {
  let apiKey = "5b59ec905ccba83d494beb36e2d1e6e9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#city-input");
  searchCity(selectedCity.value);
}

// Temperature Units to Fahrenheit
function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  changeUnitCelcius.classList.remove("active");
  changeUnitFahrenheit.classList.add("active");
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

// Temperature Units to Celcius

function changeCelcius(event) {
  event.preventDefault();
  changeUnitCelcius.classList.add("active");
  changeUnitFahrenheit.classList.remove("active");
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celciusTemperature);
}

// Forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2" id="day-forecast">
            <h3>${day}</h3>
            <img
                  src="https://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature.min">19°|</span>
              <span class="weather-forecast-temperature.min">26°</span>  
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Temp display by city search
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let h1 = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  h1.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Display forecast for current location based on coordinates
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "5b59ec905ccba83d494beb36e2d1e6e9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function localTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

// Background changes color to dark theme between sunset & sunrise
function backgroundImage() {
  let colorElement = document.querySelector(".card");
  let hour = new Date().getHours();
  if (hour >= 7 && hour < 20) {
    colorElement.style.backgroundImage =
      "linear-gradient(179.1deg, rgb(247, 238, 238) -1.9%, rgb(247, 202, 201) 44.9%, rgb(145, 168, 208) 96.1%)";
  } else {
    colorElement.style.backgroundImage =
      "linear-gradient(0deg, rgb(119, 111, 113) 41%, rgb(116, 99, 158) 100%)";
  }
}
backgroundImage();

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let changeUnitFahrenheit = document.querySelector("#fahrenheit-link");
changeUnitFahrenheit.addEventListener("click", changeFahrenheit);

let changeUnitCelcius = document.querySelector("#celcius-link");
changeUnitCelcius.addEventListener("click", changeCelcius);

let currentbutton = document.querySelector("#local-temp");
currentbutton.addEventListener("click", localTemp);

searchCity("New York");
displayForecast();
