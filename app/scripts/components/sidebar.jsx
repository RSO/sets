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
        <div className="set">
          {set.map(function(card) {
            return (
              <div className="set-card">
                <Tile {...card} key={card.id} />
              </div>
            );
          })}
        </div>
      )
    });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-filler--top" />
        <div className="sidebar-inner">
          <a onClick={this.handleResetClick} href="#">New game</a>

          <div>
            Cards left in deck: {this.props.deck.length}
          </div>

          <div>
            Sets found: <br />
            {this.renderSets()}
          </div>
        </div>
        <div className="sidebar-filler--bottom" />
      </div>
    );
  }
}

export default Sidebar;
