import React from 'react';
import {GridSquare} from './grid-square.component';

export class GridRow extends React.Component {
  render(){
    const gridSquares = [];
    for (let i = 0, l = this.props.grid.columns; i < l; i++) {
      const coords = {
        x: i,
        y: this.props.row
      }
      gridSquares.push(<GridSquare
        key={i}
        coords={coords}
        currentDuckCoords={this.props.currentDuckCoords}
        currentDuckId={this.props.currentDuckId}
        duckWhacked={this.props.duckWhacked}
        enterTheDuck={this.props.enterTheDuck}
        closeDuckGate={this.props.closeDuckGate}
        setTimeout={this.props.setTimeout}
        duckGateOpen={this.props.duckGateOpen}
        gameInProgress={this.props.gameInProgress}
        currentStage={this.props.currentStage}
        duckSpeed={this.props.duckSpeed} />);
    }
    return (
      <div className='grid__row'>
        {gridSquares}
      </div>
    )
  }
}
