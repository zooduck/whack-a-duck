import React from 'react';
import ReactDOM from 'react-dom';
import {GridRow} from './grid-row.component';

export class GridRows extends React.Component {
  shouldComponentUpdate(nextProps) {
    const propsToCheck = [
      'currentDuckId',
      'grid'
    ];
    for (let prop of propsToCheck) {
      if (this.props.state[prop] !== nextProps.state[prop]) {
        return true;
      }
    }
    return false;
  }
  componentDidUpdate(nextProps) {
    const grid = ReactDOM.findDOMNode(this.refs.grid);
    if (this.props.state.ducksWhacked !== nextProps.state.ducksWhacked) {
      grid.classList.remove('--shake');
      setTimeout(function () {
        grid.classList.add('--shake');
      }.bind(grid), 20);
    }
  }
  render() {
    const gridRows = [];
    for (let i = 0, l = this.props.state.grid.rows; i < l; i++) {
      const gridRowComponent = <GridRow
                                  key={i}
                                  row={i}
                                  grid={this.props.state.grid}
                                  currentStage={this.props.state.currentStage}
                                  currentDuckCoords={this.props.state.currentDuckCoords}
                                  currentDuckId={this.props.state.currentDuckId}
                                  duckGateOpen={this.props.state.duckGateOpen}
                                  gameInProgress={this.props.state.gameInProgress}
                                  duckSpeed={this.props.state.currentDuckSpeed}
                                  duckWhacked={this.props.fn.duckWhacked}
                                  enterTheDuck={this.props.fn.enterTheDuck}
                                  closeDuckGate={this.props.fn.closeDuckGate}
                                  setTimeout={this.props.fn.setTimeout} />
      gridRows.push(gridRowComponent);
    }
    return (
      <div ref='grid' className='grid'>
        {gridRows}
      </div>
    )
  }
}
