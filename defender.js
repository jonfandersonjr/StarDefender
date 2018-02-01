//Create new object with settings as specified below. Add new switch case after adding a new variable.
//frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, speed, range (in pixel)
var marine = {
    name: "marine",
    frameWidth: 64,
    frameHeight: 64,
    sheetWidth: 32,
    frameDuration: 0.1,
    frames: 32,
    loop: true,
    scale: 1,
    range: 100,
    cooldown: 0.5,
    damage: 20
};
var battlecruiser = {
    name: "battlecruiser",
    frameWidth: 111,
    frameHeight: 81,
    sheetWidth: 32,
    frameDuration: 0.1,
    frames: 32,
    loop: true,
    scale: .5,
    range: 100,
    cooldown: 0.5,
    damage: 20
};
var ghost = {
    name: "ghost",
    frameWidth: 40,
    frameHeight: 36,
    sheetWidth: 32,
    frameDuration: 0.1,
    frames: 32,
    loop: true,
    scale: 1,
    range: 100,
    cooldown: 0.5,
    damage: 20
};

function Defender(game, unitName, row, col, map, assetManager) {
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
    this.map = map;
    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_stand.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale);
    this.ctx = this.gameEngine.ctx;
    this.location = location;
    this.x = col * this.map.tileSize;
    this.y = row * this.map.tileSize;
    this.getTrueCordinates();
    this.cooldown = this.unit.cooldown;
    this.isBusy = false;
    this.damage = this.unit.damage;
    this.frame = 0;
    Entity.call(this, this.gameEngine, this.x, this.y);
}

Defender.prototype = new Entity();
Defender.prototype.constructor = Defender;

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
Defender.prototype.update = function() {
    if(this.cooldown <= 0) {
        this.isBusy = false;
        this.cooldown = this.unit.cooldown;
        this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_stand.png`);
    } else if (this.isBusy) {
        this.cooldown -= this.game.clockTick;
    }
    Entity.prototype.update.call(this);
}

Defender.prototype.draw = function() {
    this.animation.drawDefender(this.ctx, this.x, this.y, this.frame);
    Entity.prototype.draw.call(this);
}

Defender.prototype.getTrueCordinates = function() {
    this.trueX = this.x + this.unit.frameWidth / 2;
    this.trueY = this.y + this.unit.frameHeight / 2;
}

Defender.prototype.shoot = function(enemy) {
    if (!this.isBusy) {
        this.gameEngine.addProjectile(new Projectile(this.gameEngine, this.AM, "marine", this.trueX, this.trueY, enemy, this.damage, 2));
        this.isBusy = true;
        this.frame = Math.floor(angle(this.trueX, this.trueY, enemy.trueX, enemy.trueY) / (360 / this.unit.frames));
        this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_shoot.png`);
    }
}

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta + 180;
}