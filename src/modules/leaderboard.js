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
    const myPromise = new Promise((resolve, reject) => {
      const data = this.apiHandler.addScore(score);
      if (data) {
        resolve(data);
      } else reject();
    });
    myPromise.then(
      (value) => {
        this.status.innerHTML = value.result;
        this.status.className = 'green';
        setInterval(() => { this.status.innerHTML = ''; }, 2000);
      },
      () => {
        const error = 'An error occurred while creating score, please try again shortly.';
        this.status.innerHTML = error;
        this.status.className = 'red';
        setInterval(() => { this.status.innerHTML = ''; }, 2000);
      },
    );
  }

  getScores() {
    const promise = new Promise((resolve) => {
      const data = this.apiHandler.getScores();
      resolve(data);
    });
    promise.then(
      (value) => {
        this.list = value.result;
        this.display();
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
