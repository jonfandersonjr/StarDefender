//Create new array with settings as specified below. Add new switch case after adding a new variable.
//frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, speed
var marine = [40, 32, 1, 0.1, 1, true, 0.5, 0];

function Defender(game, unitName, direction, map, assetManager) {
    this.AM = assetManager;
    this.unitName = unitName;

    //Switch case for units.
    switch (unitName) {
        case "marine":
            this.settings = marine;
            break;
        default:
    }
    this.animation = new Animation(this.AM.getAsset(`./img/${this.unitName}/${this.unitName}.png`),
        this.settings[0], this.settings[1], this.settings[2], this.settings[3], this.settings[4], this.settings[5], this.settings[6]);
    this.speed = this.settings[7];
    this.ctx = game.ctx;
    this.direction = direction;
    this.map = map;
    this.x = this.map.xIni * this.map.tileSize;
    this.y = this.map.yIni * this.map.tileSize;

    Entity.call(this, game, this.x, this.y);
}

Defender.prototype = new Entity();
Defender.prototype.constructor = Defender;

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
Defender.prototype.update = function () {
    let row = Math.floor(this.x / this.map.tileSize);
    let column = Math.floor(this.y / this.map.tileSize)
    
    Entity.prototype.update.call(this);
}

Defender.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



