// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi = {
    key: "02c3269e35c84ce6e2352d44a2285289",
    baseUrl: "api.openweathermap.org/data/2.5/weather"
}

const inputBox = document.getElementById('inputBox');
inputBox.addEventListener('keypress',(event)=>{
    if(event.keyCode == 13){
        console.log(inputBox.value);
        getWeatherReport(inputBox.value);
        document.querySelector('.weatherDetails').style.display = "block";
        document.querySelector('.heroText').style.display = "none";
    };
});

function getWeatherReport(city){
    fetch(`https://${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showWeatherReport);
};

function showWeatherReport(weather){
    console.log(weather);

    let temp = document.getElementById('temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let humidity = document.getElementById('humidity');
    humidity.innerHTML = `Humidity: ${weather.main.humidity}%`;

    let wind = document.getElementById('wind');
    wind.innerHTML = `Wind speed: ${weather.wind.speed}`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date')
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    let icon = document.getElementById('weather-icon');

    if(weatherType.textContent == "Snow"){
        document.body.style.backgroundImage = "url('./weather-images/snow.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png')
    }

    else if(weatherType.textContent == "Clouds"){
        document.body.style.backgroundImage = "url('./weather-images/clouds.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/04d@2x.png')
    }

    else if(weatherType.textContent == "Haze"){
        document.body.style.backgroundImage = "url('./weather-images/haze.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png')
    }
    
    else if(weatherType.textContent == "Sunny"){
        document.body.style.backgroundImage = "url('./weather-images/sunny.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png')
    }

    else if(weatherType.textContent == "Rain"){
        document.body.style.backgroundImage = "url('./weather-images/rain.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png')
    }

    else if(weatherType.textContent == "Drizzle"){
        document.body.style.backgroundImage = "url('./weather-images/rain.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png')
    }

    else if(weatherType.textContent == "Mist"){
        document.body.style.backgroundImage = "url('./weather-images/haze.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png')
    }

    else if(weatherType.textContent == "Thunderstorm"){
        document.body.style.backgroundImage = "url('./weather-images/thunderstorm.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png')
    }

    else{
        document.body.style.backgroundImage = "url('./weather-images/clear.jpg')"
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png')
    }
};

function dateManage(dateArg){

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let day = days[dateArg.getDay()];
    let date = dateArg.getDate();

    return `${date} ${month} (${day}), ${year}`;
}