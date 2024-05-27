// Helper function to check the status of the fetch response
function checkStatus(response) {
  if (response.ok) {
    return response; // If response is OK, return the response
  } else {
    throw new Error('Fetch request failed'); // If response is not OK, throw an error
  }
}

// GLOBAL VARIABLES
const dogButton = document.querySelector('.random');

// EVENT LISTENERS
// click and change
dogButton.addEventListener('click', getDoggo);

// random dog image
function getDoggo() {
  fetch('https://api.thedogapi.com/v1/images/search')
    .then(checkStatus) // Check the status of the fetch response
    .then(response => response.json())
    .then(data => handleData(data))
    .catch(error => console.error(error)); // Handle errors appropriately
}

// handleData
function handleData(data) {
  if (data && data.length > 0) {
    let url = data[0].url; // Access the URL of the image from the first object in the array
    document.getElementById('dogImageContainer').innerHTML = `<img alt="random image of a dog" src='${url}'/>`;
  } else {
    console.error('Empty response or invalid data format');
  }
}