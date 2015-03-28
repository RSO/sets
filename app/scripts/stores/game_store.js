import Reflux from 'reflux';
import GameActions from '../actions/game_actions';
import shuffle from '../utils/shuffle.js';

var COLORS = ['red', 'green', 'purple'];
var SHAPES = ['diamond', 'squiggle', 'oval'];
var FILLS = ['empty', 'filled', 'lined'];
var AMOUNTS = [1, 2, 3];

var GameStore = Reflux.createStore({
  init() {
    this.deck = [];
    this.grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    this.listenToMany(GameActions);
  },

  onShuffleDeck() {
    var deck = [];

    COLORS.map(function(color) {
      SHAPES.map(function(shape) {
        FILLS.map(function(fill) {
          AMOUNTS.map(function(amount) {
            deck.push({
              color: color,
              shape: shape,
              fill: fill,
              amount: amount
            });
          });
        });
      });
    });

    this.deck = shuffle(deck);

    this.trigger({
      deck: this.deck
    });
  },

  onFillGrid() {
    var deck = this.deck;
    var grid = this.grid.map(function(row) {
      return row.map(function(column) {
        if(column === null) {
          var item = deck.pop();
          return item;
        }
      });
    });

    this.deck = deck;
    this.grid = grid;

    this.trigger({
      deck: this.deck,
      grid: this.grid
    });
  },
});

export default GameStore;
