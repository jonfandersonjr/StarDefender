window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function GameEngine(mouse, ui) {
    this.gameUI = ui;
    this.tileEntities = [];
    this.unitEntities = [];
    this.defenderEntities = [];
    this.projectileEntities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.mouse = mouse;
}

GameEngine.prototype.init = function(ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer(this.gameUI);
    this.startInput();
    console.log('game initialized');
}

GameEngine.prototype.start = function() {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function() {
    console.log('Starting input');

    var that = this;
    var thisMouse = this.mouse;

    var getXandY = function(e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }

        return {
            x: x,
            y: y
        };
    }
}

GameEngine.prototype.addTile = function(tileEntity) {
    this.tileEntities.push(tileEntity);
    console.log('Added tile entity!')
}

GameEngine.prototype.addUnit = function(unitEntity) {
    this.unitEntities.push(unitEntity);
    console.log('Added unit entity!');
}

GameEngine.prototype.addDefender = function(defenderEntity) {
    this.defenderEntities.push(defenderEntity);
    console.log('Added defender entity!')
}

GameEngine.prototype.addProjectile = function(projectileEntity) {
    this.projectileEntities.push(projectileEntity);
    console.log('Added projectile entity!')
}

GameEngine.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();

    for (let i = 0; i < this.tileEntities.length; i++) {
        this.tileEntities[i].draw(this.ctx);
    }

    for (let i = 0; i < this.unitEntities.length; i++) {
        this.unitEntities[i].draw(this.ctx);
    }

    for (let i = 0; i < this.defenderEntities.length; i++) {
        this.defenderEntities[i].draw(this.ctx);
    }

    for (let i = 0; i < this.projectileEntities.length; i++) {
        this.projectileEntities[i].draw(this.ctx);
    }

    this.ctx.restore();
}

GameEngine.prototype.update = function() {
    for (let i = 0; i < this.tileEntities.length; i++) {
        this.tileEntities[i].update();
    }

    for (let i = 0; i < this.unitEntities.length; i++) {
        let entity = this.unitEntities[i];
        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (let i = 0; i < this.defenderEntities.length; i++) {
        let entity = this.defenderEntities[i];
        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (let i = this.unitEntities.length - 1; i >= 0; --i) {
        if (this.unitEntities[i].removeFromWorld) {
            this.unitEntities.splice(i, 1);
        }
    }

    for (let i = this.defenderEntities.length - 1; i >= 0; --i) {
        if (this.defenderEntities[i].removeFromWorld) {
            this.defenderEntities.splice(i, 1);
        }
    }

    for (let i = this.projectileEntities.length - 1; i >= 0; --i) {
        if (this.projectileEntities[i].removeFromWorld) {
            this.projectileEntities.splice(i, 1);
        }
    }
    resize();
}

GameEngine.prototype.loop = function() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
}

function resize() {
    this.canvas = document.getElementById("gameWorld");
    if (canvas.height != window.innerHeight) {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
    }
}

function Timer(gameUI) {
    this.gameUI = gameUI;
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function() {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    this.gameUI.updateTime(this.gameTime);
    return gameDelta;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function() {}

Entity.prototype.draw = function(ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function(image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}