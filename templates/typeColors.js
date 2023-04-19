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
	} else if (pokeType == 'Ice') {
		color = '#00fafe';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Dragon') {
		color = '#a91515';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Dark') {
		color = 'black';
		colorChangeSmallCards(i, color);
	} else if (pokeType == 'Steel') {
		color = '#d2d2d2';
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
	} else if (pokeType == 'Ice') {
		color = '#00fafe';
		colorChangeBigCard(color);
	} else if (pokeType == 'Dragon') {
		color = '#a91515';
		colorChangeBigCard(color);
	} else if (pokeType == 'Dark') {
		color = 'black';
		colorChangeBigCard(color);
	} else if (pokeType == 'Steel') {
		color = '#d2d2d2';
		colorChangeBigCard(color);
	}
}

function colorChangeSmallCards(i, color) {
	document.getElementById(`singlePokemon${i}`).style.border = `2px solid ${color}`;
	document.getElementById(`pokeImage${i}`).style.filter = `drop-shadow(0px 0px 25px ${color})`;
}

function colorChangeBigCard(color) {
	document.getElementById(`pokedex`).style.border = `2px solid ${color}`;
	//document.getElementById(`infoContainer`).style.border = `2px solid ${color}`;
	document.getElementById(`pokedex`).style.boxShadow = `0px 0px 128px ${color}`;
	document.getElementById(`pokemonImage`).style.filter = `drop-shadow(0px 0px 25px ${color})`;
}
