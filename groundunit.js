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
var sarahkerrigan = {name : "sarahkerrigan", frameWidth : 34, frameHeight : 40, sheetWidth : 9, frameDuration : 0.1, frames : 9, loop : true, scale : 1, speed : 40, health : 250, isAir : false,
                deathAnimation : {name : "sarahkerrigan", frameWidth : 56, frameHeight : 41, sheetWidth : 9, frameDuration : 0.1, frames : 9, loop : false, scale : 1}};

function GroundUnit(game, unitName, entrance, map, assetManager, theSpeedBuff, theHealthBuff) {
    this.AM = assetManager;
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
        case "sarahkerrigan":
            this.unit = sarahkerrigan;
            break;
        default:
            console.log("Illegal Input");
            break;
    }
    
    this.entrance = entrance;
    this.map = map;
    // AIR UNIT

    this.isAir = this.unit.isAir;
    if (this.isAir) {
        this.direction = this.map.airDirection;
    } else {
        this.direction = findDirection(map, entrance.row, entrance.column);
    }

    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.ctx = game.ctx;
    this.isDead = false;
    this.deadAnimationTime = this.unit.deathAnimation.frameDuration * this.unit.deathAnimation.frames;
    this.x = entrance.column * this.map.tileSize;
    this.y = entrance.row * this.map.tileSize;
    if(this.unit.name === 'mutalisk'){
        console.log('x ' + this.x + ' y ' + this.y);
    }
    this.getTrueCordinates();

    //perform statbuffs depending on wave
    this.Flying = this.unit.isAir;
    this.speedBuff = theSpeedBuff;
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
    } else if (this.isAir) {
            this.flyingMovement();
    } else {
        this.column = Math.floor(this.x / this.map.tileSize);
        this.row = Math.floor(this.y / this.map.tileSize);
        let c = this.map.map[this.row][this.column];
        let tempY = this.y - this.game.clockTick * this.speed;
        let tempRow = Math.floor(tempY / this.map.tileSize);
        
        let tempX = this.x - this.game.clockTick * this.speed;
        let tempColumn = Math.floor(tempX / this.map.tileSize);
        switch (c) {
            case '>' :
                if (this.map.map[this.row + 1][this.column] === '^' && isLegalMove(this.map.map[tempRow][this.column])) {
                    this.y -= this.game.clockTick * this.speed;
                } else {
                    this.x += this.game.clockTick * this.speed;
                    this.col = Math.floor(this.x / this.map.tileSize);
                    this.row = Math.floor(this.y / this.map.tileSize);
                    c = this.map.map[this.row][this.column];
                    if (c !== '>') {
                        this.x = this.column * this.map.tileSize;
                    }
                    this.changeDirection('east');
                }
                break;
            case '<' :
                this.x -= this.game.clockTick * this.speed;
                this.column = Math.floor(this.x / this.map.tileSize);
                this.row = Math.floor(this.y / this.map.tileSize);
                c = this.map.map[this.row][this.column];
                if (!isLegalMove(c)) {
                    this.x = this.column * this.map.tileSize;
                }
                this.changeDirection('west');
                break;
            case '^' :
                if (this.map.map[this.row][this.column + 1] === '<' && isLegalMove(this.map.map[this.row][this.column])) {
                    this.x -= this.game.clockTick * this.speed;
                } else {
                    this.y -= this.game.clockTick * this.speed;
                    this.column = Math.floor(this.x / this.map.tileSize);
                    this.row = Math.floor(this.y / this.map.tileSize);
                    c = this.map.map[this.row][this.column];
                    if (!isLegalMove(c)) {
                        this.y = this.row * this.map.tileSize;
                    }
                    this.changeDirection('north');
                }
                break;
            case 'v' :
                if (this.map.map[this.row][this.column + 1] === '<' && isLegalMove(this.map.map[this.row][tempColumn])){
                    this.x -= this.game.clockTick * this.speed;
                } else {
                    this.y += this.game.clockTick * this.speed;
                    this.column = Math.floor(this.x / this.map.tileSize);
                    this.row = Math.floor(this.y / this.map.tileSize);
                    c = this.map.map[this.row][this.column];
                    if (c !== 'v') {
                        this.y = this.row * this.map.tileSize;
                    }
                    this.changeDirection('south');
                }
                break;
            default:
                console.log('go home');
                break;
        }
      this.getTrueCordinates();
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
    let y = this.entrance.row * this.map.tileSize;
    let x = this.entrance.column * this.map.tileSize;
    let slope = (this.map.baseY - y) / (this.map.baseX - x);
    this.x += this.game.clockTick * this.speed; //Next position
    this.y += this.game.clockTick * this.speed * slope;
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
    return this.isAir;
}

function isLegalMove(c) {
    return c === '<' || c === '>' || c === '^' || c === 'v';
}

function findDirection(map, row, col) {
    let c = map.map[row][col];
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
            console.log(c);
            console.log("You're going down!");
            break;
    }
}