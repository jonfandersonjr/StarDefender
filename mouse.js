var defenderList = ["marine", "battlecruiser", "ghost"];

function Mouse(map, ctx) {
    this.canvas = document.getElementById("gameWorld");
    this.ctx = ctx;
    //access to other canvas
    this.map = map;
    this.generator = null;
    this.defenderName = null;
    this.attachListeners();
    this.isBusy = false;
}

Mouse.prototype.setGenerator = function(mainGenerator) {
    this.generator = mainGenerator;
}

//Function that is called via button in ui.js
Mouse.prototype.selectDefender = function(defenderName) {
    this.isBusy = true; //makes mouse unable to select other defenders, one time drop
    this.defenderName = defenderName;
    console.log("Defender " + this.defenderName + " Selected!");
    console.log("isBusy:" + this.isBusy);
};


Mouse.prototype.dropTower = function(e) {
    //Drop tower if something was selected from buttons isBusy = true
    if (this.isBusy) {
        //drop tower on location
        console.log("Dropping tower");
        var mouseLoc = getMousePos(this.canvas, event);
        this.generator.createDefender(this.defenderName, mouseLoc.x, mouseLoc.y);
        this.isBusy = false; //set isBusy to false so that they can press a button and place another tower
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
    this.canvas.addEventListener("click", (e) => {
        if (this.isBusy === true) {
            that.dropTower(e);
        } else {
            return;
        }
    }, false);


    this.canvas.addEventListener("mousemove", function(e) {
        //If button was select, isBusy = true, then draw image that follows mouse around canvas until not busy
        //this.canvasTwo = document.getElementById("gameWorldLayer2");
        //this.ctxTwo = this.canvasTwo.getContext("2d");
        //I am thinking we make a 2nd canvas, that sits on top of gameWorld canvasTwo
        //To draw the image to follow mouse and clear it repeatedly upon moving
        if (this.isBusy) {
            console.log("Drawing image on mouse pointer");

        }
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

//Send in mouse class to game engine
//Modify stuff in game engine
//this.mouse.
