export default class ApiHandler {
  constructor() {
    this.endpointURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
    if (localStorage.getItem("game")) {
      this.id = localStorage.getItem("game");
    } else {
      fetch(this.endpointURL, {
        method: "POST",
        body: JSON.stringify({
          name: "Leaderboard Game"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.id = json.result.split(" ", 4)[3]
          localStorage.setItem('game',this.id);
        });
    }
  }

  addScore = async (score) => {
    const data = await fetch(`${this.endpointURL}/${this.id}/scores/`, {
      method: "POST",
      body: JSON.stringify({
        user: score.name,
        score: score.score
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return data.json();
  }

  getScores = async () => {
    const scores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.id}/scores/`);
    return scores.json();
  }
}
