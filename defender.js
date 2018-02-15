//Create new object with settings as specified below. Add new switch case after adding a new variable.
//frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, speed, range (in pixel)
var marine = {
    name: "marine",
    frameWidth: 64,
    frameHeight: 64,
    sheetWidth: 32,
    frameDuration: 0.1,
    frames: 32,
    loop: true,
    scale: 1,
    range: 100,
    cooldown: 0.1,
    damage: 5,
    mapKey: 'a',
    targetGround: true,
    targetFlying: true,
};
var battlecruiser = {
    name: "battlecruiser",
    frameWidth: 111,
    frameHeight: 81,
    sheetWidth: 32,
    frameDuration: 0.1,
    frames: 32,
    loop: true,
    scale: .5,
    range: 500,
    cooldown: 5,
    damage: 100,
    mapKey: 'd',
    targetGround: true,
    targetFlying: false,
};
var ghost = {
    name: "ghost",
    frameWidth: 40,
    frameHeight: 36,
    sheetWidth: 29,
    frameDuration: 0.1,
    frames: 29,
    loop: true,
    scale: 1,
    range: 100,
    cooldown: 0.5,
    damage: 20,
    mapKey: 's',
    targetGround: true,
    targetFlying: false,
};

var antiair = {
    name: "antiair",
    frameWidth: 43,
    frameHeight: 55,
    sheetWidth: 16,
    frameDuration: 0.1,
    frames: 16,
    loop: true,
    scale: 1,
    range: 150,
    cooldown: 0.5,
    damage: 50,
    mapKey: 'w',
    targetGround: false,
    targetFlying: true,
};

function Defender(game, unitName, row, column, map, assetManager, isDummy) {
    this.AM = assetManager;
    this.gameEngine = game;
    //Switch case for units.
    switch (unitName) {
        case "marine":
            this.unit = marine;
            this.shootSound = './soundfx/marine_sound.wav';
            break;
        case "battlecruiser":
            this.unit = battlecruiser;
            this.shootSound = './soundfx/battlecruiser_sound.wav';
            break;
        case "ghost":
            this.unit = ghost;
            this.shootSound = './soundfx/ghost_sound.wav';
            break;
        case "antiair":
            this.unit = antiair;
            this.shootSound = './soundfx/antiair_sound.wav';
            break;
        default:
            break;
    }
    this.soundPlaying = false;
    this.canTargetGround = this.unit.targetGround;
    this.canTargetFlying = this.unit.targetFlying;
    this.map = map;
    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_stand.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.ctx = this.gameEngine.ctx;
    this.row = row;
    this.column = column;
    this.calculateXY(this.row, this.column);
    this.calculateTrueXY();
    this.cooldown = this.unit.cooldown;
    this.isBusy = false;
    this.damage = this.unit.damage;
    this.frame = 0;
    this.isDummy = isDummy;
    this.speed = 100;
    Entity.call(this, this.gameEngine, this.x, this.y);
}



Defender.prototype = new Entity();
Defender.prototype.constructor = Defender;

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
Defender.prototype.update = function() {
    if(this.cooldown <= 0) {
    this.isBusy = false;
    this.cooldown = this.unit.cooldown;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_stand.png`);
    } else if (this.isBusy) {
        this.cooldown -= this.game.clockTick;
    }
    if (this.unit.name === 'battlecruiser' && this.isDummy) {
        this.row = this.lineToRow;
        this.column = this.lineToColumn;
        this.calculateFlyAnimation(this.lineToRow, this.lineToColumn);
        this.dist -= this.gameEngine.clockTick * this.speed;
        if (this.dist > 0) {
            this.x -= this.gameEngine.clockTick * this.xSpeed;
            this.y -= this.gameEngine.clockTick * this.ySpeed;
            this.trueX = this.x + (this.unit.frameWidth/2) * this.unit.scale;
            this.trueY = this.y + (this.unit.frameHeight/2) * this.unit.scale;
        } else {
            this.isDummy = false;
            this.isLineVisible = false;
            this.calculateXY(this.row, this.column);
            this.calculateTrueXY();
        }
    }
    Entity.prototype.update.call(this);
}

Defender.prototype.draw = function() {
    if(!this.isDummy) {
        this.animation.drawDefender(this.ctx, this.x, this.y, this.frame);
    } else {
        if(this.unit.name !== 'battlecruiser') {
            //this.animation.drawDummyDefender(this.ctx, this.x, this.y, this.frame, this.unit.name);
        } else {
            this.frame = Math.floor(angle(this.trueX, this.trueY, (this.lineToColumn + 0.5) * this.map.tileSize, (this.lineToRow + 0.5) * this.map.tileSize) / (360 / this.unit.frames));
            this.animation.drawDefender(this.ctx, this.x, this.y, this.frame);
        }
    }
    if(this.isLineVisible)  {
        this.animation.drawLine(this.ctx, this.trueX, this.trueY, 
            (this.lineToColumn + 0.5) * this.map.tileSize, (this.lineToRow + 0.5) * this.map.tileSize);
    }
    Entity.prototype.draw.call(this);
}

Defender.prototype.calculateXY = function (row, column) {
    this.x = column * this.map.tileSize - (this.unit.frameWidth * this.unit.scale - this.map.tileSize)/2;
    this.y = row * this.map.tileSize - (this.unit.frameHeight * this.unit.scale - this.map.tileSize)/2;
}

Defender.prototype.calculateTrueXY = function() {
    this.trueX = (this.column + 0.5) * this.map.tileSize;
    this.trueY = (this.row + 0.5) * this.map.tileSize;
}

Defender.prototype.shoot = function(enemy) {
    if (!this.isDummy && !this.isBusy) {
        if (this.canTargetFlying && enemy.isAir || this.canTargetGround && !enemy.isAir ) {
            
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', this.shootSound);
            audioElement.volume = 0.05;

            audioElement.onplaying = function() {
                this.soundPlaying = true;
            }

            audioElement.onended = function() {
                this.soundPlaying = false;
            }
            audioElement.onplaying();
            audioElement.onended();
            if (this.soundPlaying === false) {
                audioElement.play();
            }
            

            this.frame = Math.floor(angle(this.trueX, this.trueY, enemy.trueX, enemy.trueY) / (360 / this.unit.frames));
            this.gameEngine.addProjectile(new Projectile(this.gameEngine, this.AM, this.unit.name, this.trueX, this.trueY, enemy, this.damage, enemy.speedBuff * 2));
            this.isBusy = true;
            this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_shoot.png`);
        }
    }
}

Defender.prototype.calculateFlyAnimation = function (row, column) {
    this.xDif = this.x - column * this.map.tileSize;
    this.yDif = this.y - row * this.map.tileSize;
    this.dist = Math.sqrt(Math.pow(this.xDif, 2) + Math.pow(this.yDif, 2));
    this.xSpeed = this.speed * (this.xDif / this.dist);
    this.ySpeed = this.speed * (this.yDif / this.dist);
}

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta + 180;
}
