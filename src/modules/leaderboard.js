import ApiHandler from './apiHandler.js';

export default class Leaderboard extends ApiHandler {
  constructor() {
    super();
    if (localStorage.getItem('game')) {
      this.getScoresList();
    }
    this.list = [];
  }

  add(score) {
    const status = document.getElementById('status');
    const loader = document.getElementById('submit-loader');
    loader.classList.add('loader-active');
    this.addScore(score).then(
      (value) => {
        status.innerHTML = value.result;
        status.className = 'green';
        setTimeout(() => { status.innerHTML = ''; }, 2400);
        loader.classList.remove('loader-active');
        const name = document.querySelector('#name');
        const score = document.querySelector('#score');
        name.value = '';
        score.value = '';
      },
      () => {
        const error = 'An error occurred while creating score, please try again shortly.';
        status.innerHTML = error;
        status.className = 'red';
        setTimeout(() => { status.innerHTML = ''; }, 2400);
        loader.classList.remove('loader-active');
      },
    );
  }

  getScoresList() {
    const loader = document.getElementById('list-loader');
    loader.classList.add('loader-active');
    const data = this.getScores();
    data.then((scores) => {
      this.list = scores.result;
      this.display();
      loader.classList.remove('loader-active');
    });
  }

  display() {
    const container = document.querySelector('.recent-scores-list');
    container.innerHTML = '';
    this.list.forEach((score, i) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('id', `score${i}`);
      listItem.innerHTML = `${score.user}: ${score.score}`;
      container.appendChild(listItem);
    });
  }
}
