import React from 'react';

var DIAMOND = <path d="M0,150 L75,2 L150,150 L75,300 L0,150 Z" />;
var OVAL = <rect height="100%" width="100%" ry="25%" />;
var SQUIGGLE = <path d="M127.922578,70.3541023 C140.045309,110.170669 119.649633,148.271004 110.885227,186.028093 C110.475675,217.60675 154.402554,250.558397 143.157902,271.668036 C111.130958,320.409006 31.8417453,301.616273 11.6098905,250.558391 C-1.33194373,206.537058 20.4562076,164.746825 32.2512971,123.643085 C42.8177314,85.2853148 -12.3931166,46.4805491 2.59975275,20.4117709 C41.3433452,-27.1278367 118.91244,16.2070041 127.922578,70.3541023 Z" />;

class Shape extends React.Component {
  constructor() {
    this.renderShape = this.renderShape.bind(this);
  }

  renderShape() {
    switch(this.props.shape) {
      case 'diamond':
        return DIAMOND;
        break;
      case 'oval':
        return OVAL;
        break;
      case 'squiggle':
        return SQUIGGLE;
        break;
    };
  }

  getFillStringFor(fill, color) {
    switch(fill) {
      case 'lined':
        return "url(#lined)";
      case 'filled':
        return color;
      default:
        return 'transparent';
    };
  }

  render() {
    var fill = this.getFillStringFor(this.props.fill, this.props.color);

    return (
      <div className="shape">
        <svg width="100%" height="100%" viewBox="0 0 150 300">
          <defs>
            <pattern id="lined" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
              <line x1="0" y1="6" stroke={this.props.color} stroke-width="6" />
            </pattern>
          </defs>

          <g stroke={this.props.color} fill={fill} stroke-width="6">
            {this.renderShape()}
          </g>
        </svg>
      </div>
    );
  }
};

export default Shape;
