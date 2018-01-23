/*
Constructor
buttonCanvas - canvas that has defence structure uiButtons
textCanvas - textArea that holds stats
engine - Game engine passed by main.js
*/
function UI(buttonCanvas, textCanvas, startHealth, maxHealth,
  startRes, startLevel, wavesCleared, enemiesK) {
  var ctx = buttonCanvas;
  var text = textCanvas;
  var stats = statTracker;

  //Load UI Image on image canvas
  var imageObj = new Image();
  imageObj.src = './img/ui/defenseUIButtons.png';
	imageObj.onload = function () {
		ctx.drawImage(imageObj, 0, 0);
	};
  console.log("UI Image Loaded!");

  //init values
  this.inithealthCur = startHealth;
  this.inithealthMax = maxHealth;
  this.initresourcesTotal = startRes;
  this.initcurLevel = startLevel;
  this.initwavesC = wavesCleared;
  this.initenemiesKilled = enemiesK;
  this.inittime = time;

  this.healthCur = startHealth;
  this.healthMax = maxHealth;
  this.resourcesTotal = startRes;
  this.curLevel = startLevel;
  this.wavesC = wavesCleared;
  this.enemiesKilled = enemiesK;
  this.time = time;
  //Load Default Text
  this.updateText(text, stats);
  console.log("Default stats text loaded!");


}

UI.prototype.updateText = function (textBox, stats) {
          var tempString = "Health: ";
          tempString += stats.healthCur + " / " + stats.healthMax + "\n";
          tempString += "Resources: " + stats.resourcesTotal + "\n";
          tempString += "Level: " + stats.curLevel + "\n";
          tempString += "Waves Cleared: " + stats.wavesC + "\n";
          tempString += "Enemies Killed: " + stats.enemiesKilled + "\n";
          tempString += "Time: " + stats.time + "\n";
          textBox.value = tempString;
}

//Takes health away from current health pool
UI.prototype.dmg = function (amount) {
  this.healthCur -= amount;
}

//Adjust resource + or -
UI.prototype.resourceAdjust = function (amount) {
  this.resourcesTotal += amount;
}

//Adjust waves Cleared
UI.prototype.wavesAdjust = function(amount) {
  this.wavesC += amount;
}

//Adjust enemies Killed
UI.prototype.enemiesKilledAdjust = function(amount) {
  this.enemiesKilled += amount;
}

//Adjust level
UI.prototype.adjustLevel = function(amount) {
  this.curLevel += amount;
}

//Reset STATS to init values from initial new Stat() call
UI.prototype.reset = function() {
  this.healthCur = this.inithealthCur;
  this.healthMax = this.inithealthMax;
  this.resourcesTotal = this.initresourcesTotal;
  this.curLevel = this.initcurLevel;
  this.wavesC = this.initwavesC;
  this.enemiesKilled = this.initenemiesKilled;
  this.time = this.inittime;
}

UI.prototype.updateTime = function(value) {
    this.time = value;
