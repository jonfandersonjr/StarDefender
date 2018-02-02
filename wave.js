var mutaliskWave = {name : "mutalisk", delay : .5 };
var queenWave = {name : "queen", delay : 1 };
var zerglingWave = {name : "zergling", delay : .25 };
var ultraliskWave = {name : "ultralisk", delay : 1 };
var hydraliskWave = {name : "hydralisk", delay : .7 };
var defilerWave = {name : "defiler", delay : .75 };

function Wave(generator, game) {
    this.generator = generator;
    this.gameEngine = game;
    this.unitAmount = 0;
    this.delay = .25;
}

Wave.prototype.constructor = Wave;

Wave.prototype.drawWave = function () {

    if (this.delay <= 0) {
        this.generator.createEnemy(this.unit.name);
        console.log(this.unit.name + " spawned");
        this.delay = this.unit.delay;
        this.unitAmount--;
        if (this.unitAmount <= 0) {
            this.delay = 100000;
        }
    }

}

Wave.prototype.update = function () {
    if (this.gameEngine.addNewLevel) {
        this.delay -= this.gameEngine.clockTick;
    }
}

Wave.prototype.setWave = function (unitName, unitAmount) {
    switch (unitName) {
        case "mutalisk":
            this.unit = mutaliskWave;
            break;
        case "queen":
            this.unit = queenWave;
            break;
        case "zergling":
            this.unit = zerglingWave;
            break;
        case "ultralisk":
            this.unit = ultraliskWave;
            break;
        case "hydralisk":
            this.unit = hydraliskWave;
            break;
        case "defiler":
            this.unit = defilerWave;
            break;
        default:
            console.log("Illegal input");
    }

    console.log("set a wave of " + this.unit.name);
    this.delay = this.unit.delay;
    this.unitAmount = unitAmount;

}

Wave.prototype.setLevel = function (theLevel) {
    this.level = theLevel;
}


