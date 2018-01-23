var AM = new AssetManager();
  
var directions = ["east", "west", "north", "south", "ne", "nw", "se", "sw"];

//load defender sprites
var defenderList = ["marine"];
for (let i = 0; i < defenderList.length; i++) {
    AM.queueDownload(`./img/${defenderList[i]}/${defenderList[i]}.png`);
    AM.queueDownload(`./img/${defenderList[i]}/projectile.png`);
}

//load enemy sprites
var unitList = ["martarlisk", "stroach", "sergling"];
for (let i = 0; i < unitList.length; i++) {
	for (let j = 0; j < directions.length; j++) {
        AM.queueDownload(`./img/${unitList[i]}/${unitList[i]}_${directions[j]}.png`);
	}
}

//load tiles
AM.queueDownload("./tiles/dirt.png");
AM.queueDownload("./tiles/grass.png");
AM.queueDownload("./tiles/base.png")

AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var map = new Map(map_1);
    var myMouse = new Mouse(map.mapSize)
	var gameEngine = new GameEngine(myMouse);


    //This generator will allow us to easily create enemies or towers and not just in main when the code first loads
    this.generator = new Generator(gameEngine, map, AM);
    myMouse.setGenerator(this.generator);

	//Game Engine Start
	gameEngine.init(ctx);
	gameEngine.start();

	//Map Load
	map.createMap(gameEngine, AM);
    console.log("Map Loaded!");

	//UI Load
	buttonCanvas = document.getElementById("uiButtons").getContext("2d");
	textCanvas = document.getElementById("uiText");
	var ui = new UI(buttonCanvas, textCanvas,  100, 100, 100, 1, 0, 0);
	console.log("UI Loaded!");

    //Load in entities for prototype
    this.generator.createEnemy("martarlisk");
    this.generator.createEnemy("stroach");
    this.generator.createEnemy("sergling");
	console.log("Enemies Loaded!");

});