import React from 'react';
import GameActions from '../actions/game_actions.js';
import Tile from './tile.jsx';

class Sidebar extends React.Component {
  handleResetClick(event) {
    event.preventDefault();

    GameActions.resetGame();
  }

  renderSets() {
    return this.props.sets.map(function(set) {
      return (
        <div className="row">
          {set.map(function(card) {
            return <Tile {...card} key={card.id} />;
          })}
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.handleResetClick} href="#">New game</a>

        <div>
          Cards left in deck: {this.props.deck.length}
        </div>

        <div>
          Sets found: <br />
          {this.renderSets()}
        </div>
      </div>
    );
  }
}

export default Sidebar;
