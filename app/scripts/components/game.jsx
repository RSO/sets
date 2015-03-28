import React from 'react';
import Reflux from 'reflux';
import Tile from '../components/tile.jsx';
import GameActions from '../actions/game_actions.js';
import GameStore from '../stores/game_store.js';
import _ from 'lodash';

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

    return this.state.grid.map(function(row, index) {
      return (
        <div className="row" key={index}>
          {row.map(function(column) {
            return (
              <Tile {...column} key={column.id} selected={_(selection).contains(column.id)} />
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
