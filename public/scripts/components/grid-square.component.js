import React from 'react';
import {GridDuck} from './grid-duck.component';

export class GridSquare extends React.Component {
  render() {
    return (
      <div className='grid__square'>
        <GridDuck
          coords={this.props.coords}
          currentDuckCoords={this.props.currentDuckCoords}
          currentDuckId={this.props.currentDuckId}
          duckWhacked={this.props.duckWhacked}
          enterTheDuck={this.props.enterTheDuck}
          closeDuckGate={this.props.closeDuckGate}
          setTimeout={this.props.setTimeout}
          duckGateOpen={this.props.duckGateOpen}
          gameInProgress={this.props.gameInProgress}
          currentStage={this.props.currentStage}
          duckSpeed={this.props.duckSpeed} />
      </div>
    )
  }
}
