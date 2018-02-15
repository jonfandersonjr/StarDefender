/*
Constructor
buttonCanvas - canvas that has defence structure uiButtons
textCanvas - textArea that holds this
*/
var images = [
    "./img/buttons/marine_portrait.png",
    "./img/buttons/scv_portrait50.png",
    "./img/buttons/ghost_portrait.png",
    "./img/buttons/battlecruiser_portrait.png",
    "./img/buttons/antiair_portrait.png"
];

function UI(mouse, startHealth, maxHealth,
    startRes, startLevel, wavesCleared, enemiesK) {
    this.canvas = document.getElementById("uiButtons");
    this.ctx = this.canvas.getContext("2d");
    //Text box - prevents highlighting
    this.textBox = document.getElementById("uiText");
    makeUnselectable(this.textBox);
    makeUnselectable(document.getElementById("gameOverlayScreen"));
    this.mouse = mouse;

    //Music
    this.audio = new Audio(),
        i = 0;
    this.playlist = new Array('./music/1.mp3', './music/2.mp3', './music/3.mp3');
    this.audio.addEventListener('ended', function() {
        i = ++i < playlist.length ? i : 0;
        this.audio.src = playlist[i];
        this.audio.play();
    }, true);
    this.audio.volume = 0.3;
    this.audio.loop = false;
    this.audio.src = this.playlist[0];
    this.audio.play();


    //Game info text panel
    generateGameInfo();
    drawImages(this.ctx);
    this.canvas.addEventListener("click", function(e) {
        var mousePos = getMousePos(document.getElementById("uiButtons"), e);
        if (mousePos.x >= 0 && mousePos.x <= 100 && mousePos.y >= 0 && mousePos.y <= 100) {
            mouse.unitCost = 50;
            mouse.tileBox.unitCost = 50;
            mouse.selectDefender("marine");
        } else if (mousePos.x >= 110 && mousePos.x <= 210 && mousePos.y >= 0 && mousePos.y <= 100) {
            mouse.unitCost = 100;
            mouse.tileBox.unitCost = 100;
            mouse.selectDefender("ghost");
        } else if (mousePos.x >= 0 && mousePos.x <= 100 && mousePos.y >= 110 && mousePos.y <= 210) {
            mouse.unitCost = 150;
            mouse.tileBox.unitCost = 150;
            mouse.selectDefender("battlecruiser");
        } else if (mousePos.x >= 110 && mousePos.x <= 210 && mousePos.y >= 110 && mousePos.y <= 210) {
            mouse.unitCost = 100;
            mouse.tileBox.unitCost = 100;
            mouse.selectDefender("antiair");
        } else if (mousePos.x >= 58 && mousePos.x <= 162 && mousePos.y >= 210 && mousePos.y <= 320) {
            mouse.selectDefender("scv");
        }
    }, false);

    //gets relative mouse position based on canvas
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    //Draws button images
    function drawImages(ctx) {
        //Marine
        var marine_img = new Image();
        marine_img.onload = function() {
            ctx.drawImage(marine_img, 0, 0);
        }
        marine_img.src = images[0];

        //Ghost
        var ghost_img = new Image();
        ghost_img.onload = function() {
            ctx.drawImage(ghost_img, 110, 0);
        }
        ghost_img.src = images[2];

        //Battlecruiser
        var battle_img = new Image();
        battle_img.onload = function() {
            ctx.drawImage(battle_img, 0, 110);
        }
        battle_img.src = images[3];

        //AntiAir
        var antiair_img = new Image();
        antiair_img.onload = function() {
            ctx.drawImage(antiair_img, 110, 110);
        }
        antiair_img.src = images[4];

        //SCV
        var scv_img = new Image();
        scv_img.onload = function() {
            ctx.drawImage(scv_img, 60, 220);
        }
        scv_img.src = images[1];
    };

    //init values
    this.inithealthCur = startHealth;
    this.inithealthMax = maxHealth;
    this.initresourcesTotal = startRes;
    this.initcurLevel = startLevel;
    this.initwavesC = wavesCleared;
    this.initenemiesKilled = enemiesK;
    this.initWaveTime = 0;

    this.healthCur = startHealth;
    this.healthMax = maxHealth;
    this.resourcesTotal = startRes;
    this.curLevel = startLevel;
    this.wavesC = wavesCleared;
    this.enemiesKilled = enemiesK;
    this.waveTime = 0;

    this.time = "00:00";
    this.timeReal = 0;
    this.timeChange = 0;

    //Load Default Text
    this.updateText();
};

UI.prototype.attachEngine = function(engine) {
    this.gameEngine = engine;
}

//Pauses music or plays music based on boolean toggle
UI.prototype.pauseMusic = function(bool) {
    var that = this;
    if (bool) {
        that.audio.pause();
    } else {
        that.audio.play();
    }

}

