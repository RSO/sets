import React from 'react';
import GameActions from '../actions/game_actions.js';

class Sidebar extends React.Component {
  handleResetClick(event) {
    event.preventDefault();

    GameActions.resetGame();
  }

  render() {
    return (
      <div className="game-sidebar">
        <a onClick={this.handleResetClick} href="#">Reset</a>
      </div>
    );
  }
}

export default Sidebar;
