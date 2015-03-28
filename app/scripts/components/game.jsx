import React from 'react';
import Reflux from 'reflux';
import Tile from '../components/tile.jsx';
import GameActions from '../actions/game_actions.js';
import GameStore from '../stores/game_store.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      selection: []
    };

    this.renderGrid = this.renderGrid.bind(this);
  }

  componentWillMount() {
    GameActions.shuffleDeck();
  }

  componentDidMount() {
    this.unsubscribe = GameStore.listen(this.onStatusChange.bind(this));

    GameActions.fillGrid();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  renderGrid() {
    var selection = this.state.selection;
    var isSelected = function(column) {
      var selected = false;

      selection.forEach(function(selectedCard) {
        if (selectedCard.color === column.color &&
            selectedCard.amount === column.amount &&
            selectedCard.fill === column.fill &&
            selectedCard.shape === column.shape) {
          selected = true;
        }
      });

      return selected;
    };

    return this.state.grid.map(function(row) {
      return (
        <div className="row">
          {row.map(function(column) {
            return (
              <Tile {...column} selected={isSelected(column)} />
            );
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderGrid()}
      </div>
    );
  }
}

export default Game;
