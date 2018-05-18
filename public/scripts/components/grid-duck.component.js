import React from 'react';
import ReactDOM from 'react-dom';

export class GridDuck extends React.Component {
  shouldComponentUpdate(nextProps) {
    const shouldUpdate = nextProps.duckGateOpen || (nextProps.gameInProgress != this.props.gameInProgress);
    return shouldUpdate;
  }
  componentDidUpdate(nextProps) {
    this.props.closeDuckGate();
    const showDuck = (duck__EL) => {
      hideDuck(duck__EL);
      let activeClassName = '--active';
      if (this.props.duckSpeed < 1) {
        activeClassName = '--active-STATIC';
      }
      duck.style.animationDuration = `${this.props.duckSpeed}s`;
      setTimeout(function () {
        duck__EL.classList.add('--active');
      }.bind(duck__EL), 50);
    };
    const hideDuck = (duck__EL) => {
      duck__EL.classList.remove('--active', '--active-STATIC');
    };
    const isCurrentDuck = (coords, currentDuckCoords) => {
      return coords.x == currentDuckCoords.x && coords.y == currentDuckCoords.y;
    }
    const duck = ReactDOM.findDOMNode(this.refs.duck);
    const stageChanged = nextProps.currentStage != this.props.currentStage;
    if (stageChanged) {
      hideDuck(duck);
    }
    if (isCurrentDuck(this.props.coords, this.props.currentDuckCoords)) {
      showDuck(duck);
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
