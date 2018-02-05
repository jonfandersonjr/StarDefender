var mutaliskWave = {name : "mutalisk", delay : .5 , speedBuff: 1, healthBuff : 1};
var queenWave = { name: "queen", delay: 1, speedBuff: 1, healthBuff: 1};
var zerglingWave = { name: "zergling", delay: .25, speedBuff: 1, healthBuff: 1};
var ultraliskWave = { name: "ultralisk", delay: 1, speedBuff: 1, healthBuff: 1};
var hydraliskWave = { name: "hydralisk", delay: .7, speedBuff: 1, healthBuff: 1};
var defilerWave = { name: "defiler", delay: .75, speedBuff: 1, healthBuff: 1};
var sarahkerriganwave = { name: "sarahkerriganwave", delay:.25, speedbuff: 1.5, healthBuff: 2};

function Wave(generator, game) {
    this.generator = generator;
    this.gameEngine = game;
    this.unitAmount = 0;
    this.delay = .25;
}

Wave.prototype.constructor = Wave;

Wave.prototype.drawWave = function () {

    if (this.delay <= 0) {
        if (this.entranceNum === 1) {
            this.generator.createEnemyFirstEntry(this.unit.name, this.unit.speedBuff, this.unit.healthBuff);
        } else if (this.entranceNum === 2) {
            this.generator.createEnemySecondEntry(this.unit.name, this.unit.speedBuff, this.unit.healthBuff);
        } else {
            this.generator.createEnemyFirstEntry(this.unit.name, this.unit.speedBuff, this.unit.healthBuff);
            this.generator.createEnemySecondEntry(this.unit.name, this.unit.speedBuff, this.unit.healthBuff);
        }

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

Wave.prototype.setWave = function (unitName, unitAmount, theSpeedBuff, theHealthBuff, theEntranceNum) {
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
        case "sarahkerrigan":
            this.unit = sarahkerriganwave;
            break;
        default:
            console.log("Illegal input");
            break;
    }

    this.entranceNum = theEntranceNum;
    this.unit.speedBuff = theSpeedBuff;
    this.unit.healthBuff = theHealthBuff;
    this.delay = this.unit.delay;
    this.unitAmount = unitAmount;

    console.log("set a wave of " + this.unit.name);
}

Wave.prototype.setLevel = function (theLevel) {
    this.level = theLevel;
}


