import Reflux from 'reflux';
import GameActions from '../actions/game_actions';
import shuffle from '../utils/shuffle.js';

var COLORS = ['red', 'green', 'purple'];
var SHAPES = ['diamond', 'squiggle', 'oval'];
var FILLS = ['empty', 'filled', 'lined'];
var AMOUNTS = [1, 2, 3];

var GameStore = Reflux.createStore({
  listenables: GameActions,

  onShuffleDeck() {
    var deck = [];

    COLORS.map(function(color) {
      SHAPES.map(function(shape) {
        FILLS.map(function(fill) {
          AMOUNTS.map(function(amount) {
            deck.push({
              id: color + '-' + shape + '-' + fill + '-' + amount,
              color: color,
              shape: shape,
              fill: fill,
              amount: amount,
              selected: false
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

  onSelectCard(x, y) {
    var grid = this.grid;

    grid[y][x].selected = !grid[y][x].selected;

    this.grid = grid;

    this.checkForSet();

    this.trigger({
      grid: grid
    });
  },

  onFillGrid() {
    var deck = this.deck;
    var grid = this.grid.map(function(row) {
      return row.map(function(column) {
        if(column === null) {
          return deck.pop();
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

  onClearGrid() {
    this.sets = [];
    this.deck = [];
    this.grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
  },

  onResetGame() {
    GameActions.clearGrid();
    GameActions.shuffleDeck();
    GameActions.fillGrid();
  },

  checkForSet() {
    var selectedCards = this.getSelectedCards();
    var sets = this.sets;
    var set = true;

    if (selectedCards.length < 3)
      return;

    _.each(['amount', 'fill', 'color', 'shape'], function(attribute) {
      var uniqueCount = _(selectedCards).pluck(attribute).uniq().value().length

      // Fix for Larsieboy hack
      if (uniqueCount === 1 || uniqueCount === 3) {
        set = false;
      }
    });

    if (set) {
      this.replaceSelectedCardsFromDeck();

      sets.push(selectedCards);

      this.sets = sets;

      this.trigger({
        sets: this.sets
      });
    }
  },

  replaceSelectedCardsFromDeck() {
    var deck = this.deck;
    var grid = this.grid;

    _.each(this.grid, function(row, row_index) {
      _.each(row, function(column, column_index) {
        if (column.selected) {
          grid[row_index][column_index] = deck.pop();
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

  getSelectedCards() {
    return _(this.grid).flatten(true).where({ selected: true }).value();
  },
});

export default GameStore;
