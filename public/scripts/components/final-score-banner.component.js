import React from 'react';
import ReactDOM from 'react-dom';

export class FinalScoreBanner extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.state.gameOver !== this.props.state.gameOver && nextProps.state.gameOver === true;
  }
  componentDidUpdate() {
    const finalScoreBanner = ReactDOM.findDOMNode(this.refs.finalScoreBanner);
    const animationDuration = 5000;
    const animationDelay = 1000;
    const delay = animationDuration + animationDelay;
    const hideFinalScoreBanner = function () {
      finalScoreBanner.classList.remove('--active', 'print-chars');
    }
    const showFinalScoreBanner = function () {
      finalScoreBanner.classList.add('--active', 'print-chars');
      setTimeout(function() {
        hideFinalScoreBanner();
      }, delay);
    }
    showFinalScoreBanner();
  }
  render() {
    return (
      <div ref='finalScoreBanner' className='final-score-banner'>
        <div className='final-score-banner__chars'>
          <span className='char'>F</span>
          <span className='char'>I</span>
          <span className='char'>N</span>
          <span className='char'>A</span>
          <span className='char'>L</span>
          <span className='char'>&nbsp;</span>
          <span className='char'>S</span>
          <span className='char'>C</span>
          <span className='char'>O</span>
          <span className='char'>R</span>
          <span className='char'>E</span>
          <span className='char'>:</span>
          <span className='char'>&nbsp;</span>
          <span className='char'>{this.props.state.finalScore}</span>
        </div>
      </div>
    )
  }
}
