var defenderList = ["marine", "battlecruiser", "ghost"]
var tileSize = 31;

function Mouse(map, ctx) {
    this.radiusOfFire = {
        radius: 30,
        color: 'rgba(0,0,0, .9)', //white 30%
        thick: 2
    };
    this.canvas = document.getElementById("gameWorld");
    this.ctx = ctx;
    //access to other canvas
    this.map = map;
    this.generator = null;
    this.defenderName = null;
    this.attachListeners();
    this.isBusy = false;
    
    //Layer 2 canvas for drawing mouse move
    this.canvas2 = document.getElementById("gameWorld2");
    this.ctx2 = this.canvas2.getContext("2d");
    this.drawOffset = true;
}

Mouse.prototype.init = function(gameEngine) {
    this.gameEngine = gameEngine;
    this.tileBox = new TileBox(this.gameEngine, this.canvas, this.ctx, this.map);
    this.gameEngine.tileBox = this.tileBox;
}

Mouse.prototype.setGenerator = function(mainGenerator) {
    this.generator = mainGenerator;
}

Mouse.prototype.setMap = function(gameMap) {
    this.map = gameMap;
}

//Function that is called via button in ui.js
Mouse.prototype.selectDefender = function(defenderName) {
    this.isBusy = true; //makes mouse unable to select other defenders, one time drop
    this.defenderName = defenderName;
    console.log("Defender " + this.defenderName + " Selected!");
    console.log("isBusy:" + this.isBusy);
};


Mouse.prototype.dropTower = function(e) {
    var that = this;
    //Drop tower if something was selected from buttons isBusy = true
    if (this.isBusy) {
        //drop tower on location
        console.log("Dropping tower");
        var mouseLoc = getMousePos(this.canvas, event);
        let tileLoc = getTile(mouseLoc, this.map);
        if (isValid(this.map, tileLoc.row, tileLoc.col)) {
            this.generator.createDefender(this.defenderName, tileLoc.row, tileLoc.col);
            this.isBusy = false; //set isBusy to false so that they can press a button and place another tower
        }

        //Draw radius of fire
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

    // Key events
    /*
    this.canvas.addEventListener("keydown", function(e) {
        console.log(e);
        console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    this.canvas.addEventListener("keyup", function(e) {

    }, false);

    this.canvas.addEventListener("keypress", function(e) {
        if (e.code === "KeyD") that.d = true;
        that.chars[e.code] = true;
        console.log(e);
        console.log("Key Pressed Event - Char " + e.charCode + " Code " + e.keyCode);
    }, false);

    // Optional events
    this.canvas.addEventListener("contextmenu", function(e) {
        that.click = getXandY(e);
        e.preventDefault();
    }, false);

    this.canvas.addEventListener("mousewheel", function(e) {
        console.log(e);
    }, false);

    console.log('Input started');
*/
}

function isValid(map, row, col) {
    if(map.map[row][col] === '+') {
        return true;
    } else {
        return false;
    }
}

function TileBox (gameEngine, canvas, ctx, map) {
    this.gameEngine = gameEngine;
    this.canvas = canvas;
    this.ctx = ctx;
    this.map = map;
}

TileBox.prototype.update = function () {
    if (this.e != null){
        this.mouseLoc = getMousePos(this.canvas, this.e);
        this.tileLoc = getTile(this.mouseLoc, this.map);
        this.x =  this.tileLoc.col * this.map.tileSize;
        this.y =  this.tileLoc.row * this.map.tileSize;
    }
}

TileBox.prototype.draw = function () {
    if(this.mouseLoc != null && this.mouseLoc.x > 0
        && this.mouseLoc.x < this.map.tileSize * this.map.mapDim.row
        && this.mouseLoc.y < this.map.tileSize * this.map.mapDim.col){
        if (isValid(this.map, this.tileLoc.row, this.tileLoc.col)){
            this.ctx.strokeStyle = 'rgb(0, 255, 38)';
        } else {
            this.ctx.strokeStyle = 'rgb(255, 0, 12)';
        }
        
        this.ctx.strokeRect(this.x, this.y, this.map.tileSize, this.map.tileSize);
    }
}

function getTile(mouseLoc, map) {
    return {col: Math.floor(mouseLoc.x / map.tileSize), row: Math.floor(mouseLoc.y / map.tileSize)}
} 