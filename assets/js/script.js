const API_KEY = "045fbd56ca8c36f7626aa7ba8c409d79";
const searchBtn = document.querySelector("#search-btn");
const inputSearch = document.querySelector("#input-search");
const weatherContainer = document.querySelector(".weather-container");
const forecastContainer=document.querySelector(".forecast")
historyContainer=document.querySelector(".historyContainer")
const historyArr=[]

function getHistory(searchHistory){
  const btn= document.createElement("button")
  btn.setAttribute("class", "btn btn-info")
  btn.setAttribute("value", searchHistory)
  btn.textContent= searchHistory
  historyContainer.append(btn)
}

let searchHistory=JSON.parse(localStorage.getItem("history")) || []
for(let i=0; i<searchHistory.length; i++){
  getHistory(searchHistory[i])
}

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

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
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      renderForecastData(data.list);
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
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");
    const h2 = document.createElement("h2");
    const icon = document.createElement("img");
    icon.setAttribute(
      "src",
      "https://openweathermap.org/img/w/" + data[i].weather[0].icon + ".png"
    );
    const forIn=i* 8 + 4
    const day =new Date(data[forIn].dt*1000)
    h2.textContent= day.toDateString()
    const span = document.createElement("span");
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    const temp = document.createElement("p");
  const humidity = document.createElement("p");
  const wind = document.createElement("p");
  temp.textContent= `Temperature: ${data[forIn].main.temp} F`
  humidity.textContent=`Humidity ${data[forIn].main.humidity} %`
  wind.textContent=`Wind Speed: ${data[forIn].wind.speed} KPH`

  span.append(icon)
  h2.append(span)
  cardHeader.append(h2)
  cardBody.append(temp, humidity, wind)
  card.append(cardHeader, cardBody)
  forecastContainer.append(card)


    
  }
}

function storage(city){
  searchHistory=JSON.parse(localStorage.getItem("history")) ||[]
  if(!historyArr.includes(city)){
    historyArr.push(city)
    localStorage.setItem("history", JSON.stringify(historyArr))
    getHistory(city)
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = inputSearch.value;
  getWeatherData(city);
  storage(city)
});

historyContainer.addEventListener("click", (e)=>{
  e.preventDefault()
  weatherContainer.innerHTML=""
  forecastContainer.innerHTML=""
  const cityClick= this.event.target.value
  getWeatherData(cityClick)

})
