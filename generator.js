// JavaScript source code

// JavaScript source code

function Generator(engine, map, assetManager) {
    this.doc = document.getElementById("gameWorld");
    this.gameEngine = engine;
    this.map = map;
    this.AM = assetManager;
}

Generator.prototype.createEnemy = function (enemyName) {
    this.gameEngine.addEntity(new GroundUnit(this.gameEngine, enemyName, this.map.dIni, this.map, this.AM));
}

Generator.prototype.createDefender = function (defenderName, x, y) {
    this.gameEngine.addEntity(new Defender(this.gameEngine, defenderName, x, y, this.map, this.AM));
}





