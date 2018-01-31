//Create new object with settings as specified below. Add new switch case after adding a new variable.
//name, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, speed
var mutalisk = {name : "mutalisk", frameWidth : 64, frameHeight : 72, sheetWidth : 5, frameDuration : 0.1, frames : 5, loop : true, scale : 0.5, speed : 50, health : 100,
                deathAnimation : {name : "mutalisk", frameWidth : 68, frameHeight : 68, sheetWidth : 9, frameDuration : 0.1, frames : 9, loop : false, scale : 0.5}};
var queen = {name : "queen", frameWidth : 75, frameHeight : 68, sheetWidth : 5, frameDuration : 0.1, frames : 5, loop : true, scale : 0.5, speed : 25, health : 100,
                deathAnimation : {name : "queen", frameWidth : 114, frameHeight : 103, sheetWidth : 9, frameDuration : 0.15, frames : 9, loop : false, scale : 0.5}};
var zergling = {name : "zergling", frameWidth : 40, frameHeight : 39, sheetWidth : 7, frameDuration : 0.1, frames : 7, loop : true, scale : 0.6, speed : 75, health : 100, 
                deathAnimation : {name : "zergling", frameWidth : 65, frameHeight : 53, sheetWidth : 7, frameDuration : 0.15, frames : 7, loop : false, scale : 0.5}};
var ultralisk = {name : "ultralisk", frameWidth : 98, frameHeight : 105, sheetWidth : 7, frameDuration : 0.1, frames : 7, loop : true, scale : 0.35, speed : 15, health : 100, 
                deathAnimation : {name : "ultralisk", frameWidth : 98, frameHeight : 105, sheetWidth : 10, frameDuration : 0.1, frames : 10, loop : false, scale : 0.35}};
var hydralisk = {name : "hydralisk", frameWidth : 42, frameHeight : 55, sheetWidth : 5, frameDuration : 0.1, frames : 5, loop : true, scale : 0.6, speed : 50, health : 100, 
                deathAnimation : {name : "hydralisk", frameWidth : 97, frameHeight : 71, sheetWidth : 12, frameDuration : 0.1, frames : 12, loop : false, scale : 0.4}};
var defiler = {name : "defiler", frameWidth : 69, frameHeight : 59, sheetWidth : 5, frameDuration : 0.1, frames : 5, loop : true, scale : 0.6, speed : 30, health : 100, 
                deathAnimation : {name : "defiler", frameWidth : 67, frameHeight : 44, sheetWidth : 10, frameDuration : 0.1, frames : 10, loop : false, scale : 0.5}};

function GroundUnit(game, unitName, direction, map, assetManager, speedSetting) {
    this.AM = assetManager;
    this.speedSetting = speedSetting;
    //Switch case for units.
    switch (unitName) {
        case "mutalisk":
            this.unit = mutalisk;
            break;
        case "queen":
            this.unit = queen;
            break;
        case "zergling":
            this.unit = zergling;
            break;
        case "ultralisk":
            this.unit = ultralisk;
            break;
        case "hydralisk":
            this.unit = hydralisk;
            break;
        case "defiler":
            this.unit = defiler;
            break;
        default:
    }
    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${direction}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale);
    this.speed = this.unit.speed * this.speedSetting;
    this.ctx = game.ctx;
    this.direction = direction;
    this.map = map;
    this.health = this.unit.health;
    this.isDead = false;
    this.deadAnimationTimme = this.unit.deathAnimation.frameDuration * this.unit.deathAnimation.frames;
    this.x = this.map.xIni * this.map.tileSize;
    this.y = this.map.yIni * this.map.tileSize;
    this.trueX = this.x + (this.unit.frameWidth / 2);
    this.trueY = this.y + (this.unit.frameHeight / 2);
    Entity.call(this, game, this.x, this.y);
}

