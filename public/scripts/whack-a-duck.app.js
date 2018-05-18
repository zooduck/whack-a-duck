// THIRD-PARTY
import React from 'react';
import ReactDOM from 'react-dom';
import {DateTime, Interval} from 'luxon';
// COMPONENTS
import {Controls} from './components/controls.component';
import {ScoreData} from './components/score-data.component';
import {FinalScoreBanner} from './components/final-score-banner.component';
import {GridRows} from './components/grid-rows.component';
// SERVICES
import {randomDuckGenerator} from './services/random-duck-generator';
import {whackPointsGenerator} from './services/whack-points-generator';
import {duckSpeedGenerator} from './services/duck-speed-generator';

class WhackADuck extends React.Component {
  constructor(props) {
    super(props);
    this.timeoutStore = [];
    this.countdownInterval = null;
    this.defaults = {
      grid: {
        rows: 4,
        columns: 4
      },
      stages: {
        length: 6,
        secondsPerStage: 10
      },
      currentStage: 0,
      currentDuckCoords: {
        x: -1,
        y: -1
      },
      currentDuckId: '0:0',
      maxDuckSpeed: 4,
      minDuckSpeed: 0.5,
      gameInProgress: false,
      gameOver: false,
      duckGateOpen: false,
      currentScore: 0,
      finalScore: 0,
      secondsLeft: 0,
      gameStartedAt: DateTime.local()
    }
    this.state = {
      currentDuckCoords: this.defaults.currentDuckCoords,
      currentDuckId: this.defaults.currentDuckId,
      currentStage: this.defaults.currentStage,
      maxDuckSpeed: this.defaults.maxDuckSpeed,
      minDuckSpeed: this.defaults.minDuckSpeed,
      currentDuckSpeed: this.defaults.maxDuckSpeed,
      gameInProgress: this.defaults.gameInProgress,
      gameOver: this.defaults.gameOver,
      duckGateOpen: this.defaults.duckGateOpen,
      whacks: new Array(this.defaults.stages.length).fill(0),
      ducksWhacked: 0,
      gameDuration: 0,
      grid: this.defaults.grid,
      stages: this.defaults.stages,
      currentScore: this.defaults.currentScore,
      finalScore: this.defaults.finalScore,
      gameStartedAt: this.defaults.gameStartedAt,
      secondsLeft: this.defaults.secondsLeft
    }
    this.setRows = this.setRows.bind(this);
    this.setColumns = this.setColumns.bind(this);
    this.setSecondsPerStage = this.setSecondsPerStage.bind(this);
    this.startGame = this.startGame.bind(this);
    this.enterTheDuck = this.enterTheDuck.bind(this);
    this.duckWhacked = this.duckWhacked.bind(this);
    this.closeDuckGate = this.closeDuckGate.bind(this);
    this.setTimeout = this.setTimeout.bind(this);
  }
  secondsLeft() {
    const secondsPassed = Interval.fromDateTimes(this.state.gameStartedAt, DateTime.local()).length('seconds');
    const gameLengthInSeconds = this.state.stages.secondsPerStage * this.state.stages.length;
    const secondsLeft = Math.ceil(gameLengthInSeconds - secondsPassed);
    return secondsLeft;
  }
  startCountdown() {
    this.setState({
      secondsLeft: this.secondsLeft()
    });
    this.countdownInterval = setInterval(function() {
      this.setState({
        secondsLeft: this.secondsLeft()
      }, this.enterTheDuck);
    }.bind(this), 1000);
  }
  endCountdown() {
    clearInterval(this.countdownInterval);
  }
  ctrlSettingsAllowed() {
    return !this.state.gameInProgress
  }
  setRows(rows__NUMBER) {
    rows__NUMBER = parseInt(rows__NUMBER);
    if (this.ctrlSettingsAllowed()) {
      this.setState({
        grid: {
          rows: rows__NUMBER == 0? 1: rows__NUMBER <= 10? rows__NUMBER : this.defaults.grid.rows,
          columns: this.state.grid.columns
        }
      });
    }
  }
  setColumns(columns__NUMBER) {
    columns__NUMBER = parseInt(columns__NUMBER);
    if (this.ctrlSettingsAllowed()) {
      this.setState({
        grid: {
          rows: this.state.grid.rows,
          columns: columns__NUMBER == 0? 1 : columns__NUMBER <= 10? columns__NUMBER : this.defaults.grid.columns
        }
      });
    }
  }
  setSecondsPerStage(seconds__NUMBER) {
    seconds__NUMBER = parseInt(seconds__NUMBER);
    if (this.ctrlSettingsAllowed()) {
      this.setState({
        stages: {
          secondsPerStage: seconds__NUMBER == 0? 1: seconds__NUMBER,
          length: this.state.stages.length
        }
      });
    }
  }
  updateTimeoutStore(timeout) {
    this.timeoutStore.push(timeout);
  }
  emptyTimeoutStore() {
    for(let timeout of this.timeoutStore) {
      console.log(`%cclearTimeout(${timeout})`, 'color: lightslategray');
      clearTimeout(timeout);
    }
    this.timeoutStore = [];
  }
  setTimeout(callback, delay) {
    const t = setTimeout(callback, delay);
    this.updateTimeoutStore(t);
  }
  duckIdGenerator(currentDuckCoords) {
    const prefix = '_' + Math.random().toString().slice(2);
    return (prefix + Object.keys(currentDuckCoords).map( (key) => currentDuckCoords[key]).join(':'));
  }
  closeDuckGate() {
    this.setState({
      duckGateOpen: false
    });
  }
  setCurrentDuck() {
    const randomDuck = randomDuckGenerator(this.state.grid);
    return {
      coords: randomDuck.coords,
      id: randomDuck.id
    }
  }
  enterTheDuck() {
    if (this.state.gameInProgress) {
      const isoTimeLessOffset = DateTime.local().toISOTime({includeOffset: false});
      console.warn(`enterTheDuck() @ ${isoTimeLessOffset}`);
      // this.emptyTimeoutStore();
      this.setState({
        currentDuckCoords: this.setCurrentDuck().coords,
        currentDuckId: this.setCurrentDuck().id,
        currentDuckSpeed: duckSpeedGenerator(this.state).seconds,
        duckGateOpen: true
      });
    }
  }
  duckWhacked(duck__EL) {
    duck__EL.classList.remove('--active', '--active-STATIC');
    const updatedWhacks = Array.from(this.state.whacks);
    updatedWhacks[this.state.currentStage] += 1;
    this.setState({
      whacks: updatedWhacks,
      ducksWhacked: this.state.ducksWhacked + 1
    });
  }
  endGame(stagesInterval) {
    clearInterval(stagesInterval);
    this.endCountdown();
    this.emptyTimeoutStore();
    const finalScore = whackPointsGenerator(this.state.whacks).score;
    this.setState({
      currentScore: finalScore,
      finalScore: finalScore,
      gameOver: true
    });
    console.log('%cGAME OVER!', 'color: magenta');
    console.log(`%cYOU SCORED ${this.state.finalScore} POINTS`, 'color: magenta');
    console.log(`%cYOU WHACKED ${this.state.ducksWhacked} DUCKS`, 'color: magenta');
  }
  buildGameReport() {
    return {
      whacks: this.state.whacks,
      ducksWhacked: this.state.ducksWhacked,
      finalScore: this.state.finalScore,
      pointsData: whackPointsGenerator(this.state.whacks),
      gameDuration: this.state.gameDuration,
      levels: this.state.stages.length,
      gridSize: this.state.grid.rows * this.state.grid.columns
    }
  }
  resetGame() {
    console.log(`%cEND OF GAME REPORT:`, 'color: magenta', this.buildGameReport());
    this.setState({
      report: this.buildGameReport(),
      gameInProgress: false,
      whacks: new Array(this.state.stages.length).fill(0),
      currentDuckCoords: {
        x: -1,
        y: -1
      }
    }, this.emptyTimeoutStore);
  }
  startGame() {
    if (!this.state.gameInProgress) {
      this.setState({
        gameInProgress: true,
        gameOver: false,
        currentScore: 0,
        currentStage: 0,
        ducksWhacked: 0,
        gameStartedAt: DateTime.local(),
        gameDuration: (this.state.stages.length * this.state.stages.secondsPerStage),
        currentDuckSpeed: duckSpeedGenerator(this.state).seconds,
      }, this.runStages);
    }
  }
  runStages() {
    const delay = (this.state.stages.secondsPerStage * 1000);
    this.stageStarted();
    this.startCountdown();
    const stagesInterval = setInterval(function() {
      if (this.state.currentStage === (this.state.stages.length - 1)) {
        this.endGame(stagesInterval);
        this.resetGame();
      } else {
        this.emptyTimeoutStore();
        const nextStage = this.state.currentStage + 1;
        this.setState({
          currentStage: nextStage,
          currentScore: whackPointsGenerator(this.state.whacks).score
        }, this.stageStarted);
      }
    }.bind(this), delay);
  }
  stageStarted() {
    //this.enterTheDuck();
    console.log(`%cLEVEL ${this.state.currentStage} STARTED`, 'color: magenta');
  }
  render() {
    const fn = {
      startGame: this.startGame,
      setRows: this.setRows,
      setColumns: this.setColumns,
      setSecondsPerStage: this.setSecondsPerStage,
      duckWhacked: this.duckWhacked,
      enterTheDuck: this.enterTheDuck,
      updateTimeoutStore: this.updateTimeoutStore,
      closeDuckGate: this.closeDuckGate,
      setTimeout: this.setTimeout
    }
    return (
      <div id='whack-a-duck'>
        <div className='header'>
          <ScoreData state={this.state} />
          <Controls state={this.state} fn={fn} />
        </div>
        <GridRows state={this.state} fn={fn} />
        <FinalScoreBanner state={this.state} />
      </div>
    )
  }
}

ReactDOM.render(<WhackADuck />, document.querySelector('#root'));
