
var marine_projectile = {
    name: "marine",
    frameWidth: 42,
    frameHeight: 42,
    sheetWidth: 1,
    frameDuration: 1,
    frames: 1,
    loop: true,
    scale: 0.2,
};
var battlecruiser_projectile = {
    name: "battlecruiser",
    frameWidth: 66,
    frameHeight: 116,
    sheetWidth: 1,
    frameDuration: 1,
    frames: 1,
    loop: true,
    scale: 0.2,
};
var ghost_projectile = {
    name: "ghost",
    frameWidth: 15,
    frameHeight: 17,
    sheetWidth: 1,
    frameDuration: 1,
    frames: 1,
    loop: true,
    scale: 0.6,
};

var antiair_projectile = {
    name: "antiair",
    frameWidth: 20,
    frameHeight: 20,
    sheetWidth: 1,
    frameDuration: 1,
    frames: 1,
    loop: true,
    scale: 1,
};

//Game engine, Asset Manager, Defender name, Initial x, Initial y, Enemy, Speed
function Projectile(gameEngine, AM, defenderName, x0, y0, enemy, damage, speedSetting) {
    this.gameEngine = gameEngine;
    //Switch case for units.
    switch (defenderName) {
        case "marine":
            this.unit = marine_projectile;
            break;
        case "antiair":
            this.unit = antiair_projectile;
            break;
        case "battlecruiser":
            this.unit = battlecruiser_projectile;
            break;
        case "ghost":
            this.unit = ghost_projectile;
            break;
        default:
            console.log("Problem creating projectile");
            break;
    }
    console.log(this.defenderName);
    this.frameWidth = this.unit.frameWidth;
    this.frameHeight = this.unit.frameHeight;
    this.sheetWidth = this.unit.sheetWidth;
    this.frameDuration = this.unit.frameDuration;
    this.frames = this.unit.frames;
    this.loop = this.unit.loop;
    this.scale = this.unit.scale;
    this.defenderName = defenderName;
    this.enemy = enemy;
    this.damage = damage;
    this.AM = AM;
    this.ctx = this.gameEngine.ctx;
    this.x = x0;
    this.y = y0;
    this.speed = speedSetting;
    this.animation = new Animation(this.AM.getAsset(`./img/${this.defenderName}/${this.defenderName}_projectile.png`), this.frameWidth, this.frameHeight, this.sheetWidth , this.frameDuration, this.frames, this.loop, this.scale);
    this.calculateSpeed();
    Entity.call(this, gameEngine, this.x, this.y);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function() {
    this.xDif -= Math.abs(this.gameEngine.clockTick * this.xSpeed);

    if (this.xDif > 0 && this.enemy.currentHealth > 0) {
        this.x += this.gameEngine.clockTick * this.xSpeed;
        this.y += this.gameEngine.clockTick * this.ySpeed;
        this.calculateSpeed();
    } else {
        this.enemy.currentHealth -= this.damage;
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
}

Projectile.prototype.draw = function() {
    this.animation.drawFrame(this.gameEngine.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Projectile.prototype.calculateSpeed = function() {
    this.xDif = Math.abs(this.x - this.enemy.trueX);
    this.yDif = Math.abs(this.y - this.enemy.trueY);

    this.xSpeed = this.speed * (this.xDif / this.yDif) * 100;
    if (this.x > this.enemy.trueX) {
        this.xSpeed *= -1;
    }

    this.ySpeed = this.speed * 100;
    if (this.y > this.enemy.trueY) {
        this.ySpeed *= -1;
    }
}