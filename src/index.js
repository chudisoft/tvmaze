import LeadboardList from './modules/leadboardlist.js';
import './style.css';

const form = document.querySelector('form');
const btnRefresh = document.querySelector('#btnRefresh');
const leadboardNew = new LeadboardList();

document.body.onload = () => {
  if (leadboardNew.gameId === null) leadboardNew.createGame();
};

//  add an event listener to the refresh button
btnRefresh.addEventListener('click', () => {
  leadboardNew.getGames(btnRefresh);
});

//  add an event listener to the form submit button
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const score = document.querySelector('#score').value;
  if (name !== '') {
    const leadboard = {
      name,
      score,
    };
    leadboardNew.postScore(leadboard);
    document.querySelector('#name').value = '';
    document.querySelector('#score').value = '';
  }
});