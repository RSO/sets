import React from 'react';
import Tile from '../components/tile.jsx';
import shuffle from '../utils/shuffle.js';

var COLORS = ['red', 'green', 'purple'];
var SHAPES = ['diamond', 'squiggle', 'oval'];
var FILLS = ['empty', 'filled', 'lined'];
var AMOUNTS = [1, 2, 3];

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      deck: []
    };

    this.renderGrid = this.renderGrid.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this);
  }

  componentWillMount() {
    this.shuffleDeck();
  }

  componentDidMount() {
    this.fillGrid();
  }

  shuffleDeck() {
    var deck = [];

    COLORS.map(function(color) {
      SHAPES.map(function(shape) {
        FILLS.map(function(fill) {
          AMOUNTS.map(function(amount) {
            deck.push(
              <Tile color={color}
                shape={shape}
                fill={fill}
                amount={amount}
                select={function(){}} />);
          });
        });
      });
    });

    this.setState({ deck: shuffle(deck) });
  }

  fillGrid() {
    var deck = this.state.deck;
    var grid = this.state.grid.map(function(row) {
      return row.map(function(column) {
        if(column === null) {
          var item = deck.pop();
          return item;
        }
      });
    });

    this.setState({
      deck: deck,
      grid: grid
    });
  }

  renderGrid() {
    var renderRow = function(row) {
      return row.map(function(column) {
        return column;
      });
    };

    return this.state.grid.map(function(row) {
      return (
        <div className="row">
          {renderRow(row)}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.renderGrid()}
        </div>
      </div>
    );
  }
}

export default Home;
