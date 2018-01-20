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
		}
	}
}

var unitList = ["martarlisk", "stroach", "sergling"];
var directions = ["east", "west", "north", "south", "ne", "nw", "se", "sw"];
for (let i = 0; i < unitList.length; i++) {
	for (let j = 0; j < directions.length; j++) {
		AM.queueDownload(`./img/${unitList[i]}_${directions[j]}.png`);
	}
}
AM.queueDownload("./tiles/dirt.png");
AM.queueDownload("./tiles/grass.png");

AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var map = new Map(map_1);
    var gameEngine = new GameEngine(new Mouse(map.mapSize));
	gameEngine.init(ctx);
	gameEngine.start();

	createMap(gameEngine, map);
	console.log("Map Loaded!");

	gameEngine.addEntity(new GroundUnit(gameEngine, "martarlisk", map.dIni, map, AM));
	gameEngine.addEntity(new GroundUnit(gameEngine, "stroach", map.dIni, map, AM));
	gameEngine.addEntity(new GroundUnit(gameEngine, "sergling", map.dIni, map, AM));
	console.log("Enemies Loaded!");

	//UI Load
	ctx = document.getElementById("ui").getContext("2d");
	var imageObj = new Image();
	imageObj.src = './ui/ui.png';
	imageObj.onload = function () {
		ctx.drawImage(imageObj, 0, 0);
	};
	console.log("UI Loaded!");
});
