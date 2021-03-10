class CountdownTimer {
  constructor(selector, targetDate) {
    this.selector = selector;
    this.targetDate = new Date(targetDate);
  }

  deltaTime() {
    const currentDate = Date.now();
    const deltaTime = this.targetDate - currentDate;
    return deltaTime;
  }

  getTimeComponents() {
    const time = this.deltaTime();
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  countDown() {
    setInterval(() => {
      const timeComponents = this.getTimeComponents();
      document.querySelector(
        `${this.selector} [data-value="days"]`
      ).textContent = timeComponents.days;
      document.querySelector(
        `${this.selector} [data-value="hours"]`
      ).textContent = timeComponents.hours;
      document.querySelector(
        `${this.selector} [data-value="mins"]`
      ).textContent = timeComponents.mins;
      document.querySelector(
        `${this.selector} [data-value="secs"]`
      ).textContent = timeComponents.secs;
    }, 1000);
  }
}

const timer = new CountdownTimer("#timer-1", "Jul 17, 2021");

timer.countDown();
