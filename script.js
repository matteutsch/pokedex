let sourceOfPokemon = [];
let allPokemon = [];
let onlyPokemonNames = [];
let limit;
let foundPokemon = [];

function filterPokemon() {
	let input = document.getElementById('search').value;
	input = input.toLowerCase();
	for (let i = 0; i < onlyPokemonNames.length; i++) {
		console.log(onlyPokemonNames[i]);
		let index = onlyPokemonNames[i].indexOf(input);
		if (index == -1) {
			console.log("sorry bro, deine buchstaben gibts nich'");
		} else {
			let name = allPokemon['results'][i]['name'];
			console.log('i will push i:', i);
			if (name in foundPokemon) {
				console.log('pokemon already found :), no need to insert it into the array foundPokemon[i]');
			} else {
				// copy one pokemon to foundPokemon where ass i is the id of the pokemon
				foundPokemon[name] = {};
				foundPokemon[name]['results'] = {};
				foundPokemon[name]['results'][i] = allPokemon['results'][i];
				console.log('foundPokemon:', foundPokemon);
			}
		}
		console.log('index', index);
	}
	renderFoundPokemon();
}

function renderFoundPokemon() {
	// rendering singlePokemon in allPokemon with few infos
	document.getElementById(`allPokemon`).innerHTML = '';
	for (let name in foundPokemon) {
		let pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

		for (let i in foundPokemon[name]['results']) {
			i = parseInt(i, 10);
			console.log('i=', i);
			console.log('typeof i', typeof i);
			document.getElementById(`allPokemon`).innerHTML += generateAllPokemonHTML(i, pokemonName);
			loadPokemonInfo(i);
		}
	}
	foundPokemon = [];
}

async function loadStartPokemon() {
	// get all pokemon for display in allPokemon

	limit = 40;
	let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
	let response = await fetch(url);
	allPokemon = await response.json();

	renderAllPokemon();
	console.log('alle pokemon', allPokemon);

	//endOfScreen();
	loadMorePokemon();
}

//function endOfScreen() {
//	window.onscroll = function () {
//		if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
//			loadMorePokemon();
//		}
//	};
//}

async function loadMorePokemon() {
	startValue = limit;
	if (limit == 40) {
		limit += 20;
		console.log('limit=limit +20', limit);
	} else if (limit >= 60) {
		limit += 20;
		console.log('limit +20', limit);
	}

	let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
	let response = await fetch(url);
	allPokemon = await response.json();
	renderMorePokemon(startValue, limit);
}

function renderMorePokemon(startValue, limit) {
	// rendering MORE singlePokemon in allPokemon with few infos
	let pokedex = allPokemon['results'];

	for (let i = startValue; i < limit; i++) {
		let pokemonName = pokedex[i]['name'].charAt(0).toUpperCase() + pokedex[i]['name'].slice(1);
		document.getElementById(`allPokemon`).innerHTML += generateAllPokemonHTML(i, pokemonName);
		onlyPokemonNames.push(allPokemon['results'][i]['name']);
		loadPokemonInfo(i);
	}
}

function renderAllPokemon() {
	// rendering singlePokemon in allPokemon with few infos
	let pokedex = allPokemon['results'];

	for (let i = 0; i < pokedex.length; i++) {
		let pokemonName = pokedex[i]['name'].charAt(0).toUpperCase() + pokedex[i]['name'].slice(1);
		document.getElementById(`allPokemon`).innerHTML += generateAllPokemonHTML(i, pokemonName);
		onlyPokemonNames.push(allPokemon['results'][i]['name']);
		loadPokemonInfo(i);
	}
}

function generateAllPokemonHTML(i, pokemonName) {
	//returning html for renderAllPokemon()
	return `
  <div id="singlePokemon${i}" class="singlePokemon" onclick="showPokeCard(${i})">
  <div class="PokeHeader"> <p># ${i + 1}</p><p>${pokemonName}</p>
  </div>
  <img id="pokeImage${i}" />
  <div id="pokeType${i}" class="type">type</div>
  </div>
  `;
}

async function loadPokemonInfo(i) {
	// get currentPokemon for single informations
	let url = allPokemon['results'][i]['url'];
	let response = await fetch(url);
	let currentPokemon = await response.json();
	sourceOfPokemon.push(currentPokemon);

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
