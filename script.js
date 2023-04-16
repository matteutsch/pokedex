let sourceOfPokemon = [];
let allPokemon = [];
let filteredPokemon = [];
let limit;
async function loadAllPokemon() {
	// get all pokemon for display in allPokemon

	limit = 40;
	let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
	let response = await fetch(url);
	allPokemon = await response.json();
	renderAllPokemon();
	console.log('alle pokemon', allPokemon);
}

async function loadMorePokemon() {
	//window.onscroll = function () {
	//	if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
	//		limit = limit + 20;
	//		console.log('limit:', limit);
	//		loadAllPokemon();
	//	}
	//};
	startValue = limit;
	if (limit == 40) {
		limit = limit + 20;
		console.log('limitlimitlimit +20', limit);
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
	console.log('startval:', startValue, 'limit:', limit);
	let pokedex = allPokemon['results'];

	for (let i = startValue; i < limit; i++) {
		let pokemonName = pokedex[i]['name'].charAt(0).toUpperCase() + pokedex[i]['name'].slice(1);
		document.getElementById(`allPokemon`).innerHTML += generateAllPokemonHTML(i, pokemonName);
		loadPokemonInfo(i);
	}
}

function renderAllPokemon() {
	// rendering singlePokemon in allPokemon with few infos
	let pokedex = allPokemon['results'];

	for (let i = 0; i < pokedex.length; i++) {
		let pokemonName = pokedex[i]['name'].charAt(0).toUpperCase() + pokedex[i]['name'].slice(1);
		document.getElementById(`allPokemon`).innerHTML += generateAllPokemonHTML(i, pokemonName);
		loadPokemonInfo(i);
	}
}

//function filterPokemon() {
//	let input = document.getElementById('search').value;
//	let filteredPokemon = sourceOfPokemon.filter((input) => {
//		return sourceOfPokemon.includes(input);
//	});
//	console.log('filteredpokemon', sourceOfPokemon);
//}

function generateAllPokemonHTML(i, pokemonName) {
	//returning html for renderAllPokemon()
	return `
  <div id="singlePokemon${i}" class="singlePokemon" onclick="showPokeCard(${i})">
  <div class="miniPoke"> <p># ${i + 1}</p><p>${pokemonName}</p>
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
    <div class="sides"><img id="firstPokemon" onclick="showPokeCard(${prevIndex})" class="miniMe" src="${prevImg}" /></div>
    <div class="center"><img id="pokemonImage" class="pokemonImage" src="${pokeImage}" /></div>
    <div class="sides"><img id="lastPokemon" onclick="showPokeCard(${(i, nextIndex)})" class="miniMe" src="${nextImg}" /></div>
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

////////////////////////////////colorChanges////////////////////////////////

function changeAllTypeColors(pokeType, pokeImage, i) {
	let color;
	if (pokeType == 'Grass') {
		color = '#028900';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Fire') {
		color = '#ff1903';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Water') {
		color = '#303eff';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Bug') {
		color = 'orange';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Normal') {
		color = '#777777';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Poison') {
		color = '#800080';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Electric') {
		color = '#fecc00';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Ground') {
		color = 'rgb(132, 45, 1)';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Fairy') {
		color = 'pink';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Rock') {
		color = 'rgb(224, 203, 143)';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Ghost') {
		color = 'white';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Psychic') {
		color = 'rgb(180, 17, 230)';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Fighting') {
		color = 'rgb(212, 141, 0)';
		colorChangeSmallCards(i, color);
	}
}

function changeSingleTypeColor(pokeType) {
	let color;
	if (pokeType == 'Grass') {
		color = '#028900';
		colorChangeBigCard(color);
	} else if (pokeType == 'Fire') {
		color = '#ff1903';
		colorChangeBigCard(color);
	} else if (pokeType == 'Water') {
		color = '#303eff';
		colorChangeBigCard(color);
	} else if (pokeType == 'Bug') {
		color = 'orange';
		colorChangeBigCard(color);
	} else if (pokeType == 'Normal') {
		color = '#777777';
		colorChangeBigCard(color);
	} else if (pokeType == 'Poison') {
		color = '#800080';
		colorChangeBigCard(color);
	} else if (pokeType == 'Electric') {
		color = '#fecc00';
		colorChangeBigCard(color);
	} else if (pokeType == 'Ground') {
		color = 'rgb(132, 45, 1)';
		colorChangeBigCard(color);
	} else if (pokeType == 'Fairy') {
		color = 'pink';
		colorChangeBigCard(color);
	} else if (pokeType == 'Rock') {
		color = 'rgb(224, 203, 143)';
		colorChangeBigCard(color);
	} else if (pokeType == 'Ghost') {
		color = 'white';
		colorChangeBigCard(color);
	} else if (pokeType == 'Psychic') {
		color = 'rgb(180, 17, 230)';
		colorChangeBigCard(color);
	} else if (pokeType == 'Fighting') {
		color = 'rgb(212, 141, 0)';
		colorChangeBigCard(color);
	}
}

function colorChangeSmallCards(i, color) {
	document.getElementById(`singlePokemon${i}`).style.border = `2px solid ${color}`;
	document.getElementById(`pokeImage${i}`).style.filter = `drop-shadow(0px 0px 25px ${color})`;
}

function colorChangeBigCard(color) {
	document.getElementById(`pokedex`).style.border = `2px solid ${color}`;
	document.getElementById(`pokedex`).style.boxShadow = `0px 0px 128px ${color}`;
	document.getElementById(`pokemonImage`).style.filter = `drop-shadow(0px 0px 25px ${color})`;
}
