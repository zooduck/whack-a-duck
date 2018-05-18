import React from 'react';
import ReactDOM from 'react-dom';

export class ScoreData extends React.Component {
  shouldComponentUpdate(nextProps) {
    const propsToCheck = [
      'currentScore',
      'currentStage',
      'secondsLeft',
      'ducksWhacked'
    ];
    for (let prop of propsToCheck) {
      if (nextProps.state[prop] !== this.props.state[prop]) {
        return true;
      }
    }
    return false;
  }
  componentDidUpdate(nextProps) {
    const levelChanged = () => {
      return this.props.state.currentStage !== nextProps.state.currentStage;
    }
    if (levelChanged() && nextProps.state.gameOver !== true) {
      const level = ReactDOM.findDOMNode(this.refs.level);
      level.classList.remove('--flash');
      setTimeout(function() {
        level.classList.add('--flash');
      }.bind(level), 20);
    }
  }
  render() {
    return (
      <div ref='headerScoreData' className='header__score-data'>
        <div className='header__score-data__item current-score'>
          <span>SCORE: {this.props.state.currentScore}</span>
        </div>
        <div ref='level' className='header__score-data__item level'>
          <span>LEVEL: {this.props.state.currentStage + 1}</span>
        </div>
        <div className='header__score-data__item time-left'>
          <span>TIME LEFT: {this.props.state.secondsLeft}</span>
        </div>
      </div>
    )
  }
}
