//fetching members and displaying
let featuredBusinesses = []
import { getMembers, generateFeatured } from "./members.js";
getMembers("./data/members.json").then(membersData =>{
    featuredBusinesses = generateFeatured(membersData);
    console.log(featuredBusinesses);
    //display companies
    displayFeatCompanies(featuredBusinesses);
})

//created featured cards
const featCompanies = document.querySelector('.featured-companies');
const displayFeatCompanies = (companies) => {
    companies.forEach(company => {
        let card = document.createElement('section');
        let figure = document.createElement('figure');
        let figcaption = document.createElement('figcaption');
        let image = document.createElement('img');
        let level = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let address = document.createElement('p');

        figcaption.textContent = `${company.name}`;
        image.setAttribute('src', company.image);
        image.setAttribute('class', 'imgCompany');
        figure.setAttribute('class', 'companyFigure');
        
        
        let companyLevel = company.membershipLevel;
        let levelString = '';
        if (companyLevel == 3){
            levelString = 'Gold Member';
            level.setAttribute('class', 'level levelGold');
            level.textContent = `${levelString}`;
        }
        else if (companyLevel == 2){
            levelString = 'Silver Member';
            level.setAttribute('class', 'level levelSilver');
            level.textContent = `${levelString}`;
        }

        phone.textContent = `${company.phoneNumber}`;
        phone.setAttribute('class','phone');

        website.setAttribute('href', company.url);
        website.setAttribute('class', 'website');
        website.textContent = company.url.replace(/^https?:\/\//, '');

        address.textContent = `${company.address}`;
        address.setAttribute('class', 'address');
        
        figure.appendChild(image);
        figure.appendChild(figcaption);
        
        card.appendChild(level);
        card.appendChild(figure);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(address);
        card.setAttribute('class', 'companyCard');
        featCompanies.appendChild(card);
    });
}

const weatherAPIKey = "61e860c2d260318713fe194e298a6600";
const latitude = 25.039747524665962;
const longitude = 55.21762910359399;

async function fetchWeather() {
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherAPIKey}`;
  
  try {
    const response = await fetch(weatherURL);
    if (response.ok) {
      const weatherData = await response.json();
  
      //current weather extract
      const currentTemp = weatherData.list[0].main.temp;
      const currentDesc = weatherData.list[0].weather[0].description;
      const formatDesc = formatDescription(currentDesc);
      const currentIcon = weatherData.list[0].weather[0].icon;
  
      //display current weather
      document.getElementById("current-temp").textContent = `Temperature: ${currentTemp}°C`;
      document.getElementById("current-desc").textContent = `${formatDesc}`;
      document.getElementById("current-icon").setAttribute('src',`https://openweathermap.org/img/wn/${currentIcon}@2x.png`)
  
      //get 3-day
      const forecast = document.getElementById("forecast");
      forecast.innerHTML = ""; // clear previous content
  
      const dailyForecast = weatherData.list.filter((entry) =>
        entry.dt_txt.includes("12:00:00")
      );
  
      dailyForecast.slice(0, 3).forEach((day) => {
        const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        });
        const temp = day.main.temp;
        const desc = day.weather[0].description;
        const formatForecastDesc = formatDescription(desc);
        const icon = day.weather[0].icon;
  
        // create card
        const card = document.createElement("div");
        card.classList.add("weather-card");
        card.innerHTML = `
          <h3>${date}</h3>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${formatForecastDesc}" />
          <p>${temp}°C</p>
          <p>${formatForecastDesc}</p>
        `;
  
        forecast.appendChild(card);
      });
    } else {
      console.error("Error fetching weather data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function formatDescription(description) {
    return description
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  

fetchWeather();

