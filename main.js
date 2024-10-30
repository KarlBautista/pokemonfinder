// fetch = Function used for making HTTP request to fetch resources.
//      (JSON style data, images, files)
//      Simplifies asynchronois data fetching in Javascript and 
//      used for interacting with APIs to retrieve and send data 
//      asynchronously over the web.
//      fetch(url, {options})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registered'));
}
async function showPokemon(){
   
   try{
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const imgElement = document.getElementById("pokemonSpriteImg");
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const couldNotFind = document.getElementById("CouldNotFind");
    const pokemonData = document.getElementById("pokemonData");
    couldNotFind.style.display = "none";
    imgElement.style.display = "none";

    if(!response.ok){
       
        couldNotFind.textContent = "Could not find Pokemon";
        couldNotFind.style.display = "block";
        pokemonData.style.display ="none";
      
        throw new Error("Could not fetch data");
      
        
    }
    console.log(response);
    
    const data = await response.json();
    const weight = document.getElementById("weight");
    const ability = document.getElementById("Ability");
    const speciesType = document.getElementById("speciesType");
    const height = document.getElementById("height");
    const baseExp = document.getElementById("baseExp");
    const pokemonStats = document.getElementById("stats");
    const pokemonSprite = data.sprites.front_default;
    const pokemonWeight = data.weight;
    const species = data.types.map(type => type.type.name);
    const pokemonHeight = data.height;
    const pokemonAbility = data.abilities.map(ability => ability.ability.name);
    const pokemonBaseExp = data.base_experience;
   
   
  
    pokemonStats.innerHTML = '';
   
    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";
    

    weight.textContent = `${pokemonWeight}kg`;
    height.textContent = `${pokemonHeight}m`
    ability.textContent = `${pokemonAbility}`;
    speciesType.textContent = `${species}`;
    baseExp.textContent = `${pokemonBaseExp}`;
    const stats = data.stats.forEach((stat) => {
        const statName = stat.stat.name;
        const baseStat = stat.base_stat;
    
        // Create a new paragraph element for each stat
        const statElement = document.createElement("p");
        
        // Create a span for the baseStat to style it differently
        const baseStatElement = document.createElement("span");
        baseStatElement.textContent = baseStat; // Set the text for baseStat
        baseStatElement.classList.add("base-stat"); // Add a class for styling
    
        // Combine the statName and baseStat in the paragraph
        statElement.innerHTML = `${statName}: `; // Set statName text
        statElement.appendChild(baseStatElement); // Append the baseStat span
    
        // Append the stat element to pokemonStats
        pokemonStats.appendChild(statElement);
    });

    pokemonData.style.display = "block";
   }
   catch(error){
    console.error(error);
   }
   


    
}   

