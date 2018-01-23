/*TODO
-Get all stats working
  Health
  Resources
  Level
  Waves Cleared
  Enemies Killed
  Time
-Get images done for defense structures - waiting on finished sprites
*/

/*
Constructor
buttonCanvas - canvas that has defence structure uiButtons
textCanvas - textArea that holds stats
engine - Game engine passed by main.js
*/
function UI(buttonCanvas, textCanvas, engine, statTracker) {
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
          tempString += "Time: " + stats.curMin + ":" + stats.curSec + "\n";
          textBox.value = tempString;
}
