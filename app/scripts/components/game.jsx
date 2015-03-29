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
      return (
        <div className="row" key={row_index}>
          {row.map(function(column, column_index) {
            return (
              <Tile {...column} key={column.id} x={column_index} y={row_index} />
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
        <Sidebar />
      </div>
    );
  }
}

export default Game;
