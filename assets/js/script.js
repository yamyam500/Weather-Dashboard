const API_KEY = "045fbd56ca8c36f7626aa7ba8c409d79";
const searchBtn = document.querySelector("#search-btn");
const inputSearch = document.querySelector("#input-search");
const weatherContainer = document.querySelector(".weather-container");

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      renderWeatherData(data);
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      console.log(lat, lon);
      getForecastData(lat, lon);
    }
  } catch {
    if (err) throw err;
    console.log(err);
  }
}

async function getForecastData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      renderForecastData(data);
    }
  } catch (err) {
    console.log(err);
  }
}

function renderWeatherData(data) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const cardHeader = document.createElement("div");
  cardHeader.setAttribute("class", "card-header");
  const h2 = document.createElement("h2");
  const icon = document.createElement("img");
  icon.setAttribute(
    "src",
    "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  );
  const span = document.createElement("span");
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  const temp = document.createElement("p");
  const humidity = document.createElement("p");
  const wind = document.createElement("p");

  h2.textContent = data.name;
  temp.textContent = `Temperature: ${data.main.temp}`;
  humidity.textContent = `Humidity: ${data.main.humidity} %`;
  wind.textContent = `Wind Speed: ${data.wind.speed} MPH`;

  span.append(icon);
  h2.append(span);
  cardHeader.append(h2);
  cardBody.append(temp, humidity, wind);
  card.append(cardHeader, cardBody);
  weatherContainer.append(card);
}

function renderForecastData(data) {
  // i * 8 + 4
  console.log(data);
  for (let i = 0; i < 5; i++) {
    getWeatherData().then((data) => {
      displayWeatherInfo(data);
    });
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = inputSearch.value;
  getWeatherData(city);
});
