export class Clock {
  private timeElement: HTMLElement;
  private dateElement: HTMLElement;

  constructor() {
      this.timeElement = document.getElementById('time')!;
      this.dateElement = document.getElementById('date')!;
      this.updateTimeAndDate();
      setInterval(() => this.updateTimeAndDate(), 1000);
  }

  private updateTimeAndDate() {
      const currentDate = new Date();
      const day = this.getDayName(currentDate.getDay());
      const date = currentDate.getDate();
      const month = this.getMonthName(currentDate.getMonth());
      const year = currentDate.getFullYear();
      const hours = this.formatTime(currentDate.getHours());
      const minutes = this.formatTime(currentDate.getMinutes());
      const seconds = this.formatTime(currentDate.getSeconds());
      
      this.timeElement.innerHTML = `${hours}:${minutes}:${seconds}`;
      this.dateElement.innerHTML = `${day} ${date} ${month} ${year}`;
  }

  private getDayName(dayIndex: number): string {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[dayIndex];
  }

  private getMonthName(monthIndex: number): string {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[monthIndex];
  }

  private formatTime(time: number): string {
      return time < 10 ? "0" + time : time.toString();
  }
}

// Create an instance of the Clock class
