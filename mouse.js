var defenderList = ["marine", "battlecruiser", "ghost", "antiair"];
var tileSize = 31;
var costs = {
    marine: 50,
    battlecruiser: 150,
    ghost: 150,
    antiair: 100
};

function Mouse(map, ctx) {
    this.radiusOfFire = {
        radius: 30,
        color: 'rgba(0,0,0, .9)', //white 30%
        thick: 2
    };
    this.resources = {
        marine: -50,
        ghost: -100,
        battlecruiser: -150
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
    this.isBusy = true; //makes mouse unable to select other defenders, one time drop
    this.tileBox.isBusy = this.isBusy;
    this.defenderName = defenderName;
    console.log("Defender " + this.defenderName + " Selected!");
};

Mouse.prototype.dropTower = function(e) {
    var that = this;
    //Drop tower if something was selected from buttons isBusy = true

    //Drop only if enough resources
    var costOfDrop = 0;
    var okToDrop = false;
    switch (this.defenderName) {
        case "marine":
            costOfDrop = 50;
            break;
        case "ghost":
            costOfDrop = 150;
            break;
        case "battlecruiser":
            costOfDrop = 150;
            break;
        case "antiair":
            costOfDrop = 100;
            break;
        default:
            break;
    }
    if (this.ui.resourcesTotal >= costOfDrop) {
        okToDrop = true;
    } else {
        alert("Not enough resources!");
    }

    if (this.isBusy && okToDrop) {
        //drop tower on location
        console.log("Dropping tower");
        var mouseLoc = getMousePos(this.canvas, event);
        let tileLoc = getTile(mouseLoc, this.map);
        if (isValid(this.map, tileLoc.row, tileLoc.col)) {
            this.generator.createDefender(this.defenderName, tileLoc.row, tileLoc.col);
            this.isBusy = false; //set isBusy to false so that they can press a button and place another tower
            this.tileBox.isBusy = this.isBusy;
            //Update Resources in UI
            switch (this.defenderName) {
                case "marine":
                    that.ui.resourceAdjust(that.resources.marine);
                    break;
                case "ghost":
                    that.ui.resourceAdjust(that.resources.ghost);
                    break;
                case "battlecruiser":
                    that.ui.resourceAdjust(that.resources.battlecruiser);
                    break;
            }
        }

        //Draw radius of fire - NOT WORKING
        that.ctx.beginPath();
        console.log("Mouse X: " + mouseLoc.x + " Mouse y: " + mouseLoc.y + " radius:" +
            that.radiusOfFire.radius);
        that.ctx.arc(mouseLoc.x, mouseLoc.y, that.radiusOfFire.radius, 0, 2 * Math.PI, false);
        that.ctx.lineWidth = that.radiusOfFire.thick;
        that.ctx.strokeStyle = that.radiusOfFire.color;
        that.ctx.stroke();
    } else {
        return;
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
            return;
        }
    }, false);


    that.canvas.addEventListener("mousemove", function(e) {
        that.tileBox.e = e;
    }, false);

    this.canvas.addEventListener("keypress", function(e) {
        e.preventDefault();
        if (e.code === "Space") {
            console.log("pressed space");
            if (that.canAddLevel) {
                that.createLevel(1)
            }
        }
    }, false);



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

    this.canvas.addEventListener("keypress", function(e) {
        if (e.code === "KeyS") {
            console.log("pressed s for scv");
            that.d = true;
            that.generator.createSCV();
        }
    }, false);

    // Optional events

}

function isValid(map, row, col) {
    if (map.map[row][col] === '+') {
        return true;
    } else {
        return false;
    }
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