//Draws the new scv portrait based on cost
UI.prototype.drawSCVImage = function(theInt) {
    var scv_img = new Image();
    var that = this;
    scv_img.onload = function() {
        that.ctx.drawImage(scv_img, 60, 220);
    };
    theInt *= -1;
    scv_img.src = './img/buttons/scv_portrait' + theInt + '.png';
}

//Updates stats text box with most recent data
UI.prototype.updateText = function() {
    var tempString = "Health: ";
    tempString += this.healthCur + " / " + this.healthMax + "\n";
    tempString += "Resources: " + this.resourcesTotal + "\n";
    tempString += "Level: " + this.curLevel + "\n";
    tempString += "Wave: " + (this.wavesC + 1) + "\n";
    tempString += "Enemies Killed: " + this.enemiesKilled + "\n";
    tempString += "Time: " + this.time + "\n";
    tempString += "Next Wave: " + this.waveTime + "\n";
    this.textBox.value = tempString;
}

//Takes health away from current health pool
UI.prototype.dmg = function(amount) {
    this.healthCur -= amount;
    if (this.healthCur <= 0) {
        //Game over screen
        this.healthCur = 0;
        this.updateText;
        this.gameOverScreen();
    }
    this.updateText();
}

UI.prototype.gameOverScreen = function() {
    this.canvas = document.getElementById("gameOverlayScreen");
    this.ctx = this.canvas.getContext("2d");
    var gameOverImg = new Image();
    var that = this;
    gameOverImg.onload = function() {
        that.ctx.drawImage(gameOverImg, 40, 50);
    };
    gameOverImg.src = './img/ui/gameOver.png';
    this.gameEngine.pause(true);
}

//Adjust resource + or -
UI.prototype.resourceAdjust = function(amount) {
    this.resourcesTotal += Math.floor(amount);
    this.updateText();
}

//Adjust waves Cleared
UI.prototype.wavesAdjust = function(amount) {
    this.wavesC += amount;
    this.updateText();
}

//Adjust enemies Killed
UI.prototype.enemiesKilledAdjust = function(amount) {
    this.enemiesKilled += amount;
    this.updateText();
}

//Adjust level
UI.prototype.adjustLevel = function(amount) {
    this.curLevel += amount;
    this.updateText();
}

//Reset this to init values from initial new Stat() call
UI.prototype.reset = function() {
    this.healthCur = this.inithealthCur;
    this.healthMax = this.inithealthMax;
    this.resourcesTotal = this.initresourcesTotal;
    this.curLevel = this.initcurLevel;
    this.wavesC = this.initwavesC;
    this.enemiesKilled = this.initenemiesKilled;
    this.time = this.inittime;
    this.updateText();
}

//Updates time using gameEngine and formats in a user friendly time
UI.prototype.updateTime = function(value) {
    var that = this;
    var timeString = parseFloat(value).toFixed(2);
    var timeString = Math.floor(timeString);
    this.timeReal = timeString;
    if (timeString < 10) { //seconds format < 10
        timeString = "00:0" + timeString;
        this.time = timeString;
    } else if (timeString < 60) { //seconds format
        timeString = "00:" + timeString;
        this.time = timeString;
    } else { //Minutes:Seconds format
        minutes = Math.floor(timeString / 60);
        seconds = Math.floor(timeString % 60);
        if (seconds < 10) {
            timeString = minutes + ":0" + seconds;
        } else {
            timeString = minutes + ":" + seconds;
        }
        this.time = timeString;
    }
    this.updateText();
}

//Updates time before next wave using wave.js
UI.prototype.waveTimeGet = function(theTime) {
    var tempTime = Math.floor(theTime);
    this.waveTime = "00:0" + tempTime;
    this.updateText();
}

//Makes any element unselectable - disables highlighting
function makeUnselectable(elem) {
    if (typeof(elem) == 'string')
        elem = document.getElementById(elem);
    if (elem) {
        elem.onselectstart = function() {
            return false;
        };
        elem.style.MozUserSelect = "none";
        elem.style.KhtmlUserSelect = "none";
        elem.unselectable = "on";
    }
}

//Generates game info in box
function generateGameInfo() {
    this.gameInfoBox = document.getElementById("gameInfo");
    makeUnselectable(this.gameInfoBox);
    this.gameInfoBox.addEventListener('mousedown', function(e) {
        e.preventDefault();
    }, false);
    this.gameInfoBox.value = "Star Defender\n" +
        "*************************\n" +
        "Keybinds:\n" +
        "----\n" +
        "(A) Marine\n    (Low DMG)\n    (Fast RoF)\n" +
        "(S) Ghost\n    (Medium DMG)\n    (Medium RoF)\n" +
        "(D) Battlecruiser\n    (High DMG)\n    (Low RoF)\n" +
        "(W) Anti Air Structure\n    (High DMG)\n    (Medium RoF)\n" +
        "(F) Spawn SCV\n    (Generates Resources)\n" +
        "----\n" +
        "(M) Music (On/Off)\n" +
        "(P) Pause/Resume Game\n";
}
