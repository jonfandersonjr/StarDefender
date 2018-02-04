//Create new object with settings as specified below. Add new switch case after adding a new variable.
var mutalisk = {name : "mutalisk", frameWidth : 64, frameHeight : 72, sheetWidth : 5, frameDuration : 0.1, frames : 5, loop : true, scale : 0.5, speed : 50, health : 100, isAir : true,
                deathAnimation : {name : "mutalisk", frameWidth : 68, frameHeight : 68, sheetWidth : 9, frameDuration : 0.1, frames : 9, loop : false, scale : 0.5}};
var queen = {name : "queen", frameWidth : 75, frameHeight : 68, sheetWidth : 5, frameDuration : 0.1, frames : 5, loop : true, scale : 0.5, speed : 25, health : 100, isAir : false,
                deathAnimation : {name : "queen", frameWidth : 114, frameHeight : 103, sheetWidth : 9, frameDuration : 0.15, frames : 9, loop : false, scale : 0.5}};
var zergling = {name : "zergling", frameWidth : 40, frameHeight : 39, sheetWidth : 7, frameDuration : 0.1, frames : 7, loop : true, scale : 0.6, speed : 75, health : 100, isAir : false,
                deathAnimation : {name : "zergling", frameWidth : 65, frameHeight : 53, sheetWidth : 7, frameDuration : 0.15, frames : 7, loop : false, scale : 0.5}};
var ultralisk = {name : "ultralisk", frameWidth : 98, frameHeight : 105, sheetWidth : 7, frameDuration : 0.1, frames : 7, loop : true, scale : 0.35, speed : 15, health : 100, isAir : false,
                deathAnimation : {name : "ultralisk", frameWidth : 98, frameHeight : 105, sheetWidth : 10, frameDuration : 0.1, frames : 10, loop : false, scale : 0.35}};
var hydralisk = {name : "hydralisk", frameWidth : 42, frameHeight : 55, sheetWidth : 5, frameDuration : 0.1, frames : 5, loop : true, scale : 0.6, speed : 50, health : 100, isAir : false,
                deathAnimation : {name : "hydralisk", frameWidth : 97, frameHeight : 71, sheetWidth : 12, frameDuration : 0.1, frames : 12, loop : false, scale : 0.4}};
var defiler = {name : "defiler", frameWidth : 69, frameHeight : 59, sheetWidth : 5, frameDuration : 0.1, frames : 5, loop : true, scale : 0.6, speed : 30, health : 100, isAir : false,
                deathAnimation : {name : "defiler", frameWidth : 67, frameHeight : 44, sheetWidth : 10, frameDuration : 0.1, frames : 10, loop : false, scale : 0.5}};

function GroundUnit(game, unitName, entrance, map, assetManager, speedSetting, theSpeedBuff, theHealthBuff) {
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
            console.log("Illegal Input");
            break;
    }
    // AIR UNIT
    this.air = this.unit.isAir;

    this.direction = findDirection(map.map, entrance.row, entrance.column);
    this.map = map;

    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.ctx = game.ctx;
    this.isDead = false;
    this.deadAnimationTime = this.unit.deathAnimation.frameDuration * this.unit.deathAnimation.frames;
    this.x = entrance.column * this.map.tileSize;
    this.y = entrance.row * this.map.tileSize;
    console.log(this.x)
    this.getTrueCordinates();

    //perform statbuffs depending on wave
    this.speed = this.unit.speed * theSpeedBuff;
    this.maxHealth = this.unit.health * theHealthBuff;
    this.currentHealth = this.maxHealth;
    this.animation.lastHealth = this.currentHealth;
    Entity.call(this, game, this.x, this.y);

    
}

