function Stats(startHealth, maxHealth, startRes, startLevel, wavesCleared, enemiesK, minutes, seconds) {
  this.healthCur = startHealth;
  this.healthMax = maxHealth;
  this.resourcesTotal = startRes;
  this.curLevel = startLevel;
  this.wavesC = wavesCleared;
  this.enemiesKilled = enemiesK;
  this.curMin = minutes;
  this.curSec = seconds;
}
