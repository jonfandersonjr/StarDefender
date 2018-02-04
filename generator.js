function Generator(engine, map, assetManager) {
    this.doc = document.getElementById("gameWorld");
    this.gameEngine = engine;
    this.map = map;
    this.AM = assetManager;
}

//Creates enemy of specified type at beginning of given map
Generator.prototype.createEnemyFirstEntry = function(enemyName, speedBuff, healthBuff) {
    this.gameEngine.addUnit(new GroundUnit(this.gameEngine, enemyName, this.map.firstEntry, this.map, this.AM, 1, speedBuff, healthBuff));
}

Generator.prototype.createEnemySecondEntry = function (enemyName, speedBuff, healthBuff) {
    this.gameEngine.addUnit(new GroundUnit(this.gameEngine, enemyName, this.map.secondEntry, this.map, this.AM, 1, speedBuff, healthBuff));
}

//Creates defender of given type at a location specified by the mouse
Generator.prototype.createDefender = function(defenderName, x, y) {
    this.gameEngine.addDefender(new Defender(this.gameEngine, defenderName, x, y, this.map, this.AM));
}

//Creates an SCV at the base location.
Generator.prototype.createSCV = function () {
    this.gameEngine.addSCV(new SCV(this.gameEngine, this.map, this.AM));
}
