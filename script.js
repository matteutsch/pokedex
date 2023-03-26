async function loadAllPokemon() {
  // get all pokemon for display in allPokemon
  let url = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=0`;
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

  let pokeImage = currentPokemon["sprites"]["other"]["home"]["front_default"];
  let pokeType =
    currentPokemon["types"][0]["type"]["name"].charAt(0).toUpperCase() +
    currentPokemon["types"][0]["type"]["name"].slice(1);
  let pokeName = currentPokemon["name"];
  let pokeId = currentPokemon["id"];
  console.log("currentName", currentPokemon);

  fillInfos(i, pokeImage, pokeType, pokeName, pokeId);
}

function fillInfos(i, pokeImage, pokeType, pokeName, pokeId) {
  // fill infos into pokemon cards
  document.getElementById(`pokeImage${i}`).src = pokeImage;
  document.getElementById(`pokeType${i}`).innerHTML = pokeType;
  //document.getElementById(`pokemonName${i}`).innerHTML = pokeName; //not working
  //document.getElementById(`id${i}`).innerHTML = pokeId; //not working
}

function generateAllPokemonHTML(i, pokemonName) {
  //returning html for renderAllPokemon()
  return `
  <div id="singlePokemon${i}" class="singlePokemon" onclick="showPokeCard(${i})">
  <div class="miniPoke"> <p># ${i + 1}</p><p>${pokemonName}</p>
  </div>
  <img id="pokeImage${i}" />
  <div id="pokeType${i}" class="type" >type</div>
  </div>
  `;
}

function showPokeCard(i) {
  document.body.style.overflow = "hidden";
  document.getElementById(`overlay`).classList.remove("d-none");
  let pokeCard = document.getElementById("overlay");
  pokeCard.innerHTML = ``;
  pokeCard.innerHTML = `
  <div id="pokedex">
  <div class="card-head">
    <p id="pokemonName${i}"></p>
    <p id="id${id}" class="id"></p>
  </div>

  <img id="pokemonImage" />
  <div class="info-container" id="infoContainer">
    <table>
      <tr>
        <td>Type :</td>
        <td id="type"></td>
      </tr>
      <tr>
        <td>Weight :</td>
        <td id="weight">100kg</td>
      </tr>
      <tr>
        <td>Base HP :</td>
        <td id="hp">100</td>
      </tr>
      <tr>
        <td>Base Attack :</td>
        <td id="attack">10</td>
      </tr>
      <tr>
        <td>Base Defense :</td>
        <td id="defense">10</td>
      </tr>
    </table>
  </div>
  </div>`;
}

function hidePokeCard() {
  document.getElementById("overlay").classList.add("d-none");
  document.body.style.overflow = "auto";
}

//function renderPokemonInfo(currentPokemon) {
//  document.getElementById("pokemonName").innerHTML =
//    currentPokemon["name"].charAt(0).toUpperCase() + // ersten buchstaben vom namen entnehmen, in Großbuchstaben umwandeln;
//    currentPokemon["name"].slice(1); // den rest des abgeschnittenen namens wieder hinzufügen
//  document.getElementById("pokemonImage").src =
//    currentPokemon["sprites"]["other"]["home"]["front_default"];
//  document.getElementById("id").innerHTML = "#" + currentPokemon["id"];
//  document.getElementById("type").innerHTML =
//    currentPokemon["types"][0]["type"]["name"];
//  document.getElementById("weight").innerHTML = currentPokemon["weight"];
//  document.getElementById("hp").innerHTML =
//    currentPokemon["stats"][0]["base_stat"];
//  document.getElementById("attack").innerHTML =
//    currentPokemon["stats"][1]["base_stat"];
//  document.getElementById("defense").innerHTML =
//    currentPokemon["stats"][2]["base_stat"];
//}
