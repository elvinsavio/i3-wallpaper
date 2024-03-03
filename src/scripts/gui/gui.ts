export class Gui {
    gui: HTMLElement
    togglePause: () => void
    paused: boolean
    menuOpen: boolean

    constructor(togglePause: () => void) {
        this.togglePause = togglePause
        this.gui = document.getElementById("gui-body")!
        this.drawGui()
        this.toggleMenu()
        this.paused = false;
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
        this.gui.appendChild(pauseButton);

    }
}
