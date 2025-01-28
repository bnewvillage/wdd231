

//fetching members and displaying
let membersData = []
let featuredBusinesses = []
import { getMembers, generateFeatured } from "./members.js";
getMembers("./data/members.json").then(memberData =>{
    membersData = memberData;
    displayMembers(membersData);
    featuredBusinesses = generateFeatured(membersData);
    console.log(featuredBusinesses);
    //display companies
    displayFeatCompanies(featuredBusinesses);
})

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

        card.setAttribute('class', 'card');
        url.setAttribute('href', member.url);
        image.setAttribute('src', member.image);
        image.setAttribute('alt', `${member.name} logo`)
        
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


//created featured cards
const featCompanies = document.querySelector('.featured-companies');
const displayFeatCompanies = (companies) =>{
    companies.forEach(company => {
        let card = document.createElement('section');
        let name = document.createElement('h3');
        let image = document.createElement('img');

        name.textContent = `${member.name}`;
        image.setAttribute('src',companies.image);

        card.appendChild(image);
        card.appendChild(name);
        featCompanies.appendChild(card);
    });
}