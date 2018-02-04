var tileSize = 40;

function Map(map) {
    this.map = map;
    this.mapSize = Math.sqrt(this.map.length);
    this.mapDim = {row : this.map.length, col : this.map[0].length};
    this.canvas = document.getElementById("gameWorld");
    this.tileSize = tileSize;

    if (this.map === map_5) {
        this.firstEntry = { column: 0, row: 1 };
        this.secondEntry = { column: 5, row: 0 };
        this.airDirection = 'se';
    }

    if (this.map === map_4) {
        this.firstEntry = { column: 0, row: 1 };
        this.secondEntry = { column: 0, row: 6 };
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
                case '>' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/dirt/dirt_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;

                case 'v' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/dirt/dirt_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;

                case '^' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/dirt/dirt_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;

                case '<' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/dirt/dirt_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;

                case '=':
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/grass/grass.png"), i * this.tileSize, j * this.tileSize));
                    this.baseX = i * this.tileSize;
                    this.baseY = j * this.tileSize;
                    break;

                case '*':
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/grass/grass.png"), i * this.tileSize, j * this.tileSize));
                    this.mineralX = i * this.tileSize;
                    this.mineralY = j * this.tileSize;
                    break;

                default:
                    if (i % 2 == 0) {
                        gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/grass/grass_top${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    } else {
                        gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/grass/grass_bot${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    }
                    break;
            }
        }
    }
    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/mineral.png"), this.mineralX, this.mineralY));
    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/base.png"), this.baseX, this.baseY));
}

var map_4 = [['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['-', '-', '-', '-', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '-', '-', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '-', '-', '-', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '=', '+', '+'],
             ['*', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '-', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+']];

var map_5 = [['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['>', '>', '>', 'v', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', 'v', '+', '>', '>', '>', '>', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
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
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '=', '+', '+'],
            ['*', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', '>', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+']]