GroundUnit.prototype = new Entity();
GroundUnit.prototype.constructor = GroundUnit;

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
GroundUnit.prototype.update = function () {
    if (this.x >= this.map.baseX && this.y >= this.map.baseY) {
        this.hitBase();
    } else if (this.currentHealth <= 0 && !this.isDead) {
        this.isDead = true;
        this.setDeathAnimation();
    } else if (this.isDead) {
        if (this.deadAnimationTimme > 0) {
            this.deadAnimationTimme -= this.game.clockTick;
        } else {
            this.removeFromWorld = true;
        }
    } else if (this.unit.name === "mutalisk") {
            this.flyingMovement();
    } else {
        this.col = Math.floor(this.x / this.map.tileSize);
        this.row = Math.floor(this.y / this.map.tileSize);
        let tempX, tempY;
        switch (this.direction) {
            case 'east':
                tempX = this.x + this.game.clockTick * this.speed * this.speedSetting; //Next position
                if (this.map.map[this.row][Math.floor(tempX / this.map.tileSize) + 1] === '+') { //Checks if next position is a path.
                    this.col++;
                    this.x = this.col * this.map.tileSize;
                    this.changeDirection(newDirection(this.map, this.col, this.row, this.direction));
                } else {
                    this.x = tempX;
                }
                this.getTrueCordinates();
                break;
            case 'west':
                tempX = this.x - this.game.clockTick * this.speed * this.speedSetting; //Next position
                if (this.map.map[this.row][Math.floor(tempX / this.map.tileSize)] === '+') { //Checks if next position is a path.
                    this.x = this.col * this.map.tileSize;
                    this.changeDirection(newDirection(this.map, this.col, this.row, this.direction));
                } else {
                    this.x = tempX;
                }
                this.getTrueCordinates();
                break;
            case 'south':
                tempY = this.y + this.game.clockTick * this.speed * this.speedSetting; //Next position
                if (this.map.map[Math.floor(tempY / this.map.tileSize) + 1][this.col] === '+') { //Checks if next position is a path.
                    this.row = Math.floor(tempY / this.map.tileSize);
                    this.y = this.row * this.map.tileSize;
                    this.changeDirection(newDirection(this.map, this.col, this.row, this.direction));
                } else {
                    this.y = tempY;
                }
                this.getTrueCordinates();
                break;
            case 'north':
                tempY = this.y - this.game.clockTick * this.speed * this.speedSetting; //Next position
                if (this.map.map[Math.floor(tempY / this.map.tileSize)][this.col] === '+') { //Checks if next position is a path.
                    this.y = this.row * this.map.tileSize;
                    this.changeDirection(newDirection(this.map, this.col, this.row, this.direction));
                } else {
                    this.y = tempY;
                }
                this.getTrueCordinates();
                break;
        }
    }
    Entity.prototype.update.call(this);
}

GroundUnit.prototype.draw = function () {
    if (!this.isDead){
        this.animation.drawEnemy(this.game.clockTick, this.ctx, this.x, this.y, this.currentHealth, this.maxHealth);
    } else {
        this.animation.drawDeathFrame(this.game.clockTick, this.ctx, this.x, this.y, this.deadAnimationTimme);
    }
    Entity.prototype.draw.call(this);
}

GroundUnit.prototype.changeDirection = function(direction) {
    this.direction = direction;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`);
}

GroundUnit.prototype.flyingMovement = function () {
    let b = this.map.corIni.y * this.map.tileSize;
    let slope = ((this.map.baseY - b) / (this.map.baseX - 0));
    this.x = this.x + this.game.clockTick * this.speed * this.speedSetting; //Next position
    this.y = (slope * this.x) + b;
    this.getTrueCordinates();
}

GroundUnit.prototype.hitBase = function () {
    //**base loses health**
    //**image for base taking damage**
    this.isDead = true;
    this.removeFromWorld = true;
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
    this.trueX = this.x + (this.unit.frameWidth * this.unit.scale / 2);
    this.trueY = this.y + (this.unit.frameHeight * this.unit.scale / 2);
}

GroundUnit.prototype.returnAir = function() {
    return this.air;
}

function findDirection(map, row, col) {
    let c = map[row][col];
    switch (c) {
        case '<' :
            return "west"
            break;
        case '>' :
            return "east"
            break;
        case 'v' :
            return "south"
            break;
        case '^' :
            return 'north'
            break;
        default:
            console.log("You're going down!");
            break;
    }
}

//Finds new direction by checking tiles next to the current one (x, y). Should not go back to where it came from.
function newDirection(map, x, y, currentDirection) {
    if (currentDirection === "east" || currentDirection === "west") {
        if (map.map[y - 1][x] === '-') {
            return 'north';
        } else {
            return 'south';
        }
    } else {
        if (map.map[y][x - 1] === '-') {
            return 'west';
        } else {
            return 'east';
        }
    }
}