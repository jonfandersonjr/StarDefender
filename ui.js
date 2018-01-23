/*
Constructor
buttonCanvas - canvas that has defence structure uiButtons
textCanvas - textArea that holds this
*/
function UI(buttonCanvas, textCanvas, startHealth, maxHealth,
  startRes, startLevel, wavesCleared, enemiesK) {
  ctx = buttonCanvas;
  this.textBox = textCanvas;
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

  this.healthCur = startHealth;
  this.healthMax = maxHealth;
  this.resourcesTotal = startRes;
  this.curLevel = startLevel;
  this.wavesC = wavesCleared;
  this.enemiesKilled = enemiesK;

  this.time = "00:00";
  //Load Default Text
  this.updateText();
  console.log("Default stats text loaded!");


};

UI.prototype.updateText = function () {
          var tempString = "Health: ";
          tempString += this.healthCur + " / " + this.healthMax + "\n";
          tempString += "Resources: " + this.resourcesTotal + "\n";
          tempString += "Level: " + this.curLevel + "\n";
          tempString += "Waves Cleared: " + this.wavesC + "\n";
          tempString += "Enemies Killed: " + this.enemiesKilled + "\n";
          tempString += "Time: " + this.time + "\n";
          this.textBox.value = tempString;
}

//Takes health away from current health pool
UI.prototype.dmg = function (amount) {
  this.healthCur -= amount;
  this.updateText();
}

//Adjust resource + or -
UI.prototype.resourceAdjust = function (amount) {
  this.resourcesTotal += amount;
  this.updateText();
}

//Adjust waves Cleared
UI.prototype.wavesAdjust = function(amount) {
  this.wavesC += amount;
  this.updateText();
}

//Adjust enemies Killed
UI.prototype.enemiesKilledAdjust = function(amount) {
  this.enemiesKilled += amount;
  this.updateText();
}

//Adjust level
UI.prototype.adjustLevel = function(amount) {
  this.curLevel += amount;
  this.updateText();
}

//Reset this to init values from initial new Stat() call
UI.prototype.reset = function() {
  this.healthCur = this.inithealthCur;
  this.healthMax = this.inithealthMax;
  this.resourcesTotal = this.initresourcesTotal;
  this.curLevel = this.initcurLevel;
  this.wavesC = this.initwavesC;
  this.enemiesKilled = this.initenemiesKilled;
  this.time = this.inittime;
  this.updateText();
}

UI.prototype.updateTime = function (value) {
    var timeString = parseFloat(value).toFixed(2);
    this.time = timeString;
    this.updateText();
}
