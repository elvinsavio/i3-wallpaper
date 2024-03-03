export class Gui {
    gui: HTMLElement
    togglePause: () => void
    toggleDebug: () => void
    paused: boolean
    debug: boolean
    menuOpen: boolean

    constructor(togglePause: () => void, toggleDebug: ()=> void) {
        this.togglePause = togglePause
        this.toggleDebug = toggleDebug

        this.gui = document.getElementById("gui-body")!
        this.drawGui()
        this.toggleMenu()
        this.paused = false;
        this.debug = false
        this.menuOpen = false
    }


    toggleMenu() {
        const toggleButton = document.getElementById("gui-toggle")!
        this.gui.style.display = this.menuOpen ? "flex" : 'none'

        toggleButton?.addEventListener('click', () => {
            this.gui.style.display = this.menuOpen ? "flex" : 'none'
            toggleButton.innerText = this.menuOpen ? "Close menu" : 'Open menu'
            this.menuOpen = !this.menuOpen
        })
    }

    drawGui() {
        const pauseButton = document.createElement('button');
        pauseButton.textContent = 'Pause';
        pauseButton.addEventListener('click', () => {
            this.togglePause()
            this.paused = !this.paused
            pauseButton.textContent = this.paused ? "Resume" : "Pause";
            pauseButton.style.background = this.paused ? "rgb(200,0,0)" : "rgba(100,255 ,100)"

        });


        const debugButton = document.createElement('button');
        debugButton.textContent = 'Debug';
        debugButton.addEventListener('click', () => {
            this.toggleDebug()
            this.debug = !this.debug
            debugButton.style.background = this.debug ? "rgb(200,0,0)" : "rgba(100,255 ,100)"

        });

        this.gui.appendChild(debugButton)
        this.gui.appendChild(pauseButton);

    }
}
