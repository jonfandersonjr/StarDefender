var dropship = { name: "dropship", frameWidth: 40, frameHeight: 41, sheetWidth: 1, frameDuration: 0.1, frames: 1, loop: true, scale: 1, speed: 100};

function SCV(game, map, assetManager, unitStartX, unitStartY, unitEndX, unitEndY) {
    this.AM = assetManager;
    this.map = map;
    this.game = game;
    this.unit = dropship;
    this.direction = "nw";
    this.name = this.unit.name;

    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.ctx = game.ctx;

    this.x = this.map.baseX + 15;
    this.y = this.map.baseY + (this.map.tileSize * 2);
    this.yIntercept = this.map.baseY + (this.map.tileSize * 2);
    this.unitStartX = unitStartX;
    this.unitStartY = unitStartY;
    this.unitEndX = unitEndX;
    this.unitEndY = unitEndY;

    this.isPickingUp = true;
    this.isDroppingOff = false;

    this.speed = this.unit.speed;

    Entity.call(this, game, this.x, this.y);
}

SCV.prototype = new Entity();
SCV.prototype.constructor = SCV;

SCV.prototype.update = function () {

    if (this.isPickingUp) {
        //find and change direction
        this.moveToUnit()
    } else if (this.isDroppingOff) {
        //find and change direction
        this.dropOffUnit();
    } else {
        //find and change direction
        this.headToBase();
    }
    Entity.prototype.update.call(this);
}

SCV.prototype.moveToUnit = function () {
    this.move(this.unitStartX, this.unitStartY);
    if (this.x === this.unitStartX && this.y === this.unitStartY) {
        this.isPickingUp = false;
        this.isDroppingOff = true;
    }
}

SCV.prototype.dropOffUnit = function () {
    this.move(this.unitEndX, this.unitEndY);
    if (this.x === this.unitStartX && this.y === this.unitStartY) {
        this.isDroppingOff = false;
    }
}

SCV.prototype.headToBase = function () {
    this.move(this.map.baseX, this.map.baseY);
    if (this.x === this.map.baseX && this.y === this.map.baseY) {
        //remove from world
    }
}

// Helper function to move to next destination
SCV.prototype.move = function (destinationX, destinationY) {
    let slope = (destinationY - this.y) / (destinationX - this.x);
    this.x += this.game.clockTick * this.speed;
    this.y = slope * this.x + this.yIntercept;
}


SCV.prototype.changeDirection = function (direction) {
    this.direction = direction;
    temp1 = `./img/${this.name}/${this.name}_${this.direction}.png`;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.name}/${this.name}_${this.direction}.png`);
}

SCV.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

