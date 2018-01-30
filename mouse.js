var defenderList = ["marine", "battlecruiser", "ghost"]

function Mouse(map, ctx) {
    this.selectSquare = {
        width: 25,
        height: 25,
        color: 'rgba(255, 204, 0, .1)' //Yellow 20% transparent
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
        if (this.defenderName === "marine" || this.defenderName === "ghost") {
            this.generator.createDefender(this.defenderName, mouseLoc.x, mouseLoc.y);
        } else {
            this.generator.createDefender(this.defenderName, mouseLoc.x + 15, mouseLoc.y + 15);
        }

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
    that.canvas.addEventListener("click", (e) => {
        if (that.isBusy === true) {
            that.dropTower(e);
            that.ctx2.clearRect(0, 0, that.canvas2.width, that.canvas2.height);
        } else {
            return;
        }
    }, false);


    that.canvas.addEventListener("mousemove", function(e) {
        that.ctx2.clearRect(0, 0, that.canvas2.width, that.canvas2.height);
        if (that.isBusy) {
            console.log("Drawing image on mouse pointer.");
            var mousePos = getMousePos(that.canvas2, e);
            that.ctx2.beginPath();
            that.ctx2.rect(mousePos.x - 15, mousePos.y - 5, that.selectSquare.width,
                that.selectSquare.height);
            that.ctx2.fillStyle = that.selectSquare.color;
            that.ctx2.fill();
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