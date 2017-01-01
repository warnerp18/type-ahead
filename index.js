const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

fetch(endpoint)
    .then(blob => blob.json())
    .then(data =>  cities.push(...data ));

function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
  const inputValue = this.value;
  const matchArray = findMatches(inputValue, cities)
  const html = matchArray.map(place => {
    const regex = new RegExp(inputValue, 'gi');
    const cityName = place.city.replace(regex, `<span class='hl'>${inputValue}</span>`)
    const stateName = place.city.replace(regex, `<span class='hl'>${inputValue}</span>`)
    return `
      <li>
      <span>${cityName}, ${stateName}</span>
      <span>${numberWithCommas(place.population)}</span>
      </li>`;
     }).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('keyup', displayMatches)
