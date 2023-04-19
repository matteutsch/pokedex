function renderFoundPokemon() {
	// rendering singlePokemon in allPokemon with few infos

	document.getElementById(`allPokemon`).innerHTML = '';
	for (let name in foundPokemon) {
		let pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

		for (let i in foundPokemon[name]['results']) {
			i = parseInt(i, 10);
			document.getElementById(`allPokemon`).innerHTML += generatePokemonHTML(i, pokemonName);
			loadPokemonInfo(i);
		}
	}
	foundPokemon = [];
}

function renderAllPokemon() {
	// rendering singlePokemon in allPokemon with few infos
	let pokedex = allPokemon['results'];

	for (let i = 0; i < pokedex.length; i++) {
		let pokemonName = pokedex[i]['name'].charAt(0).toUpperCase() + pokedex[i]['name'].slice(1);
		document.getElementById(`allPokemon`).innerHTML += generatePokemonHTML(i, pokemonName);
		onlyPokemonNames.push(allPokemon['results'][i]['name']);
		loadPokemonInfo(i);
	}
}

function renderMorePokemon(startValue, limit) {
	// rendering MORE singlePokemon in allPokemon with few infos
	let pokedex = allPokemon['results'];

	for (let i = startValue; i < limit; i++) {
		let pokemonName = pokedex[i]['name'].charAt(0).toUpperCase() + pokedex[i]['name'].slice(1);
		document.getElementById(`allPokemon`).innerHTML += generatePokemonHTML(i, pokemonName);
		onlyPokemonNames.push(allPokemon['results'][i]['name']);
		loadPokemonInfo(i);
	}
}

function generatePokemonHTML(i, pokemonName) {
	return `
  <div id="singlePokemon${i}" class="singlePokemon" onclick="showPokeCard(${i})">
  <div class="PokeHeader"> <p># ${i + 1}</p><p>${pokemonName}</p>
  </div>
  <img id="pokeImage${i}" />
  <div id="pokeType${i}" class="type">type</div>
  </div>
  `;
}
