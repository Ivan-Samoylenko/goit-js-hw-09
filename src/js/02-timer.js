// imports
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
      resetTimer();
    }
  },
  onClose(selectedDates) {
    const isSelectedTimeValid =
      datePickerOptions.defaultDate.getTime() < selectedDates[0].getTime();
    if (isSelectedTimeValid) {
      selectedDate = selectedDates[0].getTime();
      enableStartButton();
      message(true);
    } else {
      disableStartButton();
      message(false);
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
    message();
    return;
  }
  disableStartButton();
  let time = selectedDate - new Date().getTime();
  // first markup change
  doTimerMarkup(time);
  // other all next markups change
  timerId = setInterval(() => {
    time = selectedDate - new Date().getTime();
    if (time <= 0) {
      resetTimer();
      return;
    }
    doTimerMarkup(time);
  }, 1000);
}

// functions helpers
function message(state) {
  if (state) {
    Notiflix.Notify.success('You can start timer');
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
  }
}

function enableStartButton() {
  refs.startButton.removeAttribute('disabled');
}

function disableStartButton() {
  refs.startButton.setAttribute('disabled', 'true');
}

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

function pad(value) {
  return String(value).padStart(2, '0');
}

function doTimerMarkup(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  doTimerMarkup(0);
}
