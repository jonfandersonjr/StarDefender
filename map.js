var tileSize = 40;

function Map(map) {
    this.map = map;
    this.mapSize = Math.sqrt(this.map.length);
    this.mapDim = {row : this.map.length, col : this.map[0].length};
    this.canvas = document.getElementById("gameWorld");
    this.tileSize = tileSize;

    if (this.map === map_1) {
        this.firstEntry = { column: 0, row: 1 };
        this.secondEntry = { column: 11, row: 0 };
        this.airDirection = 'se';
        this.trailChoice = "dirt";
        this.tileChoice = "blue";
    }

    if (this.map === testMovementMap) {
        this.firstEntry = { column: 0, row: 1 };
        this.secondEntry = { column: 8, row: 0 };
        this.airDirection = 'se';
        this.trailChoice = "dirt";
        this.tileChoice = "blue";
    }

}

Map.prototype.constructor = Map;

function Background(game, spritesheet, x, y) {
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y);
};

Background.prototype.update = function () { };

//Creates a map based on the selection.
Map.prototype.createMap = function (gameEngine, assetManager) {
    for (let i = 0; i < this.mapDim.col; i++) {
        
        for (let j = 0; j < this.mapDim.row; j++) {
            let cycle = Math.ceil(Math.random() * 6)
            let tile = this.map[j][i];
            switch (tile) {
                case '>':
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.trailChoice}/${this.trailChoice}_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;

                case 'v' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.trailChoice}/${this.trailChoice}_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;

                case '^' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.trailChoice}/${this.trailChoice}_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;

                case '<' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.trailChoice}/${this.trailChoice}_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;

                case '=':
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.tileChoice}/${this.tileChoice}_top${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    this.baseX = i * this.tileSize;
                    this.baseY = j * this.tileSize;
                    break;

                case '*':
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.tileChoice}/${this.tileChoice}_top${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    this.mineralX = i * this.tileSize;
                    this.mineralY = j * this.tileSize;
                    break;

                case "/":
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.tileChoice}/${this.tileChoice}_mount.png`), i * this.tileSize, j * this.tileSize));
                    this.mountX = i * this.tileSize;
                    this.mountY = j * this.tileSize;
                    break;


                default:
                    if (i % 2 == 0) {
                        gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.tileChoice}/${this.tileChoice}_top${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    } else {
                        gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.tileChoice}/${this.tileChoice}_bot${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    }
                    break;
            }
            gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.tileChoice}/${this.tileChoice}_mount.png`), this.mountX,  this.mountY));


        }
    }
    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/mineral.png"), this.mineralX, this.mineralY));
    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/base.png"), this.baseX, this.baseY));
}

var map_1 =[['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['>', '>', '>', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '<', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '+', '+', '+', '>', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '>', '>', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '>', '>', '>', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '=', 'b', 'b'],
            ['*', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', '>', 'b', 'b'],
            ['f', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'b', 'b', 'b']]

var testMovementMap = [['+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
                       ['>', '>', '>', 'v', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '>', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '<', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '+', '+', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '>', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', 'v', '<', '<', '+', '>', '>', '>', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', 'v', '+', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', '>', '>', 'v', '+', '^', '<', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', '>', '>', '>', '^', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
                       ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '=', '+', '+'],
                       ['*', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', '>', '+', '+'],
                       ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+']]