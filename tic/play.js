const TicTacToe = require('./game.js');

players = [
  {name: 'Todd', mark: 'x'},
  {name: 'Louis', mark: 'o'}
];

const game = new TicTacToe(3, players);
game.run();

/*
THIS WOULD BE BETTER:::::::

To start, have an array of numbers for each row, column, and diagonal for each player.
On each move, increment the elements corresponding to the player for the row, column,
and diagonal (the move may not necessarily be on a diagonal) influenced by that move.
If the count for that player is equal to the dimension of the board, that player wins.

*/
