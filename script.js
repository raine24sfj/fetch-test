const content = document.getElementById("content");

function makeCapitalized(w) {
    return w.charAt(0).toUpperCase() + w.slice(1);
}

async function getAllPokemon() {
    const pokemonData = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=251").then(data => data.json());
    const pokemonDetails = await Promise.all(pokemonData.results.map(async (details) => await fetch(details.url).then(r => r.json())));
    console.log(pokemonDetails)
    
    content.innerHTML = (pokemonDetails.map(pokemon => {
        return (
            `<div class="pokemon-container pkmn-card individual-pkmn">
                <p>#${pokemon.id}</p>
                <div class="flex-col">
                    <h2 class="pkmn-name">${makeCapitalized(pokemon.name)}</h2>
                    <img src="${pokemon.sprites.front_default}" />
                    <p>${pokemon.types.map(allTypes => allTypes.type.name).join(" ")}</p>
                </div>
                <div class="flex-col">
                    <p>${makeCapitalized(pokemon.abilities.map(abilities => abilities.ability.name).join(" "))}</p>
                    <p>${pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join("<br>")}</p>
                </div>
            </div>`
        );
    })).join(" ");
}

getAllPokemon();