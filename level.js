/*
 * Choose which enemy, quantity, stat boosts, and entrance locations for each level.
 */

//NOTE: Every level must have an extra waveSize of 0. This is because reasons.
//entranceNum = which entry point on the map they enter from. 1 = first entrance, 2 = second entrance, 3 = both


//Level One
var firstLevelEnemies = ["zergling", "queen", "defiler", "ultralisk", "scourge", "hydralisk", "devourer"];
var firstLevelWaveSize = [3, 3, 3, 2, 3, 4, 1, 0];
var firstLevelSpeedBuff = [1, 1, 1, 1, 1, 1, 1];
var firstLevelHealthBuff = [1, 1, 1, 1, 1, 1, 1];
var firstLevelEntranceNum = [1, 2, 3, 3, 1, 3, 3];

/*
// test for bosses
var firstLevelEnemies = ["sarahkerrigan", "devourer", "overlord", "ultralisk", "scourge", "hydralisk", "devourer"];
var firstLevelWaveSize = [1, 1, 1, 2, 3, 4, 1, 0];
var firstLevelSpeedBuff = [1, 1, 1, 1, 1, 1, 1];
var firstLevelHealthBuff = [1, 1, 1, 1, 1, 1, 1];
var firstLevelEntranceNum = [1, 1, 1, 3, 1, 3, 3];
*/

//Level Two
var secondLevelEnemies = ["queen", "scourge", "ultralisk", "zergling", "defiler", "overlord"];
var secondLevelWaveSize = [5, 5, 7, 8, 10, 1, 0];
var secondLevelSpeedBuff = [1.2, 1, 1, 1, 1, 1];
var secondLevelHealthBuff = [2, 1, 2, 1, 1, 1];
var secondLevelEntranceNum = [3, 2, 1, 3, 2, 3];

//Level Three
var thirdLevelEnemies = ["ultralisk", "defiler", "zergling", "mutalisk", "queen", "sarahkerrigan"];
var thirdLevelWaveSize = [8, 5, 12, 4, 10, 1, 0];
var thirdLevelSpeedBuff = [1, 1.5, 1.2, 1.2, 1.3, 1];
var thirdLevelHealthBuff = [1.5, 2, 1, 2, 2, 1];
var thirdLevelEntranceNum = [3, 3, 3, 3, 3, 3];


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

Level.prototype.createWave = function() {
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

};

Level.prototype.playLevel1 = function() {
    this.wave.setWave(firstLevelEnemies[this.waveNumber],
        firstLevelWaveSize[this.waveNumber],
        firstLevelSpeedBuff[this.waveNumber],
        firstLevelHealthBuff[this.waveNumber],
        firstLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;

    //Once all the waves have run, end this level.
    if (this.waveNumber >= firstLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }
}

Level.prototype.playLevel2 = function() {
    this.wave.setWave(secondLevelEnemies[this.waveNumber],
        secondLevelWaveSize[this.waveNumber],
        secondLevelSpeedBuff[this.waveNumber],
        secondLevelHealthBuff[this.waveNumber],
        secondLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;

    //Once all the waves have run, end the level.
    if (this.waveNumber >= secondLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }
}

Level.prototype.playLevel3 = function() {
    this.wave.setWave(thirdLevelEnemies[this.waveNumber],
        thirdLevelWaveSize[this.waveNumber],
        thirdLevelSpeedBuff[this.waveNumber],
        thirdLevelHealthBuff[this.waveNumber],
        thirdLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;

    //Once all the waves have run, end the level.
    if (this.waveNumber >= thirdLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }
}


Level.prototype.playLevel4 = function() {

}

Level.prototype.playLevel5 = function() {

}