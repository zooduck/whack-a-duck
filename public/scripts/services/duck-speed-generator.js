export function duckSpeedGenerator(data = {maxDuckSpeed: 4, minDuckSpeed: 0.5, currentStage: 0}) {
  return {
    get seconds() {
      let speedInSeconds = data.minDuckSpeed;
      if (data.maxDuckSpeed - data.currentStage >= data.minDuckSpeed) {
        speedInSeconds = data.maxDuckSpeed - data.currentStage;
      }
      return speedInSeconds;      
    }
  }
}
