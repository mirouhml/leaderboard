import './style.scss';
import Leaderboard from './modules/leaderboard.js';

const leaderboard = new Leaderboard();

leaderboard.getScores();

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
  name.value = '';
  score.value = '';
  leaderboard.add(scoreItem);
});
