let sourceOfPokemon = [];

async function loadAllPokemon() {
  // get all pokemon for display in allPokemon
  let url = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`;
  let response = await fetch(url);
  allPokemon = await response.json();

  console.log("alle pokemon", allPokemon);

  renderAllPokemon();
}

function renderAllPokemon() {
  // rendering singlePokemon in allPokemon with few infos
  let pokedex = allPokemon["results"];
  for (let i = 0; i < pokedex.length; i++) {
    let pokemonName =
      pokedex[i]["name"].charAt(0).toUpperCase() + pokedex[i]["name"].slice(1);
    document.getElementById(`allPokemon`).innerHTML += generateAllPokemonHTML(
      i,
      pokemonName
    );
    loadPokemonInfo(i);
  }
}

async function loadPokemonInfo(i) {
  // get currentPokemon for single informations
  let url = allPokemon["results"][i]["url"];
  let response = await fetch(url);
  let currentPokemon = await response.json();
  sourceOfPokemon.push(currentPokemon);

  let pokeImage = currentPokemon["sprites"]["other"]["home"]["front_default"];
  let pokeType =
    currentPokemon["types"][0]["type"]["name"].charAt(0).toUpperCase() +
    currentPokemon["types"][0]["type"]["name"].slice(1);

  console.log("pokeImage", pokeImage);

  fillInfos(i, pokeImage, pokeType);
  changeAllTypeColors(pokeType, pokeImage, i);
}

function fillInfos(i, pokeImage, pokeType) {
  // fill infos into smallpokemon cards
  document.getElementById(`pokeImage${i}`).src = pokeImage;
  document.getElementById(`pokeType${i}`).innerHTML = pokeType;
}

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

function showPokeCard(i) {
  console.log(i, "source", sourceOfPokemon[i]);
  // rendering HTML for currentpokemon
  document.body.style.overflow = "hidden";
  let pokeImage =
    sourceOfPokemon[i]["sprites"]["other"]["home"]["front_default"];
  let prevImg =
    sourceOfPokemon[i - 1]["sprites"]["other"]["home"]["front_default"];
  let nextImg =
    sourceOfPokemon[i + 1]["sprites"]["other"]["home"]["front_default"];
  let pokeType =
    sourceOfPokemon[i]["types"][0]["type"]["name"].charAt(0).toUpperCase() +
    sourceOfPokemon[i]["types"][0]["type"]["name"].slice(1);
  let pokeName =
    sourceOfPokemon[i]["name"].charAt(0).toUpperCase() +
    sourceOfPokemon[i]["name"].slice(1);
  let pokeWeight = sourceOfPokemon[i]["weight"];
  let pokeHp = sourceOfPokemon[i]["stats"][0]["base_stat"];
  let pokeAtt = sourceOfPokemon[i]["stats"][1]["base_stat"];
  let pokeDef = sourceOfPokemon[i]["stats"][2]["base_stat"];

  let pokeCard = document.getElementById("overlay");
  pokeCard.innerHTML = ``;
  pokeCard.innerHTML = `
  <div id="pokedex" onclick="event.stopPropagation()" >
  <div class="card-head">
    <p id="pokemonName">${pokeName}</p>
    <p id="id" class="id"># ${i + 1}</p>
  </div>
  <div class="presentation">
    <div class="sides"><img id="firstPokemon" onclick="previousPokemon(${i})" class="miniMe" src="${prevImg}" /></div>
    <div class="center"><img id="pokemonImage" class="pokemonImage" src="${pokeImage}" /></div>
    <div class="sides"><img id="lastPokemon" onclick="nextPokemon(${i})" class="miniMe" src="${nextImg}" /></div>
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
  document.getElementById(`overlay`).classList.remove("d-none");
}

function hidePokeCard() {
  document.getElementById("overlay").classList.add("d-none");
  document.body.style.overflow = "auto";
}

function previousPokemon(i, pokeImage) {
  console.log("i", i);
  if (i > 1) {
    i--;
    showPokeCard(i);
  } else {
    i = 0;
    pokeImage = sourceOfPokemon[i]["sprites"]["other"]["home"]["front_default"];
    document.getElementById("firstPokemon").style.opacity = "0";
    showPokeCard(i);
  }
}

function nextPokemon(i) {
  if (i < sourceOfPokemon.length) {
    showPokeCard(i + 1);
  } else {
    showPokeCard(0);
  }
}

////////////////////////////////colorChanges////////////////////////////////

function changeAllTypeColors(pokeType, pokeImage, i) {
  let color;
  if (pokeType == "Grass") {
    color = "#028900";
    colorChangeSmallCards(i, color);
  } else if (pokeType == "Fire") {
    color = "#ff1903";
    colorChangeSmallCards(i, color);
  } else if (pokeType == "Water") {
    color = "#303eff";
    colorChangeSmallCards(i, color);
  } else if (pokeType == "Bug") {
    color = "orange";
    colorChangeSmallCards(i, color);
  } else if (pokeType == "Normal") {
    color = "white";
    colorChangeSmallCards(i, color);
  } else if (pokeType == "Poison") {
    color = "#800080";
    colorChangeSmallCards(i, color);
  } else if (pokeType == "Electric") {
    color = "#fecc00";
    colorChangeSmallCards(i, color);
  } else if (pokeType == "Ground") {
    color = "rgb(132, 45, 1)";
    colorChangeSmallCards(i, color);
  } else if (pokeType == "Fairy") {
    color = "pink";
    colorChangeSmallCards(i, color);
  }
}

function changeSingleTypeColor(pokeType) {
  let color;
  if (pokeType == "Grass") {
    color = "#028900";
    colorChangeBigCard(color);
  } else if (pokeType == "Fire") {
    color = "#ff1903";
    colorChangeBigCard(color);
  } else if (pokeType == "Water") {
    color = "#303eff";
    colorChangeBigCard(color);
  } else if (pokeType == "Bug") {
    color = "orange";
    colorChangeBigCard(color);
  } else if (pokeType == "Normal") {
    color = "white";
    colorChangeBigCard(color);
  } else if (pokeType == "Poison") {
    color = "#800080";
    colorChangeBigCard(color);
  } else if (pokeType == "Electric") {
    color = "#fecc00";
    colorChangeBigCard(color);
  } else if (pokeType == "Ground") {
    color = "rgb(132, 45, 1)";
    colorChangeBigCard(color);
  } else if (pokeType == "Fairy") {
    color = "pink";
    colorChangeBigCard(color);
  }
}

function colorChangeSmallCards(i, color) {
  document.getElementById(
    `singlePokemon${i}`
  ).style.border = `0.5px solid ${color}`;
  document.getElementById(
    `singlePokemon${i}`
  ).style.boxShadow = `0px 0px 22px ${color}`;
  document.getElementById(
    `pokeImage${i}`
  ).style.filter = `drop-shadow(0px 0px 25px ${color})`;
}

function colorChangeBigCard(color) {
  document.getElementById(`pokedex`).style.border = `0.5px solid ${color}`;
  document.getElementById(`pokedex`).style.boxShadow = `0px 0px 128px ${color}`;
  document.getElementById(
    `pokemonImage`
  ).style.filter = `drop-shadow(0px 0px 25px ${color})`;
}
