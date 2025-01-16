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

//fetching members
async function getMembers(jsonFile) {
    const response = await fetch(jsonFile);
     if (response.ok){
        const data = await response.json();
        console.table(data);
        displayMembers(data);
     }
}
    //creating cards
const cards = document.querySelector('#cards');
const displayMembers = (members) => {
    members.forEach(member => {
        let card = document.createElement('section');
        let name = document.createElement('h3');
        let image = document.createElement('img');
        let address = document.createElement('p');
        let number = document.createElement('p');
        let url = document.createElement('a');
        let membershipLevel = member.membershipLevel;

        card.setAttribute('class', 'card');
        url.setAttribute('href', member.url);
        image.setAttribute('src', member.image);
        
        name.textContent = `${member.name}`;
        address.textContent = `${member.address}`;
        number.textContent = `📞${member.phoneNumber}`;
        url.textContent = `${member.url}`;


        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(number);
        card.appendChild(url);
        cards.appendChild(card);

    });
}

getMembers("./data/members.json");

//grid-list toggle
const gridButton = document.querySelector('#gridButton');
const listButton = document.querySelector('#listButton');
const card = document.querySelector('.card');

listButton.addEventListener('click',()=>{
    cards.classList.add('active');
    listButton.classList.add('active');
    gridButton.classList.remove('active');
    
})

gridButton.addEventListener('click',()=>{
    cards.classList.remove('active');
    listButton.classList.remove('active');
    gridButton.classList.add('active');
    
})