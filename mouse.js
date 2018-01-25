var defenderList = ["marine"];
this.isBusy = false;

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
    this.isBusy = true;
    this.defenderName = defenderName;
    console.log("Defender " + defenderName + " Selected!");
    console.log("isBusy:" + this.isBusy);
};

Mouse.prototype.notifyMouse = function(event) {
    if (this.isBusy) {
        return;
    } else {
        this.isBusy = true;
        this.loadDefender("marine", event);
    }
};

Mouse.prototype.dropTower = function(e) {
    //
    if (isBusy) {
        isBusy = false;
        //drop tower on location code here
    }
};

Mouse.prototype.loadDefender = function(defenderType, event) {
    var mouseLoc = getMousePos(this.canvas, event);
    this.generator.createDefender(defenderType, mouseLoc.x, mouseLoc.y);
};

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

Mouse.prototype.attachListeners = function() {

    console.log('Starting input');

    var that = this;

    // Mouse events
    /*this.ctx.canvas.addEventListener("mousedown", function(e) {
        that.notifyMouse(e);
    }, false);

    this.ctx.canvas.addEventListener("mouseup", function(e) {
        that.dropTower(e);
    }, false);*/

    this.ctx.canvas.addEventListener("click", (e) => {

    })

    this.ctx.canvas.addEventListener("mousemove", function(e) {
        //as mouse moves if busy draw image on mouse moves
        //if defender is selected

        if (this.isBusy) {
            console.log("Drawing image on mouse pointer");
            var img = new Image();
            img.src = `./img/${this.defenderName}/${this.defenderName}.png`;
            e = e || window.event;
            var tag = document.createElement('img');
            console.log(e);
            tag.src = img.src;
            tag.style.position = 'absolute';
            tag.style.height = '50px';
            tag.style.width = '50px';
            tag.style.top = (e.pageY || e.clientY) + 'px';
            tag.style.left = (e.pageX || e.clientX) + 'px';
            this.body.appendChild(tag);
        }
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