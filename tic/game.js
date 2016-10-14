const Board = require('./board');

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class TicTacToe {
  constructor(size, players) {
    this.board = new Board(size);
    this.players = players;
    this.turn = 0;
  }

  run() {
    this.board.print();
    this.promptMove(() => {
      if(this.board.won()) {
        this.board.print();
        let winner = this.getPlayer(this.board.winner);
        console.log(`Congratulations ${winner.name}, you won!! punk!`)
      } else {
        this.switchTurns();
        this.run();
      }
    });
  }

  getPlayer(sym) {
    return players[0].mark === sym ? players[0] : players[1];
  }

  switchTurns() {
    this.turn = (this.turn + 1) % 2;
  }

  currentPlayer() {
    return players[this.turn];
  }

  promptMove(cb) {
    console.log(`${this.currentPlayer().name}, it's your turn, punk!`);
    reader.question('Make a move, punk. (e.g. 1,2)', response => {
      let pos = response.split(',').map(n => parseInt(n));
      this.board.placeMark(pos, this.currentPlayer().mark);
      cb();
    });
  }
}

module.exports = TicTacToe;
