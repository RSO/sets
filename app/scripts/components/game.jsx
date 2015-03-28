import React from 'react';
import Tile from '../components/tile.jsx';
import GameActions from '../actions/game_actions.js';
import GameStore from '../stores/game_store.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: []
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

  onStatusChange(state) {
    this.setState(state);
  }

  renderGrid() {
    return this.state.grid.map(function(row) {
      return (
        <div className="row">
          {row.map(function(column) {
            return (
              <Tile {...column} select={function () {}} />
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
