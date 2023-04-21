function renderFoundPokemon() {
	// rendering found Pokemon in allPokemon with few infos

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
	//generating HTML for all render Funktions
	return `
  <div id="singlePokemon${i}" class="singlePokemon" onclick="showPokeCard(${i})">
  <div class="PokeHeader"> <p># ${i + 1}</p><p>${pokemonName}</p>
  </div>
  <img id="pokeImage${i}" />
  <div id="pokeType${i}" class="type">type</div>
  </div>
  `;
}

function generatePokedexHTML(pokeName, i, prevIndex, prevImg, pokeImage, nextIndex, nextImg, pokeType, pokeWeight, pokeHp, pokeAtt, pokeDef) {
	// generating HTML for showPokeCard();
	return `
  <div id="pokedex" onclick="event.stopPropagation()" >
  <div class="card-head">
    <p id="pokemonName">${pokeName}</p>
    <p id="id" class="id"># ${i + 1}</p>
  </div>
  <div class="presentation">
    <div class="sides"><img id="firstPokemon" onclick="showPokeCard(${prevIndex})" class="miniPoke" src="${prevImg}" /></div>
    <div class="center"><img id="pokemonImage" class="pokemonImage" src="${pokeImage}" /></div>
    <div class="sides"><img id="lastPokemon" onclick="showPokeCard(${(i, nextIndex)})" class="miniPoke" src="${nextImg}" /></div>
  </div>
  <div class="info-container" id="infoContainer">
  <div w3-include-html="chart.html"></div>
    <table>
      <tr>
        <td>Type :</td>
        <td id="type">${pokeType}</td>
      </tr>
      <tr>
        <td>Weight :</td>
        <td id="weight">${pokeWeight}</td>
      </tr>
      <tr>
        <td>Base HP :</td>
        <td id="hp">${pokeHp}</td>
      </tr>
      <tr>
        <td>Base Attack :</td>
        <td id="attack">${pokeAtt}</td>
      </tr>
      <tr>
        <td>Base Defense :</td>
        <td id="defense">${pokeDef}</td>
      </tr>
    </table>
  </div>
  </div>`;
}
