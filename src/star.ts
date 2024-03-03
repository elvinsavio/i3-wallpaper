import * as PIXI from "pixi.js";
import { getRandomArbitrary, getRandomPointWithinRadius } from "./utils";

interface TPos {
    x: number;
    y: number;
}

interface TColor {
    r: number;
    g: number;
    b: number;
    a?: number | null;
}
export class StarManager {
    app: PIXI.Application;
    starCount: number;
    stars: Array<Star>;
    starPool: Array<Star>; // Object pool for reusing stars

    constructor(app: PIXI.Application) {
        this.app = app;
        this.starCount = 500;
        this.stars = [];
        this.starPool = [];

        for (let i = 0; i < this.starCount; i++) {
            const star = new Star(true);
            this.starPool.push(star);
        }

        for (let i = 0; i < this.starCount; i++) {
            this.createNewStar();
        }
    }

    createNewStar() {
        let star: Star;
        if (this.starPool.length > 0) {
            star = this.starPool.pop()!;
            star.reset();
        } else {
            star = new Star(false);
        }

        this.stars.push(star);
        this.app.stage.addChild(star.graphics);
    }

    update(delta: number) {
        for (let i = this.stars.length - 1; i >= 0; i--) {
            const star = this.stars[i];
            if (star.destroyed) {
                this.stars.splice(i, 1);
                this.starPool.push(star);
                this.createNewStar();
            } else {
                star.update(delta);
            }
        }
    }
}

class Star {
    graphics: PIXI.Graphics;
    trail: PIXI.Graphics[];
    center: TPos;
    pos: TPos;
    targetPos: TPos;
    color: number;
    size: number;
    maxSize: number;
    destroyed: boolean;
    luck: boolean
    initial: boolean

    constructor(initial: boolean) {
        this.initial = initial
        this.graphics = new PIXI.Graphics();
        this.trail = [];
        this.center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.luck = getRandomArbitrary(-1, 100) <= 0
        this.color = this.luck ? 0xFFD700 : 0xffffff;
        this.pos = getRandomPointWithinRadius(this.center, 50)
        this.size = 0;
        this.maxSize = 1;
        this.targetPos = { x: getRandomArbitrary(-1, 1), y: getRandomArbitrary(-1, 1) };
        this.destroyed = false;
    }

    reset() {
        this.pos = { ...this.center };
        this.size = 0;
        this.destroyed = false;
    }

    _draw() {
        this.graphics.clear()
        this.graphics.x = this.pos.x;
        this.graphics.y = this.pos.y;
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(0, 0, this.size);
        this.graphics.endFill();
    }

    _updateSize(delta: number) {
        if (this.size >= this.maxSize) return;
        this.size += 0.01 * delta; // Adjust size based on delta time
    }

    _updatePos(delta: number) {
        if (this._isOutsideScreen()) {
            this.destroyed = true;
        }
        this.pos.x += this.targetPos.x * 10 * delta; // Adjust movement based on delta time
        this.pos.y += this.targetPos.y * 10 * delta;
        this.graphics.position.x = this.pos.x % this.size
        this.graphics.position.y = this.pos.y % this.size
    }

    _isOutsideScreen(): boolean {
        return (
            this.pos.x < 0 ||
            this.pos.x > window.innerWidth ||
            this.pos.y < 0 ||
            this.pos.y > window.innerHeight
        );
    }

    update(delta: number) {
        this._updateSize(delta);
        this._updatePos(delta);
        this._draw();
    }
}
