//Create new array with settings as specified below. Add new switch case after adding a new variable.
//frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, speed
var martarlisk = [64, 72, 5, 0.1, 5, true, 0.5, 50];
var stroach = [75, 68, 5, 0.1, 5, true, 0.5, 25];
var sergling = [45, 45, 7, 0.1, 7, true, 0.6, 75];

function GroundUnit(game, unitName, direction, map, assetManager, speedSetting) {
	this.AM = assetManager;
	this.unitName = unitName;
    this.speedSetting = speedSetting;
	//Switch case for units.
	switch (unitName) {
	case "martarlisk":
		this.settings = martarlisk;
		break;
	case "stroach":
		this.settings = stroach;
		break;
	case "sergling":
		this.settings = sergling;
		break;
	default:
	}
    this.animation = new Animation(this.AM.getAsset(`./img/${this.unitName}/${this.unitName}_${direction}.png`),
			this.settings[0], this.settings[1], this.settings[2], this.settings[3], this.settings[4], this.settings[5], this.settings[6]);
	this.speed = this.settings[7] * this.speedSetting;
	this.ctx = game.ctx;
	this.direction = direction;
	this.map = map;
	this.x = this.map.xIni * this.map.tileSize;
	this.y = this.map.yIni * this.map.tileSize;

	Entity.call(this, game, this.x, this.y);
}

GroundUnit.prototype = new Entity();
GroundUnit.prototype.constructor = GroundUnit;

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
GroundUnit.prototype.update = function () {
	let row = Math.floor(this.x / this.map.tileSize);
	let column = Math.floor(this.y / this.map.tileSize)
    
    if (this.direction === "east") {
        let tempX = this.x + this.game.clockTick * this.speed * this.speedSetting; //Next position
        if (this.map.map[Math.floor(tempX / this.map.tileSize) + 1 + column * this.map.mapSize] === '+') { //Checks if next position is a path.
            row++;
            this.x = row * this.map.tileSize;
            this.changeDirection(newDirection(this.map, row, column, this.direction));
        } else {
            this.x = tempX;
        }
    } else if (this.direction === "west") {
        let tempX = this.x - this.game.clockTick * this.speed * this.speedSetting; //Next position
        if (this.map.map[Math.floor(tempX / this.map.tileSize) + column * this.map.mapSize] === '+') { //Checks if next position is a path.
            this.x = row * this.map.tileSize;
            this.changeDirection(newDirection(this.map, row, column, this.direction));
        } else {
            this.x = tempX;
        }
    } else if (this.direction === "south") {
        let tempY = this.y + this.game.clockTick * this.speed * this.speedSetting; //Next position
        if (this.map.map[row + (Math.floor(tempY / this.map.tileSize) + 1) * this.map.mapSize] === '+') { //Checks if next position is a path.
            column++;
            this.y = column * this.map.tileSize;
            this.changeDirection(newDirection(this.map, row, column, this.direction));
        } else {
            this.y = tempY;
        }
    } else if (this.direction === "north") {
        let tempY = this.y - this.game.clockTick * this.speed * this.speedSetting; //Next position
        if (this.map.map[row + Math.floor(tempY / this.map.tileSize) * this.map.mapSize] === '+') { //Checks if next position is a path.
            this.y = column * this.map.tileSize;
            this.changeDirection(newDirection(this.map, row, column, this.direction));
        } else {
            this.y = tempY;
        }
    }
    Entity.prototype.update.call(this);
}

GroundUnit.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}

GroundUnit.prototype.changeDirection = function (direction) {
    for (let i = 0; i < direction.length; i++) {
        this.direction = direction[i];
        this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unitName}/${this.unitName}_${direction[i]}.png`);
    }
	
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
