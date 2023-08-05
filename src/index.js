import MealList from './modules/meallist.js';
import './style.css';

const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
const baseUrlInvolve = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const mealAppIdName = 'meallist';
let appId = '';

const saveData = () => {
  localStorage.setItem(mealAppIdName, appId);
};

const createApp = (async () => {
  const response = await fetch(`${this.baseUrlInvolve}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/text',
    },
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
  });
  appId = await response.text();
  saveData();
});

const retrieveId = () => {
  appId = localStorage.getItem(mealAppIdName);
  if (appId === null) createApp();
};

document.body.onload = () => {
  retrieveId();
  const mealsNew = new MealList(appId, baseUrl, baseUrlInvolve, 52772);
  mealsNew.getMeals(null);
  // const mealNew = new MealList(appId, baseUrl, baseUrlInvolve, 52772);
  // const mealNew = new MealList(53075);
  // mealNew.getMeal(null);
  // if (mealNew.gameId === null) mealNew.createApp();
};

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
modalClose.addEventListener('click', () => {
  modal.classList.toggle('show');
});

document.onkeydown = (evt) => {
  evt = evt || window.event;
  let isEscape = false;
  if ('key' in evt) {
      isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
  } else {
      isEscape = (evt.keyCode === 27);
  }
  if (isEscape && modal.classList.contains('show')) {
      modal.classList.toggle('show');
  }
};
