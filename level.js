/*
*  Choose which enemy, quantity, and stat boosts to apply.
*/

var firstLevelEnemies = ["zergling", "queen", "zergling", "mutalisk", "ultralisk", "hydralisk", "defiler"];
var firstLevelWaveSize = [5, 4, 6, 3, 4, 5, 10];
var firstLevelSpeedBuff = [1, 2, 2, 1.5, 2, 2, 2];
var firstLevelHealthBuff = [1, 2, .75, 1, 3, 2, 2.5];
var firstLevelEntranceNum = [1, 2, 1, 3, 2, 3, 1];

/*
var firstLevelEnemies = ["sarahkerrigan"];
var firstLevelWaveSize = [5];
var firstLevelSpeedBuff = [1];
var firstLevelHealthBuff = [1];
var firstLevelEntranceNum = [1];
*/
var secondLevelEnemies = ["zergling", "mutalisk", "zergling", "mutalisk", "defiler", "zergling"];
var secondLevelWaveSize = [5, 3, 7, 4, 10, 10, 8];
var secondLevelSpeedBuff = [1, 1, 2, 1.5, 1, 1.75];
var secondLevelHealthBuff = [1, 1.5, 2, 3, 4, .5];
var secondLevelEntranceNum = [1, 2, 1, 3, 2, 3, 1];

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

    switch (this.levelNum) {
        case 1:
            this.playLevel1();
            break;
        case 2:
            this.playLevel2();
            break;
        case 3:
            this.playLevel3();
            break;
        case 4:
            this.playLevel4();
            break;
        case 5:
            this.playLevel5();
            break;
        default:
            console.log("illegal level selection of level: " + this.levelNum);
            break;
    }

    //Once all the waves have run, end the level.
    //used ">" because update() happens before draw() in the gameEngine.
    if (this.waveNumber > firstLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }

};

Level.prototype.playLevel1 = function () {
    this.wave.setWave(firstLevelEnemies[this.waveNumber],
                      firstLevelWaveSize[this.waveNumber],
                      firstLevelSpeedBuff[this.waveNumber],
                      firstLevelHealthBuff[this.waveNumber],
                      firstLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;
}

Level.prototype.playLevel2 = function () {
    this.wave.setWave(secondLevelEnemies[this.waveNumber],
                      secondLevelWaveSize[this.waveNumber],
                      secondLevelSpeedBuff[this.waveNumber],
                      secondLevelHealthBuff[this.waveNumber],
                      secondLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;
}

Level.prototype.playLevel3 = function () {
    this.wave.setWave(thirdLevelEnemies[this.waveNumber],
                      thirdLevelWaveSize[this.waveNumber],
                      thirdLevelSpeedBuff[this.waveNumber],
                      thirdLevelHealthBuff[this.waveNumber],
                      thirdLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;
}

Level.prototype.playLevel4 = function () {

}

Level.prototype.playLevel5 = function () {

}
