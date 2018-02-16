//Create new Boss with settings as specified below. Add new switch case after adding a new variable.
var sarahkerrigan = {
    name: "sarahkerrigan",
    frameWidth: 34,
    frameHeight: 40,
    sheetWidth: 8,
    frameDuration: 0.1,
    frames: 8,
    loop: true,
    scale: 1,
    speed: 40,
    health: 2000,
    isAir: false,
    damage: 1000,
    deathAnimation: {
        name: "sarahkerrigan",
        frameWidth: 56,
        frameHeight: 41,
        sheetWidth: 9,
        frameDuration: 1,
        frames: 9,
        loop: false,
        scale: 1
    }
};

var infestedkerrigan = {
    name: "infestedkerrigan",
    frameWidth: 34,
    frameHeight: 40,
    sheetWidth: 8,
    frameDuration: 0.1,
    frames: 8,
    loop: true,
    scale: 1,
    speed: 60,
    health: 1000,
    isAir: false,
    damage: 1000,
    deathAnimation: {
        name: "infestedkerrigan",
        frameWidth: 56,
        frameHeight: 41,
        sheetWidth: 9,
        frameDuration: 1,
        frames: 9,
        loop: false,
        scale: 1
    }
};

var devourer = {
    name: "devourer",
    frameWidth: 70, frameHeight: 83, sheetWidth: 6, frameDuration: 0.1, frames: 6,
    loop: true,
    scale: .6,
    speed: 40,
    health: 2000,
    isAir: false,
    damage: 800,
    deathAnimation: {
        name: "devourer",
        frameWidth: 70, frameHeight: 83, sheetWidth: 6, frameDuration: 1, frames: 6,
        loop: false,
        scale: 1
    }
};
var overlord = {
    name: "overlord",
    frameWidth: 60, frameHeight: 75, sheetWidth: 4, frameDuration: 0.1, frames: 4,
    loop: true,
    scale: .6,
    speed: 40,
    health: 2500,
    isAir: false,
    damage: 1000,
    deathAnimation: {
        name: "overlord",
        frameWidth: 60, frameHeight: 75, sheetWidth: 1, frameDuration: 1, frames: 1,
        loop: false,
        scale: 1
    }
};

function Boss(game, unitName, entrance, map, assetManager, theSpeedBuff, theHealthBuff, ui) {
    this.AM = assetManager;
    this.gameUI = ui;

    //Switch case for units.
    switch (unitName) {
        case "sarahkerrigan":
            this.unit = sarahkerrigan;
            this.deathSound = './soundfx/deathKerrigan.wav';
            break;
        case "infestedkerrigan":
            this.unit = infestedkerrigan;
            this.deathSound = './soundfx/deathKerrigan.wav';
            break;
        case "devourer":
            this.unit = devourer;
            this.deathSound = './soundfx/deathDevourer.wav';
            break;
        case "overlord":
            this.unit = overlord;
            this.deathSound = './soundfx/deathOverlord.wav';
            break;
        default:
            console.log("Problem creating Boss");
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
    this.getTrueCordinates();

    //perform statbuffs depending on wave
    this.speedBuff = theSpeedBuff;
    this.speed = this.unit.speed * theSpeedBuff;
    this.maxHealth = this.unit.health * theHealthBuff;
    this.currentHealth = this.maxHealth;
    this.animation.lastHealth = this.currentHealth;
    Entity.call(this, game, this.x, this.y);
}

Boss.prototype = new Entity();
Boss.prototype.constructor = Boss;

//Function to play death sounds on death
Boss.prototype.playSound = function(path) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.volume = 0.2;
    audioElement.play();
}

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
Boss.prototype.update = function() {
    var that = this;
    if (this.x >= this.map.baseX && this.y >= this.map.baseY) {
        this.hitBase();
    } else if (this.currentHealth <= 0 && !this.isDead) {
        this.isDead = true;
        this.setDeathAnimation();
        //Update UI text for enemies killed
        that.gameUI.enemiesKilledAdjust(1);

        //Update resources for each kill
        //Gives 500 resources per kill for now since boss
        that.gameUI.resourceAdjust(500);

        //Play death sounds
        this.playSound(this.deathSound);

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
            case '>':
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
            case '<':
                if (this.map.map[this.row + 1][this.column] === '^' && isLegalMove(this.map.map[this.row][tempRow])) {
                    this.y -= this.game.clockTick * this.speed;
                } else {
                    this.x -= this.game.clockTick * this.speed;
                    this.column = Math.floor(this.x / this.map.tileSize);
                    this.row = Math.floor(this.y / this.map.tileSize);
                    c = this.map.map[this.row][this.column];
                    if (!isLegalMove(c)) {
                        this.x = this.column * this.map.tileSize;
                    }
                    this.changeDirection('west');
                }

                break;
            case '^':
                if (this.map.map[this.row][this.column + 1] === '<' && isLegalMove(this.map.map[this.row][tempColumn])) {
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
            case 'v':
                if (this.map.map[this.row][this.column + 1] === '<' && isLegalMove(this.map.map[this.row][tempColumn])) {
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
                console.log("Problem picking direction");
                break;
        }
        this.getTrueCordinates();
    }
    Entity.prototype.update.call(this);
}

Boss.prototype.draw = function() {
    if (!this.isDead) {
        this.animation.drawBoss(this.game.clockTick, this.ctx, this.x, this.y, this.currentHealth, this.maxHealth);
    } else {
        this.animation.drawDeathFrame(this.game.clockTick, this.ctx, this.x, this.y, this.deadAnimationTimme);
    }
    Entity.prototype.draw.call(this);
}

Boss.prototype.changeDirection = function(direction) {
    this.direction = direction;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`);
}

Boss.prototype.hitBase = function() {
    //**base loses health**
    //**image for base taking damage**
    // find later
    this.gameUI.dmg(this.unit.damage);
    if (this.gameUI.healthCur > 50) {
        //Play taking damge sound
        //'./soundfx/baseAttack.wav'
        //var baseAttack = new Audio('./soundfx/baseAttack.wav');
        //baseAttack.play();
    } else {
        //Play low health sound
        //'./soundfx/baseLow.wav'
        //var baseLow = new Audio('./soundfx/baselowfire.wav');
        //baseLow.play();
    }
    this.curTime = new Date().getSeconds();
    this.isDead = true;
    this.removeFromWorld = true;
}

// boss mechanic for certain units, testing
// add the rest of the pictrure files for kerrigan
Boss.prototype.rageMode = function() {
    if (this.unit === sarahkerrigan && this.unit.currentHealth < 50) {
        this.unit === infestedkerrigan;
    }
}

Boss.prototype.setDeathAnimation = function() {
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

Boss.prototype.getTrueCordinates = function() {
    this.trueX = this.x + (this.unit.frameWidth * this.unit.scale / 2);
    this.trueY = this.y + (this.unit.frameHeight * this.unit.scale / 2);
}


function isLegalMove(c) {
    return c === '<' || c === '>' || c === '^' || c === 'v';
}

function findDirection(map, row, col) {
    let c = map.map[row][col];
    switch (c) {
        case '<':
            return "west"
            break;
        case '>':
            return "east"
            break;
        case 'v':
            return "south"
            break;
        case '^':
            return 'north'
            break;
        default:
            console.log(c);
            console.log("You're going down!");
            break;
    }
}