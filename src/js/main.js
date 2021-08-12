import API from './fetchCountries';
import getRefs from './get-refs';
import errorNotification from './notify';
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
  API.fetchCountries(searchQuery)
    .then(countries => {
      if (countries.status === 404) {
        resetInfo();
        throw error;
      }
      renderInformation(countries);
    })
    .catch(onError);
}

function renderInformation(countries) {
  if (countries.length > 10) {
    resetInfo();
    errorNotification({
      title: 'Предупреждение!!!',
      text: 'Слишком много совпадений, продолжите ввод',
      delay: 3000,
      type: 'error',
      autoOpen: 'false',
      height: '300px',
      width: '400px',
      animation: 'fade',
    });
    return;
  } else if (countries.length > 1 && countries.length <= 10) {
    renderCountryNameList(countries);
  } else if (countries.length === 1) {
    renderCountryInfo(countries);
  }
}

function renderCountryInfo(countries) {
  let markupInfo = countryInformationTmp(countries);
  refs.countrySection.innerHTML = markupInfo;
}

function renderCountryNameList(countries) {
  let murkupList = countryNameListTmp(countries);
  refs.countrySection.innerHTML = murkupList;
}

function resetInfo() {
  refs.countrySection.innerHTML = '';
}

function onError(error) {
  errorNotification({
    title: 'Ошибка!!!',
    text: 'По вашему запросу ничего не найдено. Введите нормальный запрос',
    delay: 4000,
    type: 'error',
    autoOpen: 'false',
    height: '500px',
    width: '600px',
    animation: 'fade',
  });
}
