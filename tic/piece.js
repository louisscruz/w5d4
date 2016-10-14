'use strict';

class Piece {
  constructor(board, pos, sym) {
    this.pos = pos;
    this.board = board;
    this.sym = sym;
    this.generateStreaks();
  }

  generateStreaks() {
    this.streaks = {};
    let neighbors = [];

    this.board.constructor.eachDirection((key, dir) => {
      let piece = this.getPiece(dir);

      this.streaks[key] = 1;

      if (piece && piece.sym === this.sym) {
        neighbors.push({piece: piece, direction: dir});
        this.streaks[key] += piece.streaks[key];
      }
    });
    let checkedDirs = [];
    this.board.constructor.eachDirection((key, dir) => {
      if (!checkedDirs.includes(key)) {
        let oppositeKey = this.board.constructor.getOppositeKey(dir);
        let sum = this.streaks[key] + this.streaks[oppositeKey];
        if (sum > this.board.size) this.board.winner = this.sym;
        checkedDirs.push(oppositeKey);
      }
    });

    this.updateNeighbors(neighbors);
  }

  updateNeighbors(neighbors) {
    neighbors.forEach(neighbor => {
      let key = this.board.constructor.getDirectionKey(neighbor.dir);
      let piece = neighbor.piece;
      piece.streaks[key] += this.streaks[key]
    });
  }

  getPiece(direction){
    let pos = [];
    pos.push(this.pos[0] + direction[0]);
    pos.push(this.pos[1] + direction[1]);

    return this.board.getPiece(pos);
  }

  toString() {
    return this.sym.toUpperCase();
  }
}

module.exports = Piece;
