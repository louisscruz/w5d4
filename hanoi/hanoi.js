'use strict';

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

Array.prototype.last = function() {
  return this[this.length - 1];
}

class Hanoi {
  constructor() {
    this.towers = Hanoi.generateTowers();
  }

  static generateTowers() {
    return [[3, 2, 1], [], []];
  }

  run(cb) {
    //until a tower other than the original is full
    // render
    //  get a move from the player
    //  make that move
    //render
    // while(!this.isWon()) {
    //   this.print();
    //   this.promptMove();
    // }

    this.print();
    this.promptMove(() => {
      if( this.isWon()) {
        this.print();
        reader.close();
        cb();
      } else {
        this.run(cb);
      }
    });
  }

  isValidMove(start, end) {
    if (this.towers[start].length === 0) return false;
    if (this.towers[end].length === 0) return true;
    if (this.towers[start].last() < this.towers[end].last()) {
      return true;
    } else {
      return false;
    }
  }

  move(start, end) {
    if (this.isValidMove(start, end)) {
      this.towers[end].push(this.towers[start].pop());
    } else {
      console.log('Bad move punk!!!');
    }
  }

  promptMove(cb) {
    reader.question('Which tower do you want to move from, punk?', response => {
      let start = +response;
      reader.question('Which tower do you want to move to, punk?', response => {
        let end = +response;
        this.move(start, end);
        cb();
      });
    });
  }

  print() {
    console.log(JSON.stringify(this.towers));
  }

  isWon() {
    if( this.towers[1].length === 3 || this.towers[2].length === 3) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Hanoi;
