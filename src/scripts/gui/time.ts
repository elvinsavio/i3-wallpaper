export class Clock {
    element: HTMLElement

    constructor() {
      this.element = document.getElementById('time')!;
      this.updateTime();
      setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
      const currentTime = new Date();
      const hours = this.formatTime(currentTime.getHours());
      const minutes = this.formatTime(currentTime.getMinutes());
      const seconds = this.formatTime(currentTime.getSeconds());
      this.element.innerHTML = `${hours}:${minutes}:${seconds}`;
    }

    formatTime(time: number) {
      return time < 10 ? "0" + time : time;
    }
  }
