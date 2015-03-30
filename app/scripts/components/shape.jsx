import React from 'react';

class Shape extends React.Component {
  getFillString() {
    switch(this.props.fill) {
      case 'lined':
        return 'url(#' + this.props.id + ')';
      case 'filled':
        return this.props.color;
      default:
        return 'transparent';
    };
  }

  renderShape() {
    switch(this.props.shape) {
      case 'diamond':
        return <polygon points="150,0 2,75 150,150 300,75 150,0" />;
        break;
      case 'oval':
        return <rect height="100%" width="100%" ry="25%" />;
        break;
      case 'squiggle':
        return (
          <g transform="translate(151, 73.5) rotate(-90) translate(-151, -73) translate(78, -77)">
            <path d="M128.922578,70.3541023 C141.045309,110.170669 120.649633,148.271004 111.885227,186.028093 C111.475675,217.60675 155.402554,250.558397 144.157902,271.668036 C112.130958,320.409006 32.8417453,301.616273 12.6098905,250.558391 C-0.33194373,206.537058 21.4562076,164.746825 33.2512971,123.643085 C43.8177314,85.2853148 -11.3931166,46.4805491 3.59975275,20.4117709 C42.3433452,-27.1278367 119.91244,16.2070041 128.922578,70.3541023 L128.922578,70.3541023 Z" />
          </g>
        )
        break;
    };
  }

  renderPattern() {
    if (this.props.fill !== 'lined')
      return;

    return (
      <defs>
        <pattern id={this.props.id} width="10" height="10" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="10" y2="0" stroke={this.props.color} strokeWidth="6" />
        </pattern>
      </defs>
    );
  }

  render() {
    var fill = this.getFillString.call(this);

    return (
      <svg viewBox="0 0 300 150" className="shape">
        {this.renderPattern.call(this)}

        <g stroke={this.props.color} fill={fill} strokeWidth="6">
          {this.renderShape.call(this)}
        </g>
      </svg>
    );
  }
};

export default Shape;
