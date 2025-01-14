const cards = document.querySelector('#cards');
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

async function getProphetData(url) {
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        console.table(data.prophets);
        displayProphets(data.prophets);
    }
}



const displayProphets = (prophets) =>{
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let dateOfBirth = document.createElement('p');
        let birthPlace = document.createElement('p');

        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;

        birthPlace.textContent = `Birthplace: ${prophet.birthplace}`;

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        card.classList.add('cardContainer')
        portrait.setAttribute('class', 'portrait');
        portrait.setAttribute('src',prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(portrait);
        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        card.appendChild(birthPlace);
        cards.appendChild(card);
    });
}


getProphetData(url);