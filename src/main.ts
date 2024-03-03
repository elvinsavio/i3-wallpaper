import "./style.css";
import * as PIXI from 'pixi.js';
import { StarManager } from "./scripts/animatables/star";
import { Gui } from "./scripts/gui/gui";
import { Clock } from "./scripts/gui/time";



class App {
  app: PIXI.Application;
  starManager: StarManager
  paused: boolean

  constructor() {
    this.paused = false
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: 1,
      backgroundColor: 0x000000, // Black background
    });

    document.body.appendChild(this.app.view as any);

    new Gui(this.togglePause.bind(this))
    new Clock()
    this.starManager = new StarManager(this.app)

    this.app.ticker.add(() => {
      if (this.paused) return
      this.starManager.update()
    })

  }


  togglePause() {
    this.paused = !this.paused
  }
}

window.addEventListener('load', () => {
  new App();
});
