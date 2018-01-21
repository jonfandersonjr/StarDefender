function Projectice(gameEngine, x0, y0, x1, y1, speedSettings) {
    this.gameEngine = gameEngine;
    this.x = x0;
    this.y = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.speedSettings = speedSettings;
    this.animation = new animation(82, 89, 1, 0.1, 1, true, 0.2);
    Entity.call(this, gameEngine, this.x, this.y);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function () {
    if (this.x > this.x1) {
        this.x += this.gameEngine.clockTick * speedSettings * 100;
    }
    Entity.prototype.update.call(this);
}

Projectile.prototype.draw = function () {
	this.animation.drawFrame(this.gameEngine.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}