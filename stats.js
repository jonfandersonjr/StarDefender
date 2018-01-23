function Stats(startHealth, maxHealth, startRes, startLevel, wavesCleared, enemiesK, minutes, seconds) {
  this.inithealthCur = startHealth;
  this.inithealthMax = maxHealth;
  this.initresourcesTotal = startRes;
  this.initcurLevel = startLevel;
  this.initwavesC = wavesCleared;
  this.initenemiesKilled = enemiesK;
  this.initcurMin = minutes;
  this.initcurSec = seconds;


  this.healthCur = startHealth;
  this.healthMax = maxHealth;
  this.resourcesTotal = startRes;
  this.curLevel = startLevel;
  this.wavesC = wavesCleared;
  this.enemiesKilled = enemiesK;
  this.curMin = minutes;
  this.curSec = seconds;
}

//Takes health away from current health pool
Stats.prototype.dmg = function (amount) {
  this.healthCur -= amount;
}

//Adjust resource + or -
Stats.prototype.resourceAdjust = function (amount) {
  this.resourcesTotal += amount;
}

//Adjust waves Cleared
Stats.prototype.wavesAdjust = function(amount) {
  this.wavesC += amount;
}

//Adjust enemies Killed
Stats.prototype.enemiesKilledAdjust = function(amount) {
  this.enemiesKilled += amount;
}

//Adjust level
Stats.prototype.adjustLevel = function(amount) {
  this.curLevel += amount;
}

//Reset STATS
Stats.prototype.reset = function() {
  this.healthCur = this.inithealthCur;
  this.healthMax = this.inithealthMax;
  this.resourcesTotal = this.initresourcesTotal;
  this.curLevel = this.initcurLevel;
  this.wavesC = this.initwavesC;
  this.enemiesKilled = this.initenemiesKilled;
  this.curMin = this.initcurMin;
  this.curSec = this.initcurSec;
}
