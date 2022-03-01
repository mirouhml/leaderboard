export default class Leaderboard {
  constructor() {
    if (localStorage.getItem('scores')) {
      this.list = JSON.parse(localStorage.getItem('scores'));
    } else this.list = [];
  }

  populateStorage() {
    localStorage.setItem('scores', JSON.stringify(this.list));
  }

  add(score) {
    this.list.push(score);
    this.populateStorage();
  }

  getScores() {
    return this.list;
  }

  display() {
    const container = document.querySelector('.recent-scores-list');
    container.innerHTML = '';
    this.list.forEach((score, i) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('id', `score${i}`);
      listItem.innerHTML = `${score.name}: ${score.score}`;
      container.appendChild(listItem);
    });
  }
}
