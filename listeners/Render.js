import { cards, suggestions, searchInput } from "./EventListener.js";

export async function renderPokeTeam(pokeTeam) {
  for (let index = 0; index < pokeTeam.pokemons.length; index++) {
    cards[index].classList.add("loading");
    const pokemon = pokeTeam.pokemons[index];
    const types = pokemon.types.map((type) => `<li id="${type}">${type}</li>`).join("");

    await loadPokemonData(cards[index], pokemon, types);

    cards[index].classList.remove("loading");
  }
}

export function renderPokemon(pokemon, emptyCardIndex) {
  const card = cards[emptyCardIndex];
  const types = pokemon.types.map((type) => `<li id="${type}">${type}</li>`).join("");

  card.classList.add("loading");
  loadPokemonData(card, pokemon, types).then(() =>
    card.classList.remove("loading")
  );
}

async function loadPokemonData(card, pokemon, types) {
  return new Promise((resolve) => {
    setTimeout(() => {
      card.innerHTML = `
              <h3>${firstLetterUpperCase(pokemon.name)}</h3>
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="poke_sprite">
              <ul>
                  ${types}
              </ul>
              <button class="shiny-button">Shiny</button>
              <button class="remove-button">Remover</button>
          `;
      resolve();
    }, 1000);
  });
}

export function findEmptyCardIndex() {
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];
    if (cardIsEmpty(card)) {
      return index;
    }
  }
  return -1;
}

function cardIsEmpty(card) {
  return card.querySelector("img").src.includes("imgs/pokeball.ico");
}

export function randomNumberGenerator() {
  const numeroAleatorio = Math.floor(Math.random() * 1025) + 1;
  return numeroAleatorio;
}

export function firstLetterUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function resetAllDivs(cards) {
  cards.forEach((card) => resetDiv(card));
}

export function resetDiv(div) {
  const h3Element = div.querySelector("h3");
  if (h3Element) {
    h3Element.textContent = "";
  }

  const imgElement = div.querySelector("img");
  if (imgElement) {
    imgElement.src = "imgs/pokeball.ico";
    imgElement.alt = "";
  }

  const ulElement = div.querySelector("ul");
  if (ulElement) {
    ulElement.innerHTML = "";
  }
  
  const buttonElement2 = div.querySelectorAll("button")[1];
  if (buttonElement2) {
    buttonElement2.remove();
  }
  
  const buttonElement1 = div.querySelectorAll("button")[0];
  if (buttonElement1) {
    buttonElement1.remove();
  }

}

export function displaySuggestions(pokemonList) {
  if (pokemonList.length == 0 || searchInput.value == '') {
    suggestions.style.display = "none";
  } else {
    suggestions.style.display = "block";
  }

  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild);
  }

  pokemonList.forEach((pokemon) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.textContent = pokemon.name;
    suggestions.appendChild(suggestionItem);
  });
}

export function findShinyPokemon(pokeName, pokeTeam){
  const foundPokemon = pokeTeam.find(pokemon => pokemon.name === pokeName);
  if (foundPokemon) {
    return foundPokemon.sprites.front_shiny;
  }
}

export function findPokemon(pokeName, pokeTeam){
  const foundPokemon = pokeTeam.find(pokemon => pokemon.name === pokeName);
  if (foundPokemon) {
    return foundPokemon.sprites.front_default;
  }
}
