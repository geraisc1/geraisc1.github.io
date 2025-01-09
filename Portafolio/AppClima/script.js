let cityInput = document.querySelector('#get-city');
cityInput.addEventListener("keypress",(event)=>{
    if(event.key == "Enter"){
        fetchDataFromApi();
    }
});

let apiData = {
	url: "https://api.openweathermap.org/data/2.5/forecast?q=",
	key: "124b92a8dd9ec01ffb0dbf64bc44af3c",
};
cityInput.value = "new york";
fetchDataFromApi();
cityInput.value = "";

function fetchDataFromApi (){
    let insertedCity = cityInput.value;
    fetch(`${apiData.url}${insertedCity}&&appid=${apiData.key}`)
        .then((res) => res.json())
        .then((data) => addDataToDom(data));
}

let cityName = document.querySelector(".city-name");
let cityTemp = document.querySelector(".weather-deg");
let cityCond = document.querySelector(".weather-condition");
let cityHumidity = document.querySelector(".humidity");
let cityWind = document.querySelector('.wind');
let todayDate = document.querySelector(".date");

function addDataToDom(data){        
    cityTemp.innerHTML = `${Math.round(data.list[0].main.temp - 273.15)}°C`;
    const weatherData = data.list;    
    //Declaracion de un objeto vacio
    const dailyweather = {};

    weatherData.forEach((data) => {
        //Almacena cada dia de la semana
        const day = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        //Vuelve verdadero el dato para poder almacenar los valores de cada dia
        if (!dailyweather[day]) {                
            dailyweather[day] = {
                minTemp: (data.main.temp_min),
                maxTemp: (data.main.temp_max),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather[0].icon,  
            };
            
        } else {
            dailyweather[day].minTemp = Math.min(dailyweather[day].minTemp, data.main.temp_min);            
            dailyweather[day].maxTemp = Math.max(dailyweather[day].maxTemp, data.main.temp_max);
        }
    });
    //console.log(dailyweather);
    cityName.innerHTML = data.city.name + ', ' + data.city.country;
    cityWind.innerHTML = dailyweather[new Date().toLocaleDateString('en-US', { weekday: 'long' })].windSpeed + ' m/s';
    cityCond.innerHTML = dailyweather[new Date().toLocaleDateString('en-US', { weekday: 'long' })].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');    
    cityHumidity.innerHTML = `Humidity: ${dailyweather[new Date().toLocaleDateString('en-US', { weekday: 'long' })].humidity + ' %'}`;
    todayDate.innerHTML = getDate();

    const WeatherIconCode = dailyweather[new Date().toLocaleDateString('en-US', { weekday: 'long' })].icon;
    const weatherIconElement = document.querySelector('.weather-icon');
    weatherIconElement.innerHTML = getWeatherIcon(WeatherIconCode);


    const dayElements = document.querySelectorAll('.day-name');
    const tempElements = document.querySelectorAll('.day-temp');
    const iconElements = document.querySelectorAll('.day-icon');
  
    dayElements.forEach((dayElement, index) => {
        const day = Object.keys(dailyweather)[index];
        const data = dailyweather[day];
        dayElement.textContent = day;    
        tempElements[index].textContent = `${Math.round(data.minTemp - 273.15)}° / ${Math.round(data.maxTemp - 273.15)}°`;
        iconElements[index].innerHTML = getWeatherIcon(data.icon);
    });
}   

let months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November","December"];

function getDate(){
    let newTime = new Date();
    let month = months[newTime.getMonth()];
    return `${newTime.getDate()} ${month} ${newTime.getFullYear()}`;
}

function getWeatherIcon(iconCode) {
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconSize = '@2x.png';
    return `<img class="icon-forecast" src="${iconBaseUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
  }