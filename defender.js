//Create new object with settings as specified below. Add new switch case after adding a new variable.
//frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, speed, range (in pixel)
var marine = {frameWidth : 40, frameHeight : 32, sheetWidth : 1, frameDuration : 0.1, frames : 1, loop : true, scale : 1, speed : 0, range : 100};

function Defender(game, unitName, x, y, map, assetManager) {
    this.AM = assetManager;

    //Switch case for units.
    switch (unitName) {
        case "marine":
            this.unit = marine;
            break;
        default:
    }
    this.animation = new Animation(this.AM.getAsset(`./img/${unitName}/${unitName}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale);
    this.speed = this.unit.speed;
    this.ctx = game.ctx;
    this.location = location;
    this.map = map;
    this.x = x - this.unit.frameWidth / 2;
    this.y = y - this.unit.frameHeight / 2;

    Entity.call(this, game, this.x, this.y);
}

Defender.prototype = new Entity();
Defender.prototype.constructor = Defender;

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
Defender.prototype.update = function() {
    //let row = Math.floor(this.x / this.map.tileSize);
    //let column = Math.floor(this.y / this.map.tileSize)

    Entity.prototype.update.call(this);
}

Defender.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}