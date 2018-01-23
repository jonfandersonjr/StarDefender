//Game engine, Asset Manager, Defender name, Initial x, Initial y, Destination x, Destination y, Speed
function Projectile(gameEngine, AM, defenderName, x0, y0, x1, y1, speedSetting) {
    this.gameEngine = gameEngine;
    this.defenderName = defenderName;
    this.AM = AM;
    this.ctx = this.gameEngine.ctx;
    this.x = x0;
    this.y = y0;
    this.xDif = Math.abs(this.x - x1);
    this.yDif = Math.abs(this.y - y1);
    
    this.xSpeed = speedSetting * (this.xDif / this.yDif) * 500;
    if (this.x > x1) {
        this.xSpeed *= -1;
    }
    
    this.ySpeed = speedSetting * 500;
    if (this.y > y1) {
        this.ySpeed *= -1;
    }
    this.animation = new Animation(this.AM.getAsset(`./img/${this.defenderName}/projectile.png`), 82, 89, 1, 0.1, 1, true, 0.2);
    
    Entity.call(this, gameEngine, this.x, this.y);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function () {
    this.xDif -= Math.abs(this.gameEngine.clockTick * this.xSpeed);
    
    if (this.xDif > 0) {
        this.x += this.gameEngine.clockTick * this.xSpeed;
        this.y += this.gameEngine.clockTick * this.ySpeed;
    } else {
        this.gameEngine.removeEntity(this);
    }
    Entity.prototype.update.call(this);
}

Projectile.prototype.draw = function () {
	this.animation.drawFrame(this.gameEngine.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}