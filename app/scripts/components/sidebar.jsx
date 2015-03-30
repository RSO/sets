import React from 'react';
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
        <div className="cards-count">
          {this.props.deck.length} cards left in deck
        </div>

        <div className="sets-found">
          Sets found: <br />
          {this.renderSets()}
        </div>
      </div>
    );
  }
}

export default Sidebar;
