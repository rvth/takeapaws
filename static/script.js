//GLOBAL VARIABLES
const dogButton = document.querySelector('.random');


//EVENT LISTENERS
//click and change
dogButton.addEventListener('click', getDoggo);

//random dog image
function getDoggo(){
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(checkStatus)
    .then(response => response.json())
    .then(data => handleData(data))
    .catch(error => notifyUser(error))
}

//HELPER FUNCTIONS
//checkStatus
function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response);
  }else{
    return Promise.reject(new Error(response.statusText));
  }
}

//handleData
function handleData(data){
  let url = data.message;
  console.log(url)
  let regex = /https:\/\/images\.dog\.ceo\/breeds\/(\w+\-?\w+)\/.+/g;
  let breedName = regex.exec(url);
  document.getElementById('dogImageContainer').innerHTML = `<img alt="random image of a ${fixBreed(breedName[1])}" src='${url}'/>`;
  document.querySelector('.dogInfo').innerHTML = `<p class="h5">Random image of a ${fixBreed(breedName[1])}</p>`;
}

//getImageURL
function getImageURL(data){
  //get random number
  let randomNumberURL = data[Math.floor(Math.random()*data.length)+1];
  listImageContainer.innerHTML = `<img src="${randomNumberURL}" alt="${extractBreedName(data)}"/>`;
}

//fixBreed
function fixBreed(breedName){
  if(breedName === 'germanshepherd'){
    return 'German Shepherd';
  }else if(breedName === 'mexicanhairless'){
    return 'Mexican Hairless';
  }else if(breedName === 'stbernard'){
    return 'St. Bernard';
  }else if(breedName === "african"){
    return 'African Wild Dog';
  }else if(breedName === 'bullterrier'){
    return 'Bull Terier';
  }
  return capitalize(breedName);
}

//capitalize breed name
function capitalize(breedName){
  return breedName.replace(/\-/g,' ')
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase()+word.slice(1))
				          .join(" ");
}

//extract breed name
function extractBreedName(data){
  let regex = /https:\/\/images\.dog\.ceo\/breeds\/(\w+-?\w+)\/\w+\.\w+/g;
  let match = regex.exec(data);
  return fixBreed(match[1]);
}