import Reflux from 'reflux';

var GameActions = Reflux.createActions([
  'shuffleDeck',
  'fillGrid',
  'selectCard',
  'resetGame',
  'clearGrid'
]);

export default GameActions;
