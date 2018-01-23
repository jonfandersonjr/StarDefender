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
  updateText(text, stats.healthCur, stats.healthMax, stats.resourcesTotal,
             stats.curLevel, stats.wavesC, stats.enemiesKilled, stats.curMin, stats.curSec);
  console.log("Default stats text loaded!");


}

function updateText(textBox, healthCur, healthMax, resources, curLevel,
                    wavesCleared, enemiesKilled, minutes, seconds) {
          var tempString = "Health: ";
          tempString += healthCur + " / " + healthMax + "\n";
          tempString += "Resources: " + resources + "\n";
          tempString += "Level: " + curLevel + "\n";
          tempString += "Waves Cleared: " + wavesCleared + "\n";
          tempString += "Enemies Killed: " + enemiesKilled + "\n";
          tempString += "Time: " + minutes + ":" + seconds + "\n";
          textBox.value = tempString;
}
