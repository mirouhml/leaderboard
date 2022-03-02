import ApiHandler from './apiHandler.js';

export default class Leaderboard {
  constructor() {
    this.apiHandler = new ApiHandler();
    if (localStorage.getItem('game')) {
      this.getScores();
    }
    this.list = [];
    this.status = document.getElementById('status');
  }

  add(score) {
    console.log('here');
    const loader = document.getElementById('submit-loader');
    loader.classList.add('loader-active');
    this.apiHandler.addScore(score).then(
      (value) => {
        console.log(value);
        this.status.innerHTML = value.result;
        this.status.className = 'green';
        setTimeout(() => {this.status.innerHTML = '';}, 2400);
        loader.classList.remove('loader-active');
        const name = document.querySelector('#name');
        const score = document.querySelector('#score');
        name.value = '';
        score.value = '';
      },
      () => {
        console.log('here');
        const error = 'An error occurred while creating score, please try again shortly.';
        this.status.innerHTML = error;
        this.status.className = 'red';
        setTimeout(() => {this.status.innerHTML = '';}, 2400);
        loader.classList.remove('loader-active');
      },
    );
  }

  getScores() {
    const loader = document.getElementById('list-loader');
    loader.classList.add('loader-active');
    const promise = new Promise((resolve) => {
      const data = this.apiHandler.getScores();
      resolve(data);
    });
    promise.then(
      (value) => {
        this.list = value.result;
        this.display();
        loader.classList.remove('loader-active');
      },
    );
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
