let sourceOfPokemon = [];
let allPokemon = [];
let onlyPokemonNames = [];
let limit;
let maxLimit = 300;
let foundPokemon = [];

function filterPokemon() {
	let input = document.getElementById('search').value;
	input = input.toLowerCase();
	for (let i = 0; i < onlyPokemonNames.length; i++) {
		let index = onlyPokemonNames[i].indexOf(input);
		if (index == -1) {
			console.log('nothing found');
		} else {
			let name = allPokemon['results'][i]['name'];
			if (name in foundPokemon) {
			} else {
				foundPokemon[name] = {};
				foundPokemon[name]['results'] = {};
				foundPokemon[name]['results'][i] = allPokemon['results'][i];
			}
		}
		console.log('index', index);
	}
	renderFoundPokemon();
}

async function loadStartPokemon() {
	// get all pokemon for display in allPokemon
	document.getElementById(`allPokemon`).innerHTML = '';
	limit = 40;
	let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
	let response = await fetch(url);
	allPokemon = await response.json();

	renderAllPokemon();
	console.log('alle pokemon', allPokemon);
}

async function loadMorePokemon() {
	startValue = limit;
	if (limit == 40) {
		limit += 20;
	} else if (limit >= 60) {
		limit += 40;
	}
	let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
	let response = await fetch(url);
	allPokemon = await response.json();
	renderMorePokemon(startValue, limit);
	if (limit == maxLimit) {
		disableBtn();
	}
}

async function loadPokemonInfo(i) {
	// get currentPokemon for single informations
	let url = allPokemon['results'][i]['url'];
	let response = await fetch(url);
	let currentPokemon = await response.json();
	sourceOfPokemon[i] = currentPokemon;

	let pokeImage = currentPokemon['sprites']['other']['home']['front_default'];
	let pokeType = currentPokemon['types'][0]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][0]['type']['name'].slice(1);

	fillInfos(i, pokeImage, pokeType);
	changeAllTypeColors(pokeType, pokeImage, i);
}

function fillInfos(i, pokeImage, pokeType) {
	// fill infos into smallpokemon cards
	document.getElementById(`pokeImage${i}`).src = pokeImage;
	document.getElementById(`pokeType${i}`).innerHTML = pokeType;
}

function showPokeCard(i) {
	// rendering HTML for currentpokemon + previous and next pokemon function
	document.body.style.overflow = 'hidden';
	let prevIndex = sourceOfPokemon.length - 1;
	if (i != 0) {
		prevIndex = i - 1;
	}
	let nextIndex = 0;
	if (i != sourceOfPokemon.length - 1) {
		nextIndex = i + 1;
	}
	let prevImg = sourceOfPokemon[prevIndex]['sprites']['other']['home']['front_default'];
	let nextImg = sourceOfPokemon[nextIndex]['sprites']['other']['home']['front_default'];
	let pokeImage = sourceOfPokemon[i]['sprites']['other']['home']['front_default'];
	let pokeType = sourceOfPokemon[i]['types'][0]['type']['name'].charAt(0).toUpperCase() + sourceOfPokemon[i]['types'][0]['type']['name'].slice(1);
	let pokeName = sourceOfPokemon[i]['name'].charAt(0).toUpperCase() + sourceOfPokemon[i]['name'].slice(1);
	let pokeWeight = sourceOfPokemon[i]['weight'];
	let pokeHp = sourceOfPokemon[i]['stats'][0]['base_stat'];
	let pokeAtt = sourceOfPokemon[i]['stats'][1]['base_stat'];
	let pokeDef = sourceOfPokemon[i]['stats'][2]['base_stat'];

	let pokeCard = document.getElementById('overlay');

	pokeCard.innerHTML = ``;
	pokeCard.innerHTML = `
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
	changeSingleTypeColor(pokeType);
	document.getElementById(`overlay`).classList.remove('d-none');
}

function hidePokeCard() {
	document.getElementById('overlay').classList.add('d-none');
	document.body.style.overflow = 'auto';
}

function disableBtn() {
	document.getElementById('loadMoreButton').disabled = true;
	document.getElementById('loadMoreButton').innerHTML = 'No more Pokémon';
	document.getElementById('loadMoreButton').classList.add('noMore');
}

function enableBtn() {
	document.getElementById('loadMoreButton').disabled = false;
	document.getElementById('loadMoreButton').innerHTML = 'Load more Pokémon';
	document.getElementById('loadMoreButton').classList.remove('noMore');
}
