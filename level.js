function Level(level, waveObject) {
    this.canvas = document.getElementById("gameWorld");
    this.level = level;
    this.wave = waveObject;
    this.wave.setLevel(this);
    this.isDone = false;
    this.makeLevel(level);
}

Level.prototype.constructor = Level;

Level.prototype.makeLevel = function (levelNumber) {
    if (levelNumber === "level_1") {
        this.createLevel_1();
    }
}

Level.prototype.createLevel_1 = function () {
    this.wave.setLevel(this);
    this.wave.setWave("zergling", 5);


};


Level.prototype.isDone = function () {
    return this.isDone;
}
