import {places} from '../data/discover.mjs'

//created cards
const featuredSection = document.querySelector('#featuredSection');
places.forEach(place => {
    let card = document.createElement('section');
    let title = document.createElement('h2');
    let description = document.createElement('p');
    let address = document.createElement('p');
    let learnBtn = document.createElement('button');
    let image = document.createElement('img');

    title.innerHTML = `${place.title}`;
    description.innerHTML = `${place.description}`;
    address.innerHTML = `${place.address}`;
    learnBtn.innerHTML = `Learn More`;
    image.setAttribute('src',place.imagePath);
    image.setAttribute('width', '300px');

    title.classList.add('title');
    description.classList.add('description');
    address.classList.add('address');
    card.classList.add('card');
    learnBtn.classList.add('learnBtn');
    learnBtn.onclick = ()=> {window.open(place.url, '_blank')};
    image.classList.add('placeImg');
    image.setAttribute('alt', place.title);
    image.setAttribute('loading', 'lazy');
    

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(learnBtn);
    console.log(card);

    featuredSection.appendChild(card);
});

//creating last visit
const visitorMessage = document.getElementById('visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = new Date().getTime();

if (!lastVisit){
    visitorMessage.textContent = 'Welcome! Let us know if you have any questions.';
} else {
    const lastVisitTime = parseInt(lastVisit);
    const timeDifference = now - lastVisitTime;
    const daysDifference = Math.floor(timeDifference / (1000*60*60*24));
    if (daysDifference < 1){
        visitorMessage.textContent = `Back so soon! Awesome!`
    } else {
        visitorMessage.textContent = `You last visited ${daysDifference} days ago!`
    }
}

localStorage.setItem('lastVisit', now);