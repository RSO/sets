import React from 'react';
import GameActions from '../actions/game_actions.js';
import Game from '../components/game.jsx';

class Home extends React.Component {
  handleResetClick(event) {
    event.preventDefault();

    GameActions.resetGame();
  }

  render() {
    return(
      <div>
        <div className="header">
          <h1 className="heading">ThreeCards</h1>
          <a href="#" onClick={this.handleResetClick} className="button">
            New game
          </a>
        </div>
        <Game />
      </div>
    );
  }
}

export default Home;
