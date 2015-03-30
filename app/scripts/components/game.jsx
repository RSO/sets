import React from 'react';
import Reflux from 'reflux';
import Tile from '../components/tile.jsx';
import GameActions from '../actions/game_actions.js';
import GameStore from '../stores/game_store.js';
import Sidebar from './sidebar.jsx';
import _ from 'lodash';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sets: [],
      deck: [],
      grid: [],
      selection: []
    };

    this.renderGrid = this.renderGrid.bind(this);
  }

  componentWillMount() {
    GameActions.clearGrid();
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
    return this.state.grid.map(function(row, row_index) {
      return row.map(function(column, column_index) {
        return (
          <Tile {...column} key={column.id} x={column_index} y={row_index} />
        );
      });
    });
  }

  render() {
    return (
      <div className="game">
        <div className="filler--left" />
        <div className="board">
          {this.renderGrid()}
        </div>
        <Sidebar deck={this.state.deck} sets={this.state.sets} />
        <div className="filler--right" />
      </div>
    );
  }
}

export default Game;
