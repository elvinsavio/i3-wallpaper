import "./style.css";
import * as PIXI from 'pixi.js';
import { StarManager } from "./scripts/animatables/star";
import { Clock } from "./scripts/gui/time";



class App {
  app: PIXI.Application;
  starManager: StarManager

  constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: 1,
      backgroundColor: 0x000000, // Black background
    });

    document.body.appendChild(this.app.view as any);

    new Clock()
    this.starManager = new StarManager(this.app)

    this.app.ticker.add(() => {
      this.starManager.update()
    })

  }



}

window.addEventListener('load', () => {
  new App();
});
