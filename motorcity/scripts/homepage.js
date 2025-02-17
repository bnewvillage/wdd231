import { modalToggle } from "./modal.js";

const all = document.getElementById("all");
const wissam = document.getElementById("wissam");
const sallouty = document.getElementById("sallouty");
const sergio = document.getElementById("sergio");
const georgio = document.getElementById("georgio");
const peter = document.getElementById("peter");
const khalid = document.getElementById("khalid");
const blaine = document.getElementById("blaine");

const firstModal = document.getElementById('firstFeaturedModal');
const secondModal = document.getElementById('secondFeaturedModal');
const thirdModal = document.getElementById('thirdFeaturedModal');

const firstCard = document.getElementById('firstCard');
const secondCard = document.getElementById('secondCard');
const thirdCard = document.getElementById('thirdCard');

const firstClose = document.querySelector('.firstClose');
const secondClose = document.querySelector('.secondClose');
const thirdClose = document.querySelector('.thirdClose');

modalToggle(firstCard, firstModal, firstClose);
modalToggle(secondCard, secondModal, secondClose);
modalToggle(thirdCard, thirdModal, thirdClose);

//BRANDS DATA
async function getBrands (jsonFile) {
    try{
        const response = await fetch(jsonFile);
        if (response.ok) {
            const data = await response.json();
            return data;
        }        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getBrands("./data/brands.json").then(allBrands => {
    displayBrands(allBrands);

    wissam.addEventListener("click", () => {
    displayBrands(allBrands.filter(salesperson => salesperson.name === "Wissam"));
});

sallouty.addEventListener("click", () => {
    displayBrands(allBrands.filter(salesperson => salesperson.name === "Sallouty"));
});

georgio.addEventListener("click", () => {
    displayBrands(allBrands.filter(salesperson => salesperson.name === "Georgio"));
});

peter.addEventListener("click", () => {
    displayBrands(allBrands.filter(salesperson => salesperson.name === "Peter"));
});

khalid.addEventListener("click", () => {
    displayBrands(allBrands.filter(salesperson => salesperson.name === "Khalid"));
});

sergio.addEventListener("click", () => {
    displayBrands(allBrands.filter(salesperson => salesperson.name === "Sergio"));
});

blaine.addEventListener("click", () => {
    displayBrands(allBrands.filter(salesperson => salesperson.name === "Blaine"));
});

all.addEventListener("click", () => {
    displayBrands(allBrands);
});

});


//DISPLAY BRANDS
const brandCards = document.getElementById('brandCards');
function displayBrands(brandsArray) {
    brandCards.innerHTML = '';

    brandsArray.forEach(salesperson => {
        salesperson.brands.forEach(item => {
            const brand = document.createElement('li');
            brand.classList.add(salesperson.name);
            brand.classList.add('brandCard');
            brand.innerHTML = item;
            brandCards.appendChild(brand);
        });
    });
}
