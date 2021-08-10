const BASE_URL = 'https://restcountries.eu/rest/v2';
const CHINA = 'China';
const SUDAN = 'Sudan';

function fetchCountries(searchQuery) {
  if (searchQuery === CHINA.toLowerCase() || searchQuery === SUDAN.toLowerCase()) {
    return fetch(`${BASE_URL}/name/${searchQuery}?fullText=true`).then(response => {
      return response.json();
    });
  } else
    return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
      return response.json();
    });
}

export default { fetchCountries };
