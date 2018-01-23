var map_1 = "+++++++++++++++++++++++++\n" +
            "----+++++++++++++++++++++\n" +
            "+++---------------------+\n" +
            "+++++++++++++++++++++++-+\n" +
            "+++++++++++++++++++++++-+\n" +
            "+-----------------------+\n" +
            "+-+++++++++++++++++++++++\n" +
            "+-+++++++++++++++++++++++\n" +
            "+-+++++++++++++++++++++++\n" +
            "+-----------------------+\n" +
            "+++++++++++++++++++++++-+\n" +
            "+++++++++++++++++++++++-+\n" +
            "+++++++++++++++++++++++-+\n" +
            "+-----------------------+\n" +
            "+-+++++++++++++++++++++++\n" +
            "+-+++++++++++++++++++++++\n" +
            "+-+++++++++++++++++++++++\n" +
            "+-----------------------+\n" +
            "+++++++++++++++++++++++-+\n" +
            "+++++++++++++++++++++++-+\n" +
            "++----------------------+\n" +
            "++-++++++++++++++++++++++\n" +
            "++-++++++++++++++++++++++\n" +
            "++----------------------=\n" +
            "+++++++++++++++++++++++++\n" +
            "~~~~~~~~~~~~~~~~~~~~~~~~~~"
function Map(map) {
    this.map = map;
    this.mapSize = Math.sqrt(this.map.length);
    this.canvas = document.getElementById("gameWorld");
    this.tileSize = this.canvas.height / (this.mapSize - 1);
    if (this.map === map_1) {
        this.xIni = 0;
        this.yIni = 1;
        this.dIni = "east";
    }
}

Map.prototype.constructor = Map;

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
Map.prototype.createMap = function (gameEngine, assetManager) {
	for (let i = 0, j = 0; i < this.mapSize; i++) {
		if (this.map[i + j * this.mapSize] === '+') {
			gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/grass.png"), i * this.tileSize, j * this.tileSize));
		} else if (this.map[i + j * this.mapSize] === '\n') {
			i = -1;
			j++;
		} else if (this.map[i + j * this.mapSize] === '-') {
			gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/dirt.png"), i * this.tileSize, j * this.tileSize));
        } else if (this.map[i + j * this.mapSize] === '=') {
            gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/base.png"), i * this.tileSize, j * this.tileSize));
        }
	}
}