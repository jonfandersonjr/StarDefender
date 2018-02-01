var unitType = ["zergling", "mutalisk", "queen"];

function Wave(generator, game) {
    this.doc = document.getElementById("gameWorld");
    this.generator = generator;
    this.game = game;
    this.unitName = unitType[0];
    this.delay = 1;
    this.count = 0;
    this.next = 0;
    this.unitAmount = 5;
}

Wave.prototype.constructor = Wave;

Wave.prototype.createWave = function () {

    if (this.delay <= 0) {
        this.generator.createEnemy(this.unitName);
        this.count++;
        this.delay = 0.5;
    }

}

Wave.prototype.update = function () {
    if (this.count < this.unitAmount) {
        this.delay -= this.game.clockTick;
    } else {
        this.count = 0;
        this.next++;
        if (this.next >= unitType.length) {
            this.next = 0;
        }
        this.unitName = unitType[this.next];
    }



}


