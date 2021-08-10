import API from './fetchCountries';
import countryNameListTmp from '../templates/country-name-list.hbs';
import countryInformationTmp from '../templates/country-information.hbs';
let debounce = require('lodash.debounce');
import { error, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
const refs = {
  countryNameInput: document.querySelector('.text__input'),
  countryNameList: document.querySelector('.country-name__list'),
  countrySection: document.querySelector('.country__section'),
};

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
    error({
      text: 'Слишком много совпадений, продолжите ввод',
      type: 'error',
      autoOpen: 'false',
      width: '400px',
      delay: 3000,
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
  refs.countryNameList.innerHTML = '';
  let markupInfo = countryInformationTmp(country);
  refs.countrySection.innerHTML = markupInfo;
}

function renderCountryNameList(country) {
  refs.countrySection.innerHTML = '';
  let murkupList = countryNameListTmp(country);
  refs.countryNameList.innerHTML = murkupList;
}

function resetInfo() {
  refs.countryNameList.innerHTML = '';
  refs.countrySection.innerHTML = '';
}

function onError(error) {
  alert('Что то пошло не так');
  console.log(error);
}
