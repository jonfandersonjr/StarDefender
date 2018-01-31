var AM = new AssetManager();

var directions = ["east", "west", "north", "south", "ne", "nw", "se", "sw", "death"];

//load defender sprites
var defenderAction = ["stand", "shoot", "projectile"]
var defenderList = ["marine", "battlecruiser", "ghost"];
for (let i = 0; i < defenderList.length; i++) {
    for (let j = 0; j < defenderAction.length; j++) {
        AM.queueDownload(`./img/${defenderList[i]}/${defenderList[i]}_${defenderAction[j]}.png`);
    }
}

//load enemy sprites
var unitList = ["mutalisk", "queen", "zergling","ultralisk","hydralisk","defiler"];
for (let i = 0; i < unitList.length; i++) {
    for (let j = 0; j < directions.length; j++) {
        AM.queueDownload(`./img/${unitList[i]}/${unitList[i]}_${directions[j]}.png`);
    }
}

//load tiles
AM.queueDownload("./tiles/dirt.png");
AM.queueDownload("./tiles/grass.png");
AM.queueDownload("./tiles/base.png")

AM.downloadAll(function() {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

//    var map = new Map(map_1);
    var map = new Map(map_2);

    var myMouse = new Mouse(map, ctx)

    //UI Load
    canvas.style.outlineColor = "#000000"; //prevent highlighting
    this.ui = new UI(myMouse, 100, 100, 100, 1, 0, 0);
    console.log("UI Loaded!");

    var gameEngine = new GameEngine(myMouse, this.ui);


    //This generator will allow us to easily create enemies or towers and not just in main when the code first loads
    this.generator = new Generator(gameEngine, map, AM);
    myMouse.setGenerator(this.generator);

    //Game Engine Start
    gameEngine.init(ctx);
    gameEngine.start();

    //Map Load
    map.createMap(gameEngine, AM);
    console.log("Map Loaded!");

    //Load in entities for prototype
    this.generator.createEnemy("hydralisk");
    this.generator.createEnemy("mutalisk");
    this.generator.createEnemy("queen"); 
    this.generator.createEnemy("zergling");
    this.generator.createEnemy("ultralisk");
    this.generator.createEnemy("defiler");

    this.wave = new Wave(this.generator);
    this.wave.createWave("zergling", 5);

    console.log("Enemies Loaded!");
});
