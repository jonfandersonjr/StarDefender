var AM = new AssetManager();

var directions = ["east", "west", "north", "south", "ne", "nw", "se", "sw", "death"];

//load defender sprites
var defenderAction = ["stand", "shoot", "projectile"]
var defenderList = ["marine", "battlecruiser", "ghost", "antiair"];
for (let i = 0; i < defenderList.length; i++) {
    for (let j = 0; j < defenderAction.length; j++) {
        AM.queueDownload(`./img/${defenderList[i]}/${defenderList[i]}_${defenderAction[j]}.png`);
    }
}

//load enemy sprites
var unitList = ["mutalisk", "queen", "zergling", "ultralisk", "hydralisk", "defiler", "sarahkerrigan"];
for (let i = 0; i < unitList.length; i++) {
    for (let j = 0; j < directions.length; j++) {
        AM.queueDownload(`./img/${unitList[i]}/${unitList[i]}_${directions[j]}.png`);
    }
}

//load tiles
AM.queueDownload("./tiles/dirt.png");
AM.queueDownload("./tiles/grass.png");
AM.queueDownload("./tiles/base.png")
AM.queueDownload("./tiles/mineral.png");

AM.downloadAll(function() {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var map = new Map(map_4);
    var myMouse = new Mouse(map, ctx);

    //UI Load
    canvas.style.outlineColor = "#000000"; //prevent highlighting
    var ui = new UI(myMouse, 100, 100, 100, 1, 0, 0);
    console.log("UI Loaded!");
    myMouse.attachUI(ui);
    console.log("UI Attached to Mouse");

    var gameEngine = new GameEngine(myMouse, ui);
    myMouse.init(gameEngine);

    //This generator will allow us to easily create enemies or towers and not just in main when the code first loads
    this.generator = new Generator(gameEngine, map, AM);
    myMouse.setGenerator(this.generator);


    this.wave = new Wave(this.generator, gameEngine);
    gameEngine.wave = this.wave;

    //Game Engine Start
    gameEngine.init(ctx);
    gameEngine.start();

    //Map Load
    map.createMap(gameEngine, AM);
    console.log("Map Loaded!");

    console.log("Enemies Loaded!");
});