var scv = { name: "scv", frameWidth: 40, frameHeight: 41, sheetWidth: 1, frameDuration: 0.1, frames: 1, loop: true, scale: 1, speed: 100, direction : "west", gatherTime: 3 };

function SCV(game, map, assetManager) {
    this.AM = assetManager;
    this.map = map;
    this.game = game;
    this.unit = scv;
    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.unit.direction}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.ctx = game.ctx;

    this.x = this.map.baseX + this.map.tileSize;
    this.y = this.map.baseY + (this.map.tileSize * 2);

    this.isAtBase = false;
    this.isAtMineral = false;

    this.speed = this.unit.speed;
    this.direction = this.unit.direction;

    this.gatherTime = this.unit.gatherTime;

    Entity.call(this, game, this.x, this.y);
}

SCV.prototype = new Entity();
SCV.prototype.constructor = SCV;

SCV.prototype.update = function () {

    if (this.atBase()) {
        this.changeDirection("west");
        //add minerals to resources
        this.moveWest();
    } else if (this.atMineral()) {
        this.getMinerals();
    } else {
        if (this.direction === "east") {
            this.moveEast();
        } else if (this.direction === "west") {
            this.moveWest();
        }
    }
    Entity.prototype.update.call(this);
}

SCV.prototype.atBase = function () {

    if (this.x >= (this.map.baseX + (this.map.tileSize / 2))) {
        this.isAtBase = true;
    } else {
        this.isAtBase = false;
    }
    return this.isAtBase;
}

SCV.prototype.atMineral = function () {

    if (this.x <= (this.map.mineralX + (2* this.map.tileSize))) {
        this.isAtMineral = true;
    } else {
        this.isAtMineral = false;
    }
    return this.isAtMineral;
}

SCV.prototype.getMinerals = function () {

    if (this.gatherTime >= 0) {
        this.gatherTime -= this.game.clockTick;
        this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}_mine.png`);
    } else {
        this.gatherTime = 3;
        this.changeDirection("east");
        this.moveEast();
    }
}

SCV.prototype.moveEast = function () {
    this.x = this.x + this.game.clockTick * this.speed; //progresses unit east
}

SCV.prototype.moveWest = function () {
    this.x = this.x - this.game.clockTick * this.speed; //progresses unit west
}

SCV.prototype.changeDirection = function (direction) {
    this.direction = direction;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`);
}

SCV.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

