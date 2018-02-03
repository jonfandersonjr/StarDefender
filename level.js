/*
*  Choose which enemy, quantity, and stat boosts to apply.
*/
var firstLevelEnemies = ["zergling", "queen", "zergling", "mutalisk", "ultralisk", "hydralisk", "defiler"];
var firstLevelWaveSize = [5, 4, 6, 3, 4, 2, 5];
var firstLevelSpeedBuff = [1, 2, 2, 1.5, 2, 2, 2];
var firstLevelHealthBuff = [1, 2, .75, 1, 3, 2, 2];

var secondLevelEnemies = ["zergling", "mutalisk", "zergling", "mutalisk", "defiler", "zergling"];
var secondLevelWaveSize = [5, 3, 7, 4, 10, 10, 8];
var secondLevelSpeedBuff = [1, 1, 2, 1.5, 1, 1.75];
var secondLevelHealthBuff = [1, 1.5, 2, 3, 4, .5];

function Level(levelNum, waveObject) {
    this.canvas = document.getElementById("gameWorld");
    this.levelNum = levelNum;
    this.wave = waveObject;
    this.wave.setLevel(this);
    this.isDone = false;
    this.waveNumber = 0;
    //this.map = map or no?
}

Level.prototype.constructor = Level;

Level.prototype.createWave = function () {

    console.log("Sending wave " + this.waveNumber + " on level " + this.levelNum);

    if (this.levelNum === 1) {

        this.wave.setWave(firstLevelEnemies[this.waveNumber],
            firstLevelWaveSize[this.waveNumber],
            firstLevelSpeedBuff[this.waveNumber],
            firstLevelHealthBuff[this.waveNumber]);

        this.waveNumber++;
    } else if (this.levelNum === 2) {

        this.wave.setWave(secondLevelEnemies[this.waveNumber],
            secondLevelWaveSize[this.waveNumber],
            secondLevelSpeedBuff[this.waveNumber],
            secondLevelHealthBuff[this.waveNumber]);

        this.waveNumber++;
    }

    //Once all the waves have run, end the level.
    //used ">" because update() happens before draw() in the gameEngine.
    if (this.waveNumber > firstLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }

};

