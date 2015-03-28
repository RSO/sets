import React from 'react';
import Shape from './shape.jsx';
import GameActions from '../actions/game_actions.js';
import classNames from 'classNames';

class Tile extends React.Component {
  constructor() {
    this.renderShapes = this.renderShapes.bind(this);
  }

  renderShapes() {
    var { amount, ...shapeProps } = this.props;
    var shapes = [];

    for (var i = 0; i < amount; i++) {
      shapes.push(
        <Shape key={i} {...shapeProps} />
      );
    }

    return shapes;
  }

  handleClick(event) {
    GameActions.selectCard(this.props.id);
  }

  render() {
    var tileClasses = classNames("tile", {
      "tile--selected": this.props.selected
    });

    return (
      <div className="column">
        <div className={tileClasses} onClick={this.handleClick.bind(this)}>
          {this.renderShapes()}
        </div>
      </div>
    );
  }
};

export default Tile;
