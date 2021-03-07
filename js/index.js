const refs = {
  timerDay: document.querySelector('span[data-value="days"]'),
  timerHours: document.querySelector('span[data-value="hours"]'),
  timerMins: document.querySelector('span[data-value="mins"]'),
  timerSecs: document.querySelector('span[data-value="secs"]'),
};

class CountdownTimer {
  constructor(selector, targetDate, onTick) {
    this.selector = selector;
    this.targetDate = new Date(targetDate);
    this.onTick = onTick;
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
      const updatedTime = this.getTimeComponents();
      this.onTick(updatedTime);
    }, 1000);
  }
}

function updateCountDown({ days, hours, mins, secs }) {
  refs.timerDay.textContent = days;
  refs.timerHours.textContent = hours;
  refs.timerMins.textContent = mins;
  refs.timerSecs.textContent = secs;
}

const timer = new CountdownTimer("#timer-1", "Jul 17, 2021", updateCountDown);

timer.countDown();
