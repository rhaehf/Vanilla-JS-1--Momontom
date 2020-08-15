const weather = document.querySelector(".js-weather");

const API_KEY = "1272c7fd4b97a9b5b75a6b427bb6ca48";
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `🌡${temperature}℃   📍${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { // 객체의 이름과 key가 같을 땐(latitude = latitude) 한번만 적어줘도 됨
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();