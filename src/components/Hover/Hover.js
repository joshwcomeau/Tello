import React, { PureComponent } from 'react';

class Hover extends PureComponent {
  state = {
    isHovering: false,
  };

  updateHover = val => () => {
    this.setState({ isHovering: val });
  };

  render() {
    return (
      <div
        onMouseEnter={this.updateHover(true)}
        onMouseLeave={this.updateHover(false)}
      >
        {this.props.children(this.state.isHovering)}
      </div>
    );
  }
}

export default Hover;
