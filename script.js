const api = {
  key: "12ca158305df4890c2ae9e0d0503ab93",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location  .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .data");
  date.innerHTML = dateBuilder(now);
  
  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}°C`;
  
  let weathers = document.querySelector(".weather");
  weathers.innerHTML = weather.weather[0].main;
  
  let hiLow = document.querySelector(".hi-low");
  hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

  function dateBuilder(d) {
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

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
