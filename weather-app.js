const weatherApi = {
    key: "02c3269e35c84ce6e2352d44a2285289",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

const inputBox = document.getElementById('inputBox');
inputBox.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        getWeatherReport(inputBox.value);
        document.querySelector('.weatherDetails').style.display = "block";
        document.querySelector('.heroText').style.display = "none";
    }
});

async function getWeatherReport(city) {
    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weather = await response.json();
        showWeatherReport(weather);
    } catch (error) {
        alert(error.message);
    }
}

function showWeatherReport(weather) {
    console.log(weather);

    let temp = document.getElementById('temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let humidity = document.getElementById('humidity');
    humidity.innerHTML = `Humidity: ${weather.main.humidity}%`;

    let wind = document.getElementById('wind');
    wind.innerHTML = `Wind speed: ${weather.wind.speed} m/s`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    let icon = document.getElementById('weather-icon');
    let weatherTypeText = weatherType.textContent;

    let backgroundImage = '';
    let iconSrc = '';

    switch (weatherTypeText) {
        case 'Snow':
            backgroundImage = 'url("./weather-images/snow.jpg")';
            iconSrc = 'http://openweathermap.org/img/wn/13d@2x.png';
            break;
        case 'Clouds':
            backgroundImage = 'url("./weather-images/clouds.jpg")';
            iconSrc = 'http://openweathermap.org/img/wn/04d@2x.png';
            break;
        case 'Haze':
        case 'Mist':
            backgroundImage = 'url("./weather-images/haze.jpg")';
            iconSrc = 'http://openweathermap.org/img/wn/50d@2x.png';
            break;
        case 'Sunny':
            backgroundImage = 'url("./weather-images/sunny.jpg")';
            iconSrc = 'http://openweathermap.org/img/wn/01d@2x.png';
            break;
        case 'Rain':
        case 'Drizzle':
            backgroundImage = 'url("./weather-images/rain.jpg")';
            iconSrc = 'http://openweathermap.org/img/wn/10d@2x.png';
            break;
        case 'Thunderstorm':
            backgroundImage = 'url("./weather-images/thunderstorm.jpg")';
            iconSrc = 'http://openweathermap.org/img/wn/11d@2x.png';
            break;
        default:
            backgroundImage = 'url("./weather-images/clear.jpg")';
            iconSrc = 'http://openweathermap.org/img/wn/02d@2x.png';
            break;
    }

    document.body.style.backgroundImage = backgroundImage;
    icon.setAttribute('src', iconSrc);
}

function dateManage(dateArg) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const year = dateArg.getFullYear();
    const month = months[dateArg.getMonth()];
    const day = days[dateArg.getDay()];
    const date = dateArg.getDate();

    return `${date} ${month} (${day}), ${year}`;
}
