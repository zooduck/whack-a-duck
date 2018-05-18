import React from 'react';
import ReactDOM from 'react-dom';

export class GridDuck extends React.Component {
  shouldComponentUpdate(nextProps) {
    const shouldUpdate = nextProps.duckGateOpen || (nextProps.gameInProgress != this.props.gameInProgress);
    return shouldUpdate;
  }
  componentDidUpdate() {
    this.props.closeDuckGate();
    const duck = ReactDOM.findDOMNode(this.refs.duck);
    duck.classList.remove('--active');
    const isCurrentDuck = (coords, currentDuckCoords) => {
      return coords.x == currentDuckCoords.x && coords.y == currentDuckCoords.y;
    }
    if (isCurrentDuck(this.props.coords, this.props.currentDuckCoords)) {
      duck.style.animationDuration = `${this.props.duckSpeed}s`;
      this.props.setTimeout(function () {
        duck.classList.add('--active');
      }.bind(duck), 20);
      const delay = this.props.duckSpeed * 1000;
      this.props.setTimeout(function() {
        this.props.enterTheDuck(duck);
      }.bind(this), delay);
    }
  }
  render() {
    const duckWhack__EVENT = function() {
      const duck = ReactDOM.findDOMNode(this.refs.duck);
      this.props.duckWhacked(duck);
    }.bind(this);
    let className = 'grid__duck';
    return (
      <div ref='duck' className={className} onClick={duckWhack__EVENT}>
        <span>{this.props.duckSpeed}s</span>
      </div>
    )
  }
}
