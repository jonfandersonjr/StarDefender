/*
Constructor
buttonCanvas - canvas that has defence structure uiButtons
textCanvas - textArea that holds this
*/
function UI(mouse, startHealth, maxHealth,
    startRes, startLevel, wavesCleared, enemiesK) {
    this.canvas = document.getElementById("uiButtons");
    this.ctx = this.canvas.getContext("2d");

    //Text box - prevents highlighting
    this.textBox = document.getElementById("uiText");
    makeUnselectable(this.textBox);
    this.mouse = mouse;
    this.textBox.addEventListener('mousedown', function(e) {
        e.preventDefault();
    }, false);

    //Game info text panel
    generateGameInfo();

    /*//Load UI Image on image canvas
  var imageObj = new Image();
  imageObj.src = './img/ui/defenseUIButtons.png';
	imageObj.onload = function () {
		ctx.drawImage(imageObj, 0, 0);
	};
  console.log("UI Image Loaded!");*/

    //Button generator array
    const buttons = [{
            x: 0,
            y: 150,
            width: 100,
            height: 100,
            color: 'rgb(255,0,0)',
            id: 'marine'
        },
        {
            x: 140,
            y: 150,
            width: 100,
            height: 100,
            color: 'rgb(255,150,0)',
            id: 'battlecruiser'
        },
        {
            x: 0,
            y: 270,
            width: 100,
            height: 100,
            color: 'rgb(255,200,0)',
            id: '3'
        },
        {
            x: 140,
            y: 270,
            width: 100,
            height: 100,
            color: 'rgb(255,250,0)',
            id: '4'
        }
    ];

    //Draw buttons
    buttons.forEach(button => {
        this.ctx.beginPath();
        this.ctx.rect(button.x, button.y, button.width, button.height);
        this.ctx.fillStyle = button.color;
        this.ctx.fill();
    });

    //Returns true if mouse pointer is on button
    function isIntersect(mp, button) {
        if (mp.x >= button.x && mp.x <= button.x + button.width &&
            mp.y >= button.y && mp.y <= button.y + button.height) {
            return true;
        } else {
            return false;
        }
    };

    //gets relative mouse position based on canvas
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    //Add mouse click listener which gets mouse point and compares to each button area
    this.canvas.addEventListener('click', (e) => {
        var mousePos = getMousePos(this.canvas, e);
        buttons.forEach(theButton => {
            if (isIntersect(mousePos, theButton)) {
                mouse.selectDefender(theButton.id);
            }
        });
    });


    //init values
    this.inithealthCur = startHealth;
    this.inithealthMax = maxHealth;
    this.initresourcesTotal = startRes;
    this.initcurLevel = startLevel;
    this.initwavesC = wavesCleared;
    this.initenemiesKilled = enemiesK;

    this.healthCur = startHealth;
    this.healthMax = maxHealth;
    this.resourcesTotal = startRes;
    this.curLevel = startLevel;
    this.wavesC = wavesCleared;
    this.enemiesKilled = enemiesK;

    this.time = "00:00";

    //Load Default Text
    this.updateText();
    console.log("Default stats text loaded!");
};

UI.prototype.updateText = function() {
    var tempString = "Health: ";
    tempString += this.healthCur + " / " + this.healthMax + "\n";
    tempString += "Resources: " + this.resourcesTotal + "\n";
    tempString += "Level: " + this.curLevel + "\n";
    tempString += "Waves Cleared: " + this.wavesC + "\n";
    tempString += "Enemies Killed: " + this.enemiesKilled + "\n";
    tempString += "Time: " + this.time + "\n";
    this.textBox.value = tempString;
}

//Takes health away from current health pool
UI.prototype.dmg = function(amount) {
    this.healthCur -= amount;
    this.updateText();
}

//Adjust resource + or -
UI.prototype.resourceAdjust = function(amount) {
    this.resourcesTotal += amount;
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

UI.prototype.updateTime = function(value) {
    var timeString = parseFloat(value).toFixed(2);
    var timeString = Math.floor(timeString);

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
    this.gameInfoBox.value = "Star Defender\nGame Description Info";
}