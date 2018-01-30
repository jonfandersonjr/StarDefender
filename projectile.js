//Game engine, Asset Manager, Defender name, Initial x, Initial y, Enemy, Speed
function Projectile(gameEngine, AM, defenderName, x0, y0, enemy, damage, speedSetting) {
    this.gameEngine = gameEngine;
    this.defenderName = defenderName;
    this.enemy = enemy;
    this.damage = damage;
    this.AM = AM;
    this.ctx = this.gameEngine.ctx;
    this.x = x0;
    this.y = y0;
    this.speed = speedSetting;
    this.animation = new Animation(this.AM.getAsset(`./img/${this.defenderName}/${this.defenderName}_projectile.png`), 42, 42, 1, 1, 1, true, 0.2);
    this.calculateSpeed();
    Entity.call(this, gameEngine, this.x, this.y);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function() {
    this.xDif -= Math.abs(this.gameEngine.clockTick * this.xSpeed);

    if (this.xDif > 0 && this.enemy.health > 0) {
        this.x += this.gameEngine.clockTick * this.xSpeed;
        this.y += this.gameEngine.clockTick * this.ySpeed;
        this.calculateSpeed();
    } else {
        this.enemy.health -= this.damage;
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
}

Projectile.prototype.draw = function() {
    this.animation.drawFrame(this.gameEngine.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Projectile.prototype.calculateSpeed = function() {
    this.xDif = Math.abs(this.x - this.enemy.x);
    this.yDif = Math.abs(this.y - this.enemy.y);

    this.xSpeed = this.speed * (this.xDif / this.yDif) * 100;
    if (this.x > this.enemy.x) {
        this.xSpeed *= -1;
    }

    this.ySpeed = this.speed * 100;
    if (this.y > this.enemy.y) {
        this.ySpeed *= -1;
    }
}