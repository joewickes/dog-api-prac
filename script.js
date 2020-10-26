let url = 'https://dog.ceo/api/breeds/image/random/3';

let numDogs = null;

let form = `<form id="dogNum">
<label for="dogNum">How many dog pics to display: </label>
<input type="number" name="" id="numberOfDogs">
<button type="submit">Submit</button>
</form>

<form id="dogBreed">
<label for="whatBreed">What breed should to show: </label>
<input type="text" name="" id="whatBreed">
<button type="submit">Submit</button>
</form>`;

let dogs = '';


function render() {
  const finalTemplate = form + dogs;

  $('body').html(finalTemplate);
}

function getDogs() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const dogPics = json.message;
      dogs = '';
      let index = 0;

      dogPics.forEach(pic => {
        dogs += `
          <img src="${pic}" alt="dog picture ${index + 1}">
        `;
        index++;
      });

      render();
    });
}

function getBreed() {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((json) => {
      const dogPic = json.message;
      let randomIndex = Math.floor(Math.random() * dogPic.length);

      dogs = '';

      dogs += `
      <img src="${dogPic[randomIndex]}" alt="dog breed pic">
    `;

      render();
    })
    .catch((error) => {
      console.log('error happened');
      dogs = '404: Breed Not Found.\nSee console for details';
      render();
      console.log(error.message);
    });
}

function handleDogsSubmit() {
  $('body').on('submit', '#dogNum', (e) => {
    
    e.preventDefault();
    
    numDogs = $('#numberOfDogs').val();
    console.log(numDogs);

    url = `https://dog.ceo/api/breeds/image/random/${numDogs}`;
    console.log(url);
  
    getDogs();
  });
}

function handleBreedSubmit() {
  $('body').on('submit', '#dogBreed', (e) => {
    e.preventDefault();
    
    const breed = $('#whatBreed').val();
  
    url = `https://dog.ceo/api/breed/${breed}/images`;

    getBreed();
  });
}

function main() {
  getDogs();
  handleDogsSubmit();
  handleBreedSubmit();
}

$(main());