GroundUnit.prototype = new Entity();
GroundUnit.prototype.constructor = GroundUnit;

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
GroundUnit.prototype.update = function() {
    let row = Math.floor(this.x / this.map.tileSize);
    let column = Math.floor(this.y / this.map.tileSize)
    if (this.health <= 0 && !this.isDead) {
        this.isDead = true;
        this.setDeathAnimation();
    } else if (this.isDead) {
        if (this.deadAnimationTimme > 0) {
            this.deadAnimationTimme -= this.game.clockTick;
        } else {
            this.removeFromWorld = true;
        }
    } /*else {
        if (this.unit.name === "mutalisk") {
            console.log("In mutalisk block");
            let b = this.map.yIni;
            let slope = ((this.map.baseY - b) / this.map.baseX - this.x));
            let tempX = this.x + this.game.clockTick * this.speed * this.speedSetting; //Next position
            this.getTrueCordinates();
        } else*/ if (this.direction === "east") {
            let tempX = this.x + this.game.clockTick * this.speed * this.speedSetting; //Next position
            if (this.map.map[Math.floor(tempX / this.map.tileSize) + 1 + column * this.map.mapSize] === '+') { //Checks if next position is a path.
                row++;
                this.x = row * this.map.tileSize;
                this.changeDirection(newDirection(this.map, row, column, this.direction));
            } else {
                this.x = tempX;
            }
            this.getTrueCordinates();
        } else if (this.direction === "west") {
            let tempX = this.x - this.game.clockTick * this.speed * this.speedSetting; //Next position
            if (this.map.map[Math.floor(tempX / this.map.tileSize) + column * this.map.mapSize] === '+') { //Checks if next position is a path.
                this.x = row * this.map.tileSize;
                this.changeDirection(newDirection(this.map, row, column, this.direction));
            } else {
                this.x = tempX;
            }
            this.getTrueCordinates();
        } else if (this.direction === "south") {
            let tempY = this.y + this.game.clockTick * this.speed * this.speedSetting; //Next position
            if (this.map.map[row + (Math.floor(tempY / this.map.tileSize) + 1) * this.map.mapSize] === '+') { //Checks if next position is a path.
                column++;
                this.y = column * this.map.tileSize;
                this.changeDirection(newDirection(this.map, row, column, this.direction));
            } else {
                this.y = tempY;
            }
            this.getTrueCordinates();
        } else if (this.direction === "north") {
            let tempY = this.y - this.game.clockTick * this.speed * this.speedSetting; //Next position
            if (this.map.map[row + Math.floor(tempY / this.map.tileSize) * this.map.mapSize] === '+') { //Checks if next position is a path.
                this.y = column * this.map.tileSize;
                this.changeDirection(newDirection(this.map, row, column, this.direction));
            } else {
                this.y = tempY;
            }
            this.getTrueCordinates();
        }
    }
    Entity.prototype.update.call(this);
}

GroundUnit.prototype.draw = function() {
    if (!this.isDead){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        this.animation.drawDeathFrame(this.game.clockTick, this.ctx, this.x, this.y, this.deadAnimationTimme);
    }
    Entity.prototype.draw.call(this);
}

GroundUnit.prototype.changeDirection = function(direction) {
    for (let i = 0; i < direction.length; i++) {
        this.direction = direction[i];
        this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${direction[i]}.png`);
    }
}

GroundUnit.prototype.setDeathAnimation = function() {
    this.unit = this.unit.deathAnimation;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_death.png`);
    this.animation.frameWidth = this.unit.frameWidth;
    this.animation.frameDuration = this.unit.frameDuration;
    this.animation.frameHeight = this.unit.frameHeight;
    this.animation.sheetWidth = this.unit.sheetWidth;
    this.animation.frames = this.unit.frames;
    this.animation.loop = this.unit.loop;
    this.animation.scale = this.unit.scale;
}

GroundUnit.prototype.getTrueCordinates = function() {
    this.trueX = this.x + (this.unit.frameWidth / 2);
    this.trueY = this.y + (this.unit.frameHeight / 2);
}

//Finds new direction by checking tiles next to the current one (x, y). Should not go back to where it came from.
function newDirection(map, x, y, currentDirection) {
    if (currentDirection === "east" || currentDirection === "west") {

        if (map.map[x + (y - 1) * map.mapSize] === '-') {
            return [`n${currentDirection}`, "north"];
        } else {
            return [`s${currentDirection}`, "south"];
        }
    } else {
        if (map.map[x - 1 + y * map.mapSize] === '-') {
            return [`${currentDirection}w`, "west"];
        } else {
            return [`${currentDirection}e`, "east"];
        }
    }
}