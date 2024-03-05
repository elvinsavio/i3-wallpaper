import "./style.css";
import * as PIXI from 'pixi.js';
import { Clock } from "./scripts/gui/time";



class App {
  app: PIXI.Application;

  constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: 1,
      backgroundAlpha: 0,
      resizeTo: window
    });

    document.body.appendChild(this.app.view as any);
    new Clock()
    // this.starManager = new StarManager(this.app)
    
    this.app.ticker.add(() => {
    })

  }



}

window.addEventListener('load', () => {
  new App();
});
