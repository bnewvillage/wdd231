const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const iconCaption = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=49.78&lon=6.65&appid=61e860c2d260318713fe194e298a6600';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.text}`);
        }
        data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(await 'An error occured: ', error.message);
    }
    displayResults(data);
}

apiFetch();

function displayResults(data){
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    iconCaption.innerHTML = `${data.weather[0].description}`;
    let iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
}