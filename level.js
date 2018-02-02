var firstLevelEnemies = ["zergling", "queen", "mutalisk", "ultralisk", "hydralisk", "defiler"];
var firstLevelWaveSize = [5, 3, 3, 4, 2, 5];

var secondLevelEnemies = ["zergling", "mutalisk", "zergling", "mutalisk", "zergling", "defiler"];
var secondLevelWaveSize = [5, 3, 7, 4, 10, 15];

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
        this.wave.setWave(firstLevelEnemies[this.waveNumber], firstLevelWaveSize[this.waveNumber]);
        this.waveNumber++;
    } else if (this.levelNum === 2) {
        this.wave.setWave(secondLevelEnemies[this.waveNumber], secondLevelWaveSize[this.waveNumber]);
        this.waveNumber++;
    }

    if (this.waveNumber > firstLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }

};

