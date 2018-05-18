import React from 'react';
import ReactDOM from 'react-dom';

export class Controls extends React.Component {
  render() {
    const startGame = () => {
      this.props.fn.startGame();
    };
    const setRows = () => {
      const rows__NUMBER = ReactDOM.findDOMNode(this.refs.setRowsCtrl).value || this.props.state.grid.rows;
      this.props.fn.setRows(rows__NUMBER);
    };
    const setColumns = () => {
      const columns__NUMBER = ReactDOM.findDOMNode(this.refs.setColumnsCtrl).value || this.props.state.grid.columns;
      this.props.fn.setColumns(columns__NUMBER);
    };
    const setSecondsPerStage = () => {
      const secondsPerStage__NUMBER = ReactDOM.findDOMNode(this.refs.setSecondsPerStage).value || this.props.state.stages.secondsPerStage;
      this.props.fn.setSecondsPerStage(secondsPerStage__NUMBER);
    };
    return (
      <div className='header__controls'>
        <div className='header__controls__startCtrl'>
          <button type='button' onClick={startGame}>START</button>
        </div>
        <div className='header__controls__ctrls'>
          <div className='header__controls__item'>
            <label>ROWS</label>
            <input type='number' ref='setRowsCtrl' onChange={setRows} value={this.props.state.grid.rows} />
          </div>
          <div className='header__controls__item'>
            <label>COLUMNS</label>
            <input type='number' ref='setColumnsCtrl' onChange={setColumns} value={this.props.state.grid.columns} />
          </div>
          <div className='header__controls__item'>
            <label>LEVEL SECONDS</label>
            <input type='number' ref='setSecondsPerStage' onChange={setSecondsPerStage} value={this.props.state.stages.secondsPerStage} />
          </div>
        </div>
      </div>
    )
  }
}
