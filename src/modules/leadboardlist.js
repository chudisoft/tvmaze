class LeadboardList {
  constructor() {
    this.leadboardList = [];

    this.leadboardListElement = document.querySelector('#tvmaze');
    this.leadboardStorageName = 'leadboardlist';
    this.gameId = '';
    this.lblMessage = document.querySelector('#message');
    this.baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    this.retrieveId();
  }

  saveData() {
    localStorage.setItem(this.leadboardStorageName, this.gameId);
  }

  retrieveId() {
    this.gameId = localStorage.getItem(this.leadboardStorageName);
  }

  getLeadboardList() {
    return this.leadboardList;
  }

  addLeadboard(leadboard) {
    const divLeadboard = document.createElement('div');
    divLeadboard.className = 'bg';

    const elName = document.createElement('label');
    const elScore = document.createElement('label');

    elName.textContent = `${leadboard.name}: `;
    elScore.textContent = `${leadboard.score}`;

    divLeadboard.appendChild(elName);
    divLeadboard.appendChild(elScore);
    this.leadboardListElement.appendChild(divLeadboard);
  }

  getGames = (async (btnRefresh = null) => {
    this.retrieveId();
    this.leadboardListElement.innerText = '';
    if (btnRefresh !== null) btnRefresh.childNodes[2].classList.toggle('fa-spin');
    if (this.gameId === null) this.createGame();
    const response = await fetch(`${this.baseUrl}games/${this.gameId}/scores`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
    });
    const games = await response.json();
    if (games.message) {
      this.lblMessage.textContent = games.message;
    } else if (games.result) {
      games.result.forEach((x) => {
        this.addLeadboard(
          {
            name: x.user,
            score: x.score,
          },
        );
      });
    }
    if (btnRefresh !== null) btnRefresh.childNodes[2].classList.toggle('fa-spin');
  });

  createGame = (async () => {
    const response = await fetch(`${this.baseUrl}games`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
      body: JSON.stringify({
        name: 'Test game',
      }),
    });
    const games = await response.json();
    if (games.message) {
      this.lblMessage.textContent = games.message;
    } else if (games.result) {
      [, , , this.gameId] = games.result.split(' ');
      this.saveData();
    }
  })

  postScore = (async (leadboard) => {
    if (this.gameId === null) await this.createGame();
    const response = await fetch(`${this.baseUrl}games/${this.gameId}/scores/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
      body: JSON.stringify({
        user: leadboard.name,
        score: leadboard.score,
      }),
    });
    const games = await response.json();
    if (games.result) {
      this.lblMessage.textContent = games.message;
      this.addLeadboard(leadboard);
    }
  });
}

export default LeadboardList;