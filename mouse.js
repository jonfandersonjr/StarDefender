var defenderList = ["marine", "battlecruiser", "ghost", "antiair"];
var tileSize = 31;
var costs = {
    marine: 50,
    battlecruiser: 150,
    ghost: 150,
    antiair: 100
};

function Mouse(map, ctx) {
    this.musicOn = true;
    this.radiusOfFire = {
        radius: 30,
        color: 'rgba(0,0,0, .9)', //white 30%
        thick: 2
    };
    this.resources = {
        marine: -50,
        ghost: -100,
        battlecruiser: -150,
        scv: -25,
        antiair: -100
    };
    this.canvas = document.getElementById("gameWorld");
    this.ctx = ctx;
    //access to other canvas
    this.map = map;
    this.generator = null;
    this.gameEngine = null;
    this.defenderName = null;
    this.attachListeners();
    this.isBusy = false;
    this.canAddLevel = true;
    this.isMoving = false;
    this.pickedUpDefender = false;
    //Layer 2 canvas for drawing mouse move
    this.canvas2 = document.getElementById("gameWorld2");
    this.ctx2 = this.canvas2.getContext("2d");
    this.drawOffset = true;
}

Mouse.prototype.init = function(gameEngine) {
    this.gameEngine = gameEngine;
    this.tileBox = new TileBox(this.gameEngine, this.canvas, this.ctx, this.map, this.isBusy);
    this.gameEngine.tileBox = this.tileBox;
}

Mouse.prototype.setGenerator = function(mainGenerator) {
    this.generator = mainGenerator;
}

Mouse.prototype.setMap = function(gameMap) {
    this.map = gameMap;
}

//Setter for cleanliness, handles if mouse can choose a new level.
Mouse.prototype.levelCompleted = function() {
    this.canAddLevel = true;
}

//Sets up game engine to start level_levelNum
Mouse.prototype.createLevel = function(levelNum) {
    this.gameEngine.addNewLevel = true;
    this.gameEngine.levelNum = levelNum;
    this.canAddLevel = false;
}

//Function that is called via button in ui.js
Mouse.prototype.selectDefender = function(defenderName) {
    if (defenderName === "scv") {
        if (this.ui.resourcesTotal >= 25) {
            this.generator.createSCV();
            this.ui.resourceAdjust(-25);
            PlaySound("./soundfx/scv.wav");
            console.log("Generating SCV");
        } else {
            alert("Not enough resources!");
        }
    } else {
        this.isBusy = true; //makes mouse unable to select other defenders, one time drop
        this.tileBox.isBusy = this.isBusy;
        this.defenderName = defenderName;
        console.log("Defender " + this.defenderName + " Selected!");
    }

};

Mouse.prototype.dropTower = function(e) {
    var that = this;
    //Drop tower if something was selected from buttons isBusy = true

    //Drop only if enough resources
    var costOfDrop = 0;
    let defenderKey = null;
    switch (this.defenderName) {
        case "marine":
            costOfDrop = 50;
            defenderKey = 'a';
            break;
        case "ghost":
            costOfDrop = 100;
            defenderKey = 's';
            break;
        case "battlecruiser":
            costOfDrop = 150;
            defenderKey = 'd';
            break;
        case "antiair":
            costOfDrop = 100;
            defenderKey = 'w';
            break;
        default:
            break;
    }

    if (this.isBusy && (this.ui.resourcesTotal >= costOfDrop || this.isMoving)) {
        //drop tower on location
        console.log("Dropping tower");
        let mouseLoc = getMousePos(this.canvas, event);
        let tileLoc = getTile(mouseLoc, this.map);
        if (isValid(this.map, tileLoc.row, tileLoc.col)) {
            this.generator.createDefender(this.defenderName, tileLoc.row, tileLoc.col);
            this.map.map[tileLoc.row][tileLoc.col] = defenderKey;
            this.isBusy = false; //set isBusy to false so that they can press a button and place another tower
            this.tileBox.isBusy = this.isBusy;
            //Update Resources in UI
            if (!this.isMoving) {
                switch (this.defenderName) {
                case "marine":
                    that.ui.resourceAdjust(that.resources.marine);
                    PlaySound("./soundfx/marine.wav");
                    break;
                case "ghost":
                    that.ui.resourceAdjust(that.resources.ghost);
                    PlaySound("./soundfx/ghost.wav");
                    break;
                case "battlecruiser":
                    that.ui.resourceAdjust(that.resources.battlecruiser);
                    PlaySound("./soundfx/battlecruiser.wav");
                    break;
                case "antiair":
                    that.ui.resourceAdjust(that.resources.antiair);
                    PlaySound("./soundfx/antiair.wav");
                    break;
                default:
                    break;
                }
            }
            
            this.isMoving = false;
            
        }
    } else {
        alert("Not enough resources!");
    }
};

/*
Gets Mouse position*/
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

Mouse.prototype.attachListeners = function() {
    var that = this;

    // Mouse events

    //On mouse click, check if button was selected (isBusy = true), if so drop tower on click location
    that.canvas.addEventListener("click", (e) => {
        if (that.isBusy === true) {
            that.dropTower(e);
            that.ctx2.clearRect(0, 0, that.canvas2.width, that.canvas2.height);
        } else {
            //move unit
            let mouseLoc = getMousePos(this.canvas, event);
            let tileLoc = getTile(mouseLoc, this.map);
            if (isDefender(that.map.map[tileLoc.row][tileLoc.col])) {
                that.isMoving = true;
                that.isBusy = true;
                that.tileBox.isBusy = true;
                that.pickedUpDefender = that.gameEngine.findDefender(tileLoc.row, tileLoc.col);
                that.defenderName = that.pickedUpDefender.unit.name;
                that.map.map[tileLoc.row][tileLoc.col] = '+';
            }
        }
    }, false);

    //Mouseover square select
    that.canvas.addEventListener("mousemove", function(e) {
        that.tileBox.e = e;
    }, false);

    //Keypress binds
    this.canvas.addEventListener("keydown", function(e) {
        if (e.keyCode === 70) {
            console.log("Pressed F for SCV");
            that.selectDefender("scv");
        } else if (e.keyCode === 65) {
            console.log("Pressed A for Marine");
            that.selectDefender("marine");
        } else if (e.keyCode === 83) {
            console.log("Pressed S for Ghost");
            that.selectDefender("ghost");
        } else if (e.keyCode === 68) {
            console.log("Pressed D for Battlecruiser");
            that.selectDefender("battlecruiser");
        } else if (e.keyCode === 87) {
            console.log("Pressed W for Anti-Air");
            that.selectDefender("antiair");
        } else if (e.keyCode === 32) {
            console.log("Pressed Space");
            if (that.canAddLevel) {
                that.createLevel(1)
            }
        } else if (e.keyCode === 77) {
            if (that.musicOn) {
                that.ui.pauseMusic(true);
                that.musicOn = false;
                console.log("Music Paused");
            } else {
                that.ui.pauseMusic(false);
                that.musicOn = true;
                console.log("Music Started");
            }


        }
    }, false);

    //Mouse Wheel
    this.canvas.addEventListener("mousewheel", function(e) {
        e.preventDefault();
        if (that.canAddLevel) {
            //creates level_2
            that.createLevel(2)
        }
    }, false);

    console.log('Input started');

    this.canvas.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        console.log("right clicked");
    }, false);

    // Optional events

}

function isValid(map, row, column) {
    return map.map[row][column] === '+';
}

//Plays fx sounds
function PlaySound(path) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.play();
}

function TileBox(gameEngine, canvas, ctx, map, isBusy) {
    this.gameEngine = gameEngine;
    this.canvas = canvas;
    this.ctx = ctx;
    this.map = map;
    this.isBusy = isBusy;
}

TileBox.prototype.update = function() {
    if (this.e != null) {
        this.mouseLoc = getMousePos(this.canvas, this.e);
        this.tileLoc = getTile(this.mouseLoc, this.map);
        this.x = this.tileLoc.col * this.map.tileSize;
        this.y = this.tileLoc.row * this.map.tileSize;
    }
}

TileBox.prototype.draw = function() {
    if (this.mouseLoc != null && this.mouseLoc.x > 0 &&
        this.mouseLoc.x < this.map.tileSize * this.map.mapDim.row &&
        this.mouseLoc.y < this.map.tileSize * this.map.mapDim.col &&
        this.isBusy) {
        if (isValid(this.map, this.tileLoc.row, this.tileLoc.col)) {
            this.ctx.strokeStyle = 'rgb(0, 255, 38)';
        } else {
            this.ctx.strokeStyle = 'rgb(255, 0, 12)';
        }

        this.ctx.strokeRect(this.x, this.y, this.map.tileSize, this.map.tileSize);
    }
}

function isDefender(mapKey) {
    return mapKey === 'a' || mapKey === 's' || mapKey === 'd' || mapKey === 'w';
}


//Incomplete function. Will be expanded later.
function copyDefender(defender) {
    
}

function getTile(mouseLoc, map) {
    return {
        col: Math.floor(mouseLoc.x / map.tileSize),
        row: Math.floor(mouseLoc.y / map.tileSize)
    }
}
/* Attach UI for calling updates*/
Mouse.prototype.attachUI = function(ui) {
    this.ui = ui;
}