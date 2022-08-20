// imports
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// variables
let selectedDate = null;
let timerId = null;
const datePickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      doTimerMarkup(0);
    }
  },
  onClose(selectedDates) {
    const isSelectedTimeValid =
      datePickerOptions.defaultDate.getTime() < selectedDates[0].getTime();
    if (isSelectedTimeValid) {
      selectedDate = selectedDates[0].getTime();
      enableStartButton();
    } else {
      disableStartButton();
      errorMessage();
    }
  },
};

// references
const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// complate markup
flatpickr(refs.dateTimePicker, datePickerOptions);
disableStartButton();

// event listeners
refs.startButton.addEventListener('click', onStart);

// events functions
function onStart() {
  if (new Date().getTime() > selectedDate) {
    disableStartButton();
    errorMessage();
    return;
  }
  disableStartButton();
  let time = selectedDate - new Date().getTime();
  // first markup change
  doTimerMarkup(time);
  // other all next markups change
  timerId = setInterval(() => {
    time -= 1000;
    if (time <= 0) {
      clearInterval(timerId);
      timerId = null;
      return;
    }
    doTimerMarkup(time);
  }, 1000);
}

// functions helpers
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function errorMessage() {
  window.alert('Please choose a date in the future');
}

function enableStartButton() {
  refs.startButton.removeAttribute('disabled');
}

function disableStartButton() {
  refs.startButton.setAttribute('disabled', 'true');
}

function doTimerMarkup(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, '0');
}
