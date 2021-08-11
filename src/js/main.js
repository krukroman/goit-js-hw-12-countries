import API from './fetchCountries';
import getRefs from './get-refs';
import errorNotif from './notify';
import countryNameListTmp from '../templates/country-name-list.hbs';
import countryInformationTmp from '../templates/country-information.hbs';
let debounce = require('lodash.debounce');

const refs = getRefs();

refs.countryNameInput.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  let searchQuery = e.target.value;
  if (searchQuery === '') {
    resetInfo();
    return;
  }
  API.fetchCountries(searchQuery).then(renderInformation).catch(onError);
}

function renderInformation(country) {
  if (country.length > 10) {
    resetInfo();
    errorNotif({
      text: 'Слишком много совпадений, продолжите ввод',
      type: 'error',
      autoOpen: 'false',
      height: '200px',
      width: '400px',
      delay: 4500,
      animation: 'fade',
    });
    return;
  } else if (country.length > 1 && country.length <= 10) {
    renderCountryNameList(country);
  } else if (country.length === 1) {
    renderCountryInfo(country);
  }
}

function renderCountryInfo(country) {
  let markupInfo = countryInformationTmp(country);
  refs.countrySection.innerHTML = markupInfo;
}

function renderCountryNameList(country) {
  let murkupList = countryNameListTmp(country);
  refs.countrySection.innerHTML = murkupList;
}

function resetInfo() {
  refs.countrySection.innerHTML = '';
}

function onError(error) {
  alert('Что то пошло не так');
  console.log(error);
}
