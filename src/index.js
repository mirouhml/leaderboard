import './style.scss';
import Leaderboard from './modules/leaderboard.js';

const leaderboard = new Leaderboard();
const refresh = document.querySelector('#refresh');
const add = document.querySelector('#submit');

refresh.addEventListener('click', () => {
  leaderboard.getScores();
});

add.addEventListener('click', () => {
  const name = document.querySelector('#name');
  const score = document.querySelector('#score');
  const scoreItem = {
    name: name.value,
    score: score.value,
  };

  if (name.value === '' && score.value === '') {
    const status = document.querySelector('#status');
    status.innerHTML = 'Please fill both fields before submitting';
    status.className = 'red';
    setInterval(() => { status.innerHTML = ''; }, 2000);
  } else {
    leaderboard.add(scoreItem);
    name.value = '';
    score.value = '';
  }
});
