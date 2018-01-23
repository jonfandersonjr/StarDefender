/*TODO
-Get all stats working
  Health
  Resources
  Level
  Waves Cleared
  Enemies Killed
  Time
-Get images done for defense structures
-Work on mouse interaction
*/

/*
Constructor
buttonCanvas - canvas that has defence structure uiButtons
textCanvas - textArea that holds stats
engine - Game engine passed by main.js
*/
function UI(buttonCanvas, textCanvas, engine) {
  var ctx = buttonCanvas;
  var text = textCanvas;

  //Load UI Image on image canvas
  var imageObj = new Image();
  imageObj.src = './ui/ui.png';
	imageObj.onload = function () {
		ctx.drawImage(imageObj, 0, 0);
	};
  console.log("UI Image Loaded!");

  //Load Default Text
  updateText(text, "100", "100", "0", "1", "0", "0", "00:00");
}

function updateText(textBox, healthCur, healthMax, resources, curLevel,
                    wavesCleared, enemiesKilled, time) {
          var tempString = "Health: ";
          tempString += healthCur + " / " + healthMax + "\n";
          tempString += "Resources: " + resources + "\n";
          tempString += "Level: " + curLevel + "\n";
          tempString += "Waves Cleared: " + wavesCleared + "\n";
          tempString += "Enemies Killed: " + enemiesKilled + "\n";
          tempString += "Time: " + time + "\n";
          textBox.value = tempString;
}
