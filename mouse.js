// JavaScript source code

var isBusy = false;

function Mouse(mapSize) {
    this.doc = document.getElementById("gameWorld");
    this.mapSize = mapSize;
}


Mouse.prototype.selectDefender = function(defenderName) {
    this.animation = new Animation()
}

Mouse.prototype.dropTower = function () {
    //
    if (isBusy) {
        //drop tower
    }
}

Mouse.prototype.loadDefender = function (location) {
    //this.x = location.x;
    //this.y = location.y;
    //console.log("Testing location: " + location);
    console.log("in load defender");
    //console.log("this x = " + location[x] + " and this y = " + location[y]);
}

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
}



//Send in mouse class to game engine
//Modify stuff in game engine
//this.mouse.
