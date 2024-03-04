import * as PIXI from 'pixi.js'

export class ScreenBlocker {
    private app: PIXI.Application;
    private blocker: PIXI.Graphics;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.blocker = new PIXI.Graphics();
        this.blocker.beginFill(0x000000); // Black color with initial opacity
        this.blocker.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.blocker.endFill();
        this.app.stage.addChild(this.blocker);

        // Start the fading animation
        this.fadeOut(3000); // Fade out over 3 seconds
    }

    private fadeOut(duration: number) {
        const startOpacity = 0.7;
        const targetOpacity = 0;

        const startTime = Date.now();

        const update = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1

            const currentOpacity = startOpacity * (1 - progress) + targetOpacity * progress;

            this.blocker.clear();
            this.blocker.beginFill(0x000000, currentOpacity);
            this.blocker.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
            this.blocker.endFill();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                this.app.stage.removeChild(this.blocker);
            }
        };

        update();
    }
}
