//Create new object with settings as specified below. Add new switch case after adding a new variable.
//frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, speed, range (in pixel)
var marine = {frameWidth : 40, frameHeight : 32, sheetWidth : 1, frameDuration : 0.1, frames : 1, loop : true, scale : 1, speed : 0, range : 100, cooldown : 0.5};

function Defender(game, unitName, x, y, map, assetManager) {
    this.AM = assetManager;
    this.gameEngine = game;
    //Switch case for units.
    switch (unitName) {
        case "marine":
            this.unit = marine;
            break;
        case "battlecruiser":
            this.unit = battlecruiser;
            break;
        case "ghost":
            this.unit = ghost;
            break;
        default:
            break;
    }
    this.animation = new Animation(this.AM.getAsset(`./img/${unitName}/${unitName}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale);
    this.speed = this.unit.speed;
    this.ctx = this.gameEngine.ctx;
    this.location = location;
    this.map = map;
    this.x = x - this.unit.frameWidth / 2;
    this.y = y - this.unit.frameHeight / 2;
    this.getTrueCordinates();
    this.cooldown = this.unit.cooldown;
    this.isBusy = false;
    Entity.call(this, this.gameEngine, this.x, this.y);
}

Defender.prototype = new Entity();
Defender.prototype.constructor = Defender;

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
Defender.prototype.update = function() {
    //let row = Math.floor(this.x / this.map.tileSize);
    //let column = Math.floor(this.y / this.map.tileSize)
    if(this.cooldown <= 0) {
        this.isBusy = false;
        this.cooldown = this.unit.cooldown;
    } else if(this.isBusy) {
        this.cooldown -= this.game.clockTick;
    }
    Entity.prototype.update.call(this);
}

Defender.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Defender.prototype.getTrueCordinates = function() {
    this.trueX = this.x + this.unit.frameWidth / 2;
    this.trueY = this.y + this.unit.frameHeight / 2;
}

Defender.prototype.shoot = function(enemy) {
    if(!this.isBusy) {
        this.gameEngine.addProjectile(new Projectile(this.gameEngine, this.AM, "marine", this.trueX, this.trueY, enemy, 2));
        this.isBusy = true;
    }
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
