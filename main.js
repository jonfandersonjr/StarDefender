var AM = new AssetManager();

function Background(game, spritesheet, x, y) {
	this.x = x;
	this.y = y;
	this.spritesheet = spritesheet;
	this.game = game;
	this.ctx = game.ctx;
}

Background.prototype.draw = function () {
	this.ctx.drawImage(this.spritesheet,
		this.x, this.y);
};

Background.prototype.update = function () {};

//Creates a map based on the selection.
function createMap(game, map) {
	var mapString = map.map;
	for (let i = 0, j = 0; i < map.mapSize; i++) {
		if (mapString[i + j * map.mapSize] === '+') {
			game.addEntity(new Background(game, AM.getAsset("./tiles/grass.png"), i * map.tileSize, j * map.tileSize));
		} else if (mapString[i + j * map.mapSize] === '\n') {
			i = -1;
			j++;
		} else if (mapString[i + j * map.mapSize] === '-') {
			game.addEntity(new Background(game, AM.getAsset("./tiles/dirt.png"), i * map.tileSize, j * map.tileSize));
        } else if (mapString[i + j * map.mapSize] === '=') {
            game.addEntity(new Background(game, AM.getAsset("./tiles/dirt.png"), i * map.tileSize, j * map.tileSize));
            game.addEntity(new Background(game, AM.getAsset("./tiles/base.png"), i * map.tileSize, j * map.tileSize));
        }
	}
}

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
    var statTracker = new Stats(100, 100, 100, 1, 0, 0, "00", "00");

    //This generator will allow us to easily create enemies or towers and not just in main when the code first loads
    this.generator = new Generator(gameEngine, map, AM);
    myMouse.setGenerator(this.generator);

	//Game Engine Start
	gameEngine.init(ctx);
	gameEngine.start();

	//Map Load
	createMap(gameEngine, map);
    console.log("Map Loaded!");

	//UI Load
	buttonCanvas = document.getElementById("uiButtons").getContext("2d");
	textCanvas = document.getElementById("uiText");
	var ui = new UI(buttonCanvas, textCanvas, gameEngine, statTracker);

    //Load in entities for prototype
    this.generator.createEnemy("martarlisk");
    this.generator.createEnemy("stroach");
    this.generator.createEnemy("sergling");
	console.log("Enemies Loaded!");

	/* Stat tracker usage EXAMPLE
	//Resource adjust test
	//Adds 50 resource to pool via stat tracker, then updates text based on stattracker
	statTracker.resourceAdjust(50);
	ui.updateText(textCanvas, statTracker);
	console.log("Resource Adjust Test");

	//Reset stat tracker to init values usage EXAMPLE
	statTracker.reset();
	ui.updateText(textCanvas, statTracker);
	console.log("Reset Stats Test");*/
});
