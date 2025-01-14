const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
let results = null;
async function getPokemon(url) {
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        doStuff(data);
    }
    
}

const doStuff = input => {
    console.log(`We return with:`, input);
}

getPokemon(url);
console.log(`Not DoStuffs`, results);