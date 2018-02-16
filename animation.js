function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    this.lastHealth = 0;
    this.damageTime = 0;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.drawEnemy = function(tick, ctx, x, y, currentHealth, maxHealth) {
    if (this.damageTime > 0) {
        this.damageTime -= tick;
    }
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
    if (currentHealth > 0) {
        ctx.fillStyle = "green";
        ctx.fillRect(x, y - 2, this.frameWidth * this.scale * (currentHealth / maxHealth), 5);
        if (currentHealth !== this.lastHealth) {
            this.damageTime = 1;
        }
        if (this.damageTime > 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(x + this.frameWidth * this.scale * (currentHealth / maxHealth), y - 2, this.frameWidth * this.scale * ((this.lastHealth - currentHealth) / maxHealth), 5);
            this.lastHealth = currentHealth;
        }
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "black";
        var amountOfBlocks = Math.floor(maxHealth / 20);
        var blockWidth = this.frameWidth * this.scale / amountOfBlocks;
        for (let i = 0; i < amountOfBlocks; i++) {
            ctx.strokeRect(x + i * blockWidth, y - 2, blockWidth, 5);
        }
    }
}

Animation.prototype.drawDefender = function(ctx, x, y, frame) {
    ctx.drawImage(this.spriteSheet,
        frame * this.frameWidth, 0, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.drawDummyDefender = function(ctx, x, y, frame, defenderName) {
    ctx.drawImage(this.spriteSheet,
        frame * this.frameWidth, 0, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    if (defenderName === 'marine') {
        ctx.fillRect(x + this.frameWidth * this.scale / 4, y + this.frameWidth * this.scale / 4, this.frameWidth * this.scale / 2, this.frameHeight * this.scale / 2);
    } else {
        ctx.fillRect(x, y, this.frameWidth * this.scale, this.frameHeight * this.scale);
    }
}

Animation.prototype.drawDeathFrame = function(tick, ctx, x, y, deathAnimationTime) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    if (deathAnimationTime >= 1) {
        var frame = 0;
    } else {
        var frame = this.currentFrame();
    }
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.drawLine = function(ctx, x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

Animation.prototype.currentFrame = function() {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function() {
    return (this.elapsedTime >= this.totalTime);
}