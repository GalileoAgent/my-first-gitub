function formatDate(date) {
    let now = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
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
      "December"
    ];
  
    let currentYear = now.getFullYear();
    let currentDay = days[now.getDay()];
    let currentMonth = months[now.getMonth()];
    let currentDate = now.getDate();
    let cTime = now.getHours();
    if (cTime < 10) {
      cTime = `0${cTime}`;
    }
    let cMinutes = now.getMinutes();
    if (cMinutes < 10) {
      cMinutes = `0${cMinutes}`;
    }
  
    let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${cTime}:${cMinutes}`;
    return formattedDate;
  }
  formatDate(new Date());
  
  let time = document.querySelector("#current-time");
  time.innerHTML = formatDate(new Date());
  
  //// second part
  
  function searchCity(event) {
    event.preventDefault();
    let newCity = document.querySelector("#form-city");
    let input = newCity.value;
  
    let fakeDescription = document.querySelector("#weather-description");
    let fakeTemp = document.querySelector("#current-temp");
    let currentCity = document.querySelector("h4");
  
    currentCity.innerHTML = input;
  
    function showWeather(responce) {
      let localTemp = Math.round(responce.data.main.temp);
      let localDescription = responce.data.weather[0].description;
  
      console.log(localDescription);
      fakeTemp.innerHTML = localTemp;
      fakeDescription.innerHTML = localDescription;
    }
  
    let apiKey = "7d9e19c7cb063429e8b2f87761df84cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(showWeather);
  }
  
  function showWeatherCoordination(responce) {
    console.log(responce);
    let buttonlocalTemp = Math.round(responce.data.main.temp);
    let buttonlocalDescription = responce.data.weather[0].description;
    let buttonCity = responce.data.name;
    console.log(buttonCity);
  
    let fakeTemp = document.querySelector("#current-temp");
    let fakeDescription = document.querySelector("#weather-description");
    let currentCity = document.querySelector("h4");
  
    console.log(buttonlocalDescription);
    fakeTemp.innerHTML = buttonlocalTemp;
    fakeDescription.innerHTML = buttonlocalDescription;
    currentCity.innerHTML = buttonCity;
  }
  
  function coordination(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "7d9e19c7cb063429e8b2f87761df84cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    console.log(lat);
    console.log(lon);
    axios.get(apiUrl).then(showWeatherCoordination);
  }
  
  function searchLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(coordination);
  }
  
  let searchForm = document.querySelector("#enter-city");
  searchForm.addEventListener("submit", searchCity);
  
  let searchLocationButton = document.querySelector("#geo-location");
  searchLocationButton.addEventListener("click", searchLocation);
  
  function changeTempToF(event) {
    event.preventDefault();
    let tempDataF = document.querySelector("#current-temp");
    tempDataF.innerHTML = Math.round((28 * 9) / 5 + 32) + "°F";
  }
  let optionFahrenheit = document.querySelector("#fahrenheit");
  optionFahrenheit.addEventListener("click", changeTempToF);
  
  function changeTempToC(event) {
    event.preventDefault();
    let tempDataC = document.querySelector("#current-temp");
    tempDataC.innerHTML = "28°C";
  }
  let optionCelsius = document.querySelector("#celsius");
  optionCelsius.addEventListener("click", changeTempToC);
  