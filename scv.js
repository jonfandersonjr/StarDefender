var scv = { name: "scv", frameWidth: 64, frameHeight: 72, sheetWidth: 5, frameDuration: 0.1, frames: 5, loop: true, scale: 0.5, speed: 50}

function SCV(game, direction, map, assetManager, speedSetting) {
    this.AM = assetManager;
    this.speedSetting = speedSetting;
    this.unit = scv;
    this.map = map;
    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${direction}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.speed = this.unit.speed * this.speedSetting;
    this.ctx = game.ctx;
    this.direction = direction;
    //this.x = this.map.corIni.x * this.map.tileSize;
    //this.y = this.map.corIni.y * this.map.tileSize;

    //**testing purposes**
    this.speed *= 2;

    Entity.call(this, game, this.x, this.y);
}

SCV.prototype = new Entity();
SCV.prototype.constructor = SCV;

SCV.prototype.update = function () {
    if (this.x >= this.map.baseX && this.y >= this.map.baseY) {
        this.atBase();
    } else if (this.x <= (this.map.mineralX + this.map.tileSize) && this.y <= this.map.mineralY) {
        this.atMineral();
    } 
    Entity.prototype.update.call(this);
}

SCV.prototype.draw = function () {
    if (!this.isDead) {
        this.animation.drawEnemy(this.game.clockTick, this.ctx, this.x, this.y, this.health, this.unit.health);
    } else {
        this.animation.drawDeathFrame(this.game.clockTick, this.ctx, this.x, this.y, this.deadAnimationTimme);
    }
    Entity.prototype.draw.call(this);
}

SCV.prototype.changeDirection = function (direction) {
    this.direction = direction;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`);
}


SCV.prototype.atBase = function () {
    this.toMineral();
}

SCV.prototype.atMineral = function () {
    //wait a few seconds to gather minerals
    //update sprite to mining animation
    this.toBase();
}


