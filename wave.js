function Wave(generator) {
    this.doc = document.getElementById("gameWorld");
    this.generator = generator;
}

Wave.prototype.createWave = function (unitName, unitAmount) {
    this.unitName = unitName;
    switch (unitName) {
        case "mutalisk":
            this.generateMutalisk(unitAmount);
            break;
        case "queen":
            this.generateQueen(unitAmount);
            break;
        case "zergling":
            this.generateZergling(unitAmount);;
            break;
        case "ultralisk":
            this.generateUltralisk(unitAmount);
            break;
        case "hydralisk":
            this.generateHydralisk(unitAmount);
            break;
        case "defiler":
            this.generateDefiler(unitAmount);
            break;
        default:
            console.log("Not a valid unit.");
    }
}

//Creates unitAmount enemies of the specified type 
Wave.prototype.generateMutalisk = function (unitAmount) {
    for (let i = 0; i < unitAmount; i++) {
        this.generator.createEnemy(this.unitName);
    }
}

//Creates unitAmount enemies of the specified type 
Wave.prototype.generateQueen = function (unitAmount) {
    for (let i = 0; i < unitAmount; i++) {
        this.generator.createEnemy(this.unitName);
    }
}

//Creates unitAmount enemies of the specified type 
Wave.prototype.generateZergling = function (unitAmount) {
    for (let i = 0; i < unitAmount; i++) {
        this.generator.createEnemy(this.unitName);
    }
}

//Creates unitAmount enemies of the specified type 
Wave.prototype.generateUltralisk = function (unitAmount) {
    for (let i = 0; i < unitAmount; i++) {
        this.generator.createEnemy(this.unitName);
    }
}

//Creates unitAmount enemies of the specified type 
Wave.prototype.generateHydrolisk = function (unitAmount) {
    for (let i = 0; i < unitAmount; i++) {
        this.generator.createEnemy(this.unitName);
    }
}

//Creates unitAmount enemies of the specified type 
Wave.prototype.generateDefiler = function (unitAmount) {
    for (let i = 0; i < unitAmount; i++) {
        this.generator.createEnemy(this.unitName);
    }
}
