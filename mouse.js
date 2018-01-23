var defenderList = ["marine"];
var isBusy = false;

function Mouse(mapSize) {
    this.doc = document.getElementById("gameWorld");
    //access to other canvas
    this.mapSize = mapSize;
    this.generator = null;
}

Mouse.prototype.setGenerator = function (mainGenerator) {
    this.generator = mainGenerator;
}

Mouse.prototype.selectDefender = function (defenderName) {

};

Mouse.prototype.notifyMouse = function (event) {
    if (isBusy) {
        return;
    }
    else {
        isBusy = true;
        this.loadDefender("marine", event);
    }
};

Mouse.prototype.followMouse = function (event) {

}

Mouse.prototype.dropTower = function (e) {
    //
    if (isBusy) {

        isBusy = false;
        //drop tower
    }
};

Mouse.prototype.loadDefender = function (defenderType, event) {
    this.generator.createDefender(defenderType, event.clientX, event.clientY);
    //console.log("this x = " + location[x] + " and this y = " + location[y]);
};

Mouse.prototype.calcLocation = function (e) {
    var that = this;
    var getXandY = function (e) {
        var x = e.clientX - this.doc.getBoundingClientRect().left;
        var y = e.clientY - this.doc.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }

        return { x: x, y: y };
    }
    console.log("Left Click Event - X, Y " + e.clientX + ", " + e.clientY);
};



//Send in mouse class to game engine
//Modify stuff in game engine
//this.mouse.
