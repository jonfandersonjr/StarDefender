var battlecruiser_projectile = {
    name: "battlecruiser",
    frameWidth: 128,
    frameHeight: 128,
    sheetWidth: 16,
    frameDuration: 0.1,
    frames: 16,
    loop: true,
    scale: 0.2,
    isMultipleSprites: false
};

var antiair_projectile = {
    name: "antiair",
    frameWidth: 48,
    frameHeight: 48,
    sheetWidth: 16,
    frameDuration: 0.1,
    frames: 16,
    loop: true,
    scale: 0.2,
    isMultipleSprites: false
};

class DirectionalProjectile {
    constructor(gameEngine, unitName, defenderCoordinates, enemy, speed, ctx, armorPiercing, damage, offset) {
        switch (unitName) {
            case "battlecruiser":
                this.properties = battlecruiser_projectile;
                break;
            case "antiair":
                this.properties = antiair_projectile;
                break;
            default:
                console.log("Problem creating projectile");
                break;
        }
        this.animation = new Animation(AM.getAsset(`./img/${this.properties.name}/${this.properties.name}_projectile.png`),
                                                    this.properties.frameWidth, this.properties.frameHeight, this.properties.sheetWidth, 
                                                    this.properties.frameDuration, this.properties.frames, this.properties.loop, this.properties.scale * tileSize / 31);
        this.animation1 = new Animation(AM.getAsset(`./img/${this.properties.name}/${this.properties.name}_projectile.png`),
                                                    this.properties.frameWidth, this.properties.frameHeight, this.properties.sheetWidth, 
                                                    this.properties.frameDuration, this.properties.frames, this.properties.loop, this.properties.scale * tileSize / 31);
        this.gameEngine = gameEngine;
        this.enemy = enemy;
        this.defenderCoordinates = defenderCoordinates; //trueX, trueY
        this.speed = speed;
        this.armorPiercing = armorPiercing;
        this.ctx = ctx;
        this.damage = damage;
        this.offset = offset;
        this.updateXY();
    }

    update() {
        if(!this.move(this.enemy.trueX, this.enemy.trueY)) {
            if (this.armorPiercing) {
                this.enemy.currentHealth -= this.damage;
                this.removeFromWorld = true;
            } else {
                this.enemy.currentHealth -= (this.damage - this.enemy.armor);
                this.removeFromWorld = true;
            }
        }
    }

    draw() {
        this.animation.drawDirectional(this.gameEngine.clockTick, this.ctx,
                                        this.x, this.y, this.offset,
                                        radianAngle, this.properties.isMultipleSprites);
    }

    calculateRadianAngle() {
        return angleRadian(this.x, this.y, this.enemy.trueX, this.enemy.trueY);;
    }

    move(destinationX, destinationY) {
        this.calculateFlyAnimation(destinationX, destinationY);
        this.dist -= this.gameEngine.clockTick * this.speed;
        if (this.dist > 20 && this.enemy.currentHealth > 0) {
            this.x -= this.gameEngine.clockTick * this.xSpeed;
            this.y -= this.gameEngine.clockTick * this.ySpeed;
            return true;
        }
        this.calculateRadianAngle();
        return false;
    }

    calculateFlyAnimation(destinationX, destinationY) {
        this.xDif = this.x - destinationX;
        this.yDif = this.y - destinationY;
        this.dist = Math.sqrt(Math.pow(this.xDif, 2) + Math.pow(this.yDif, 2));
        this.xSpeed = this.speed * (this.xDif / this.dist);
        this.ySpeed = this.speed * (this.yDif / this.dist);
    }
    
    updateXY() {
        this.x = this.defenderCoordinates.trueX;
        this.y = this.defenderCoordinates.trueY;
    }
}

function angleRadian(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    //theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta + Math.PI;
}