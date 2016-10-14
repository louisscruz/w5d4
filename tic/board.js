'use strict';

const Piece = require('./piece');

class Board {
  constructor(size) {
    this.size = size;
    this.grid = this.generateGrid();
    this.winner = null;
  }

  generateGrid() {
    let grid = [];
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
  }

  static dirs() {
    return {
      'ne': [-1,1],
      'e': [0,1],
      'se': [1,1],
      's': [1,0],
      'sw': [1,-1],
      'w': [0,-1],
      'nw': [-1,-1],
      'n': [-1,0]
    };
  }

  static eachDirection(cb) {
    let dirs = Board.dirs();

    for (let key in dirs) {
      if (dirs.hasOwnProperty(key)) {
        cb(key, dirs[key]);
      }
    }
  }

  static getOppositeDirection(direction) {
    return direction.map(n => {
      if (n !== 0) {
        return n * -1;
      } else {
        return 0;
      }
    });
  }

  static getOppositeKey(direction) {
    let opposite = Board.getOppositeDirection(direction);
    return Board.getDirectionKey(opposite);
  }

  static getDirectionKey(direction) {
    let returnKey = null;
    Board.eachDirection((key, dir) => {
      if(JSON.stringify(dir) === JSON.stringify(direction)) returnKey = key;
    });
    return returnKey;
  }

  won() {
    return !!this.winner;
  }

  empty(pos) {
    return !this.getPiece(pos);
  }

  placeMark(pos, mark) {
    if (this.empty(pos)) {
      let piece = new Piece(this, pos, mark);
      let row = pos[0];
      let col = pos[1];
      this.grid[row][col] = piece;
    }
  }

  getPiece(pos) {
    if(this.isValidPos(pos)) {
      return this.grid[pos[0]][pos[1]];
    } else {
      return null;
    }
  }

  isValidPos(pos) {
    let row = pos[0];
    let col = pos[1];

    if( row < 0 || row >= this.grid.length || col < 0 || col >= this.grid.length ) {
      return false;
    }

    return true;
  }

  print() {
    for (let i = 0; i < this.grid.length; i++) {
      let values = this.grid[i].map(value => {
        return value ? value.toString() : ' ';
      });
      console.log(values.join(' | '));
      if (i < this.grid.length - 1) {
        let line = '';
        for(let j = 0; j < this.size; j++) {
          line += '---';
        }
        console.log(line);
      }
    }
  }
}

module.exports = Board;
