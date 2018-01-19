var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.setSprite = function (spriteSheet) {
    this.spriteSheet = spriteSheet;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

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

Background.prototype.update = function () {
};

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

var unitList = ["martarlisk", "stroach"];
var directions = ["east", "west", "north", "south"];
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

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    
    var map = new Map(map_1);
    createMap(gameEngine, map);
    gameEngine.addEntity(new GroundUnit(gameEngine, "martarlisk", map.dIni, map, AM));
    gameEngine.addEntity(new GroundUnit(gameEngine, "stroach", map.dIni, map, AM));
    console.log("All Done!");
});