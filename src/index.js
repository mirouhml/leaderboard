import './style.scss';
import Leaderboard from './modules/leaderboard.js';

const leaderboard = new Leaderboard();
const refresh = document.querySelector('#refresh');
const add = document.querySelector('#submit');

refresh.addEventListener('click', () => {
  leaderboard.getScoresList();
});

add.addEventListener('click', () => {
  const name = document.querySelector('#name');
  const score = document.querySelector('#score');
  const scoreItem = {
    name: name.value,
    score: score.value,
  };

  if (name.value === '' || score.value === '') {
    const status = document.querySelector('#status');
    status.innerHTML = 'Please fill both fields before submitting.';
    status.className = 'red';
    setTimeout(() => { status.innerHTML = ''; }, 2400);
  } else {
    leaderboard.add(scoreItem);
  }
});
