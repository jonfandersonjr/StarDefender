var defenderList = ["marine"];
var isBusy = false;

function Mouse(map, ctx) {
    this.canvas = document.getElementById("gameWorld");
    this.ctx = ctx;
    //access to other canvas
    this.map = map;
    this.generator = null;
    this.defenderName = null;
    this.attachListeners();
}

Mouse.prototype.setGenerator = function(mainGenerator) {
    this.generator = mainGenerator;
}

Mouse.prototype.selectDefender = function(defenderName) {
    isBusy = true;
    this.defenderName = defenderName;
    console.log("Defender " + defenderName + " Selected!");
};

Mouse.prototype.notifyMouse = function(event) {
    if (isBusy) {
        return;
    } else {
        isBusy = true;
        this.loadDefender("marine", event);
    }
};

Mouse.prototype.dropTower = function(e) {
    //
    if (isBusy) {

        isBusy = false;
        //drop tower
    }
};

Mouse.prototype.loadDefender = function(defenderType, event) {
    var mouseLoc = getMousePos(this.canvas, event);
    this.generator.createDefender(defenderType, mouseLoc.x, mouseLoc.y);
    //console.log("this x = " + location[x] + " and this y = " + location[y]);
};

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

<<<<<<< HEAD
Mouse.prototype.attachListeners = function () {
=======


Mouse.prototype.attachListeners = function() {
>>>>>>> fe4f2ab8aa84582c9784f2c54079b4a9a350587a

    console.log('Starting input');

    var that = this;

    // Mouse events
    this.ctx.canvas.addEventListener("mousedown", function(e) {
        that.notifyMouse(e);
    }, false);

    this.ctx.canvas.addEventListener("mouseup", function(e) {
        that.dropTower(e);
    }, false);

    this.ctx.canvas.addEventListener("mousemove", function(e) {

    }, false);

    // Key events
    this.ctx.canvas.addEventListener("keydown", function(e) {
        console.log(e);
        console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    this.ctx.canvas.addEventListener("keyup", function(e) {

    }, false);

    this.ctx.canvas.addEventListener("keypress", function(e) {
        if (e.code === "KeyD") that.d = true;
        that.chars[e.code] = true;
        console.log(e);
        console.log("Key Pressed Event - Char " + e.charCode + " Code " + e.keyCode);
    }, false);

    // Optional events
    this.ctx.canvas.addEventListener("contextmenu", function(e) {
        that.click = getXandY(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("mousewheel", function(e) {
        console.log(e);
    }, false);

    console.log('Input started');

}

//Send in mouse class to game engine
//Modify stuff in game engine
//this.mouse.