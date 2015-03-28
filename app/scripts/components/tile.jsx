import React from 'react';
import Shape from './shape.jsx';

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

  render() {
    return (
      <div className="tile" onClick={this.props.select()}>
        {this.renderShapes()}
      </div>
    );
  }
};

export default Tile;
