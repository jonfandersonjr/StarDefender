var mutalisk1 = {name : "mutalisk", delay : .5 };
var queen1 = {name : "queen", delay : .75 };
var zergling1 = {name : "zergling", delay : .4 };
var ultralisk1 = {name : "ultralisk", delay : .6 };
var hydralisk1 = {name : "hydralisk", delay : .5 };
var defiler1 = {name : "defiler", delay : .7 };

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
            this.unit = mutalisk1;
            break;
        case "queen":
            this.unit = queen1;
            break;
        case "zergling":
            this.unit = zergling1;
            break;
        case "ultralisk":
            this.unit = ultralisk1;
            break;
        case "hydralisk":
            this.unit = hydralisk1;
            break;
        case "defiler":
            this.unit = defiler1;
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


