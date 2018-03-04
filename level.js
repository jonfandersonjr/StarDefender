/*
 * Choose which enemy, quantity, stat boosts, and entrance locations for each level.
 */

//NOTE: Every level must have an extra waveSize of 0. This is because reasons.
//entranceNum = which entry point on the map they enter from. 1 = first entrance, 2 = second entrance, 3 = both

//generic enemies
var g = "guardian";
var dr = "drone";
var z = "zergling";
var q = "queen"; //yaas
var d = "defiler";
var s = "scourge";
var m = "mutalisk";
var h = "hydralisk";
var i = "infestedterran";
var l = "lurker";
//special enemies
var D = "devourer";
var O = "overlord";
var S = "sarahkerrigan";
var I = "infestedkerrigan";
var U = "ultralisk";

/*
// test case
var firstLevelEnemies     = [S, i, S, D, h, D, q, s, S, z, d, O, S, d, z, m, q, S];
var firstLevelWaveSize    = [1, 3, 1, 2, 3, 1, 5, 5, 7, 8, 9, 1, 8, 5, 9, 4, 8, 1, 0];
var firstLevelSpeedBuff   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,.5,.2,.2,.3,.5, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var firstLevelHealthBuff  = [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0,.5, 1, 0, 1, 0, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var firstLevelEntranceNum = [1, 2, 3, 3, 1, 2, 3, 3, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1];
*/
/*
//Level Map transition test
var firstLevelEnemies = [l, i, s];
var firstLevelWaveSize = [3, 3, 1, 0];
var firstLevelSpeedBuff = [0, 0, 0, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var firstLevelHealthBuff = [0, 0, 0, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var firstLevelEntranceNum = [1, 2, 3, 0] //1 = first entrance, 2 = second entrance, 3 = both entrances
*/
//Level One
var firstLevelEnemies     = [l, i, s, U, h, D, q,dr, U, z, d, O, U, d, z, m, q, S];
var firstLevelWaveSize    = [3, 3, 1, 2, 3, 1, 5, 5, 7, 8, 9, 1, 8, 5, 9, 4, 8, 1, 0];
var firstLevelSpeedBuff   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,.5,.2,.2,.3,.5, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var firstLevelHealthBuff  = [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0,.5, 1, 0, 1, 0, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var firstLevelEntranceNum = [1, 2, 3, 3, 1, 2, 3, 3, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1]; //1 = first entrance, 2 = second entrance, 3 = both entrances



//Level Two *incomplete/temporary*
var secondLevelEnemies     = [m, s, m, s, q, d, U, d, q, z, d, D, U, d, z, m, q, S];
var secondLevelWaveSize    = [3, 3, 1, 2, 3, 1, 5, 5, 7, 8, 9, 1, 8, 5, 9, 4, 8, 1, 0];
var secondLevelSpeedBuff   = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var secondLevelHealthBuff  = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var secondLevelEntranceNum = [1, 2, 3, 3, 1, 2, 3, 3, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1]; //1 = first entrance, 2 = second entrance, 3 = both entrances

//Level Three *incomplete/temporary*
var thirdLevelEnemies     = [z, z, z, D, D, D, O, O, O, z, q, d, U, m, s, m, q, S];
var thirdLevelWaveSize    = [3, 3, 7, 2, 3, 1, 3, 2, 2, 8, 9, 1, 8, 5, 9, 4, 8, 1, 0];
var thirdLevelSpeedBuff   = [1, 1, 1, 1, 1, 1, 0,.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var thirdLevelHealthBuff  = [1, 2, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var thirdLevelEntranceNum = [1, 2, 3, 3, 1, 2, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1]; //1 = first entrance, 2 = second entrance, 3 = both entrances

function Level(levelNum, waveObject) {
    this.canvas = document.getElementById("gameWorld");
    this.levelNum = levelNum;
    this.wave = waveObject;
    this.wave.setLevel(this);
    //this.map = map;
    this.isDone = false;
    this.waveNumber = 0;
   
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

Level.prototype.playLevel1 = function () {
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

Level.prototype.playLevel2 = function () {
    
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

Level.prototype.playLevel3 = function () {
    
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