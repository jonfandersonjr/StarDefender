function Generator(engine, map, assetManager, ui) {
    this.doc = document.getElementById("gameWorld");
    this.gameEngine = engine;
    this.map = map;
    this.AM = assetManager;
    this.UI = ui;
}

//Creates enemy of specified type at beginning of given map
Generator.prototype.createEnemyFirstEntry = function(enemyName, speedBuff, healthBuff) {
    this.gameEngine.addUnit(new GroundUnit(this.gameEngine, enemyName, this.map.firstEntry, this.map, this.AM, speedBuff, healthBuff));
}

Generator.prototype.createEnemySecondEntry = function (enemyName, speedBuff, healthBuff) {
    this.gameEngine.addUnit(new GroundUnit(this.gameEngine, enemyName, this.map.secondEntry, this.map, this.AM, speedBuff, healthBuff));
}

//Creates defender of given type at a location specified by the mouse
Generator.prototype.createDefender = function(defenderName, row, column) {
    this.gameEngine.addDefender(new Defender(this.gameEngine, defenderName, row, column, this.map, this.AM, false));
}

Generator.prototype.createDummyDefender = function(defenderName, row, column) {
    let defender = new Defender(this.gameEngine, defenderName, row, column, this.map, this.AM, true);
    this.gameEngine.addDefender(defender);
    return defender;
}

//Creates an SCV at the base location.
Generator.prototype.createSCV = function () {
    this.gameEngine.addSCV(new SCV(this.gameEngine, this.map, this.AM, this.UI));
}
