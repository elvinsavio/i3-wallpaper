import * as PIXI from "pixi.js";
import { getRandomArbitrary } from "../utils/utils";
import { Gui } from "../gui/gui";

interface TPos {
    x: number;
    y: number;
}

export class StarManager {
    app: PIXI.Application;
    starCount: number;
    stars: Array<Star>;
    paused: boolean

    constructor(app: PIXI.Application) {
        this.app = app;
        this.paused = false
        this.starCount = 300;
        this.stars = [];

        for (let i = 0; i < this.starCount; i++) {
            this.createNewStar();
        }
        new Gui(this.togglePause.bind(this), this.toggleDebug.bind(this))

    }



    togglePause() {
        this.paused = !this.paused
    }

    toggleDebug() {
        this.stars.forEach(star => {
            star.toggleDebug()
        })
    }




    createNewStar() {
        let star: Star;
        star = new Star();
        this.stars.push(star);
        this.app.stage.addChild(star.graphics);
    }

    update() {
        if (this.paused) return

        for (let i = this.stars.length - 1; i >= 0; i--) {
            const star = this.stars[i];
            star.update();
        }
    }
}

class Star {
    debug: boolean;
    graphics: PIXI.Graphics;
    trails: PIXI.Point[];
    center: TPos;
    pos: TPos;
    targetPos: TPos;
    color: number;
    size: number;
    maxSize: number;
    speed: number;
    luck: boolean;
    trailLength: number;
    debugText: PIXI.Text; // New property for debug text

    constructor() {
        this.graphics = new PIXI.Graphics();
        this.trails = [];
        this.center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.luck = getRandomArbitrary(-1, 100) <= 0;
        this.color = this.luck ? 0xFFD700 : 0x02f24f;
        this.pos = { ...this.center };
        this.size = 0;
        this.maxSize = 5;
        this.speed = 10;
        this.targetPos = { x: getRandomArbitrary(-1, 1), y: (getRandomArbitrary(-1, 1)) };
        this.trailLength = 10; // Number of points in the trail
        this.debug = false

        // Create debug text
        this.debugText = new PIXI.Text('', { fill: 0xffffff, fontSize: 8 });
        this.graphics.addChild(this.debugText); // Add debug text to the graphics container
    }

    toggleDebug() {
        this.debug = !this.debug
        this.debugText.visible = this.debug; 
    }

    reset() {
        this.pos = { ...this.center };
        this.size = 0;
        this.trails = [];
        this.targetPos = { x: getRandomArbitrary(-1, 1), y: (getRandomArbitrary(-1, 1)) };
    }

    _draw() {
        this.graphics.clear();

        // Draw the trails
        for (let i = 0; i < this.trails.length; i++) {
            const alpha = (i + 1) / this.trails.length;
            this.graphics.lineStyle(2, this.color, alpha);
            this.graphics.moveTo(this.trails[i].x, this.trails[i].y);
            this.graphics.lineTo(this.pos.x, this.pos.y);
        }

        // Draw the star
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(0, 0, this.size);
        this.graphics.endFill();
    }

    _updateSize() {
        if (this.size >= this.maxSize) return;
        this.size += 0.01; // Adjust size based on delta time
    }

    _updatePos() {
        if (this._isOutsideScreen()) {
            this.reset();
        }
        this.pos.x += this.targetPos.x * this.speed;
        this.pos.y += this.targetPos.y * this.speed;

        // Add current position to the trail
        this.trails.push(new PIXI.Point(this.pos.x, this.pos.y));
        // Keep the trail length fixed
        if (this.trails.length > this.trailLength) {
            this.trails.shift();
        }

    }

    _updateDebugText() {
        this.debugText.text = `Pos: (${this.pos.x.toFixed(2)}, ${this.pos.y.toFixed(2)})\n` +
            `Vel: (${this.targetPos.x.toFixed(2)}, ${this.targetPos.y.toFixed(2)})`;
        this.debugText.position.set(this.pos.x, this.pos.y); // Adjust position of debug text relative to the star
    }

    _isOutsideScreen(): boolean {
        const buffer = 100; // Adjust buffer size as needed

        return (
            this.pos.x < -buffer ||
            this.pos.x > window.innerWidth + buffer ||
            this.pos.y < -buffer ||
            this.pos.y > window.innerHeight + buffer
        );
    }

    update() {
        this._updateSize();
        this._updatePos();
        this._draw();

        if (this.debug) {
            this._updateDebugText(); // Call method to update debug text
        }
    }
}

