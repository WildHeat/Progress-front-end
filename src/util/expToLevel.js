function expForLevel(level, base, growthRate) {
  return level !== 0 ? base * Math.pow(growthRate, level - 1) : 0;
}

function currentLevel(currentExp, base, growthRate) {
  return currentExp >= 100
    ? Math.log(currentExp / base) / Math.log(growthRate) + 1
    : 0;
}

function getCurrentBar(level, base, growthRate, exp) {
  var currentLevelExp = expForLevel(level, base, growthRate);
  var nextLevelExp = expForLevel(level + 1, base, growthRate);
  var max = nextLevelExp - currentLevelExp;
  var currentBar = exp - currentLevelExp;
  return [currentBar, max];
}

export { expForLevel, currentLevel, getCurrentBar };
