//date for footer
const currentYearElement = document.querySelector('#currentYear');
const lastModifiedElement = document.querySelector('#lastModified');
const today = new Date();
const currentYear = today.getFullYear();

currentYearElement.innerHTML = currentYear;
lastModifiedElement.innerHTML = today;

//menu button listener
const menuButton = document.querySelector('#menu');
const nav = document.querySelector('#nav');

menuButton.addEventListener('click',()=>{
    menuButton.classList.toggle('open');
    nav.classList.toggle('open');
})