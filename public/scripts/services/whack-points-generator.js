export function whackPointsGenerator(whacks = []) {
  const pointsPerWhacks = {
    1: 1,
    2: 4,
    3: 16,
    4: 256
  };
  const pointsData = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    score: 0,
    pointsPerWhacks: pointsPerWhacks
  };
  for (let whackCount of whacks) {
    if (typeof whackCount === 'number') {
      if (whackCount > 4) {
        const modulusRemainder = whackCount % 4;
        const fours = (whackCount - modulusRemainder) / 4;
        pointsData[4] += fours;
        if (modulusRemainder > 0) pointsData[modulusRemainder] += 1;
        // pointsData.score += (fours * pointsPerWhacks[4]) + (pointsPerWhacks[modulusRemainder] || 0);
      } else if (whackCount > 0) {
        pointsData[whackCount] += 1;
        // pointsData.score += pointsPerWhacks[whackCount];
      }
    }
  }
  for (let key in pointsData) {
    if (isNaN(key) === false) {
      pointsData.score += pointsData[key] * pointsPerWhacks[key];
    }
  }
  return pointsData;
};
