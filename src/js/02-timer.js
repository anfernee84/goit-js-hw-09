import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { XNotify } from './x-notify';

const Notify = new XNotify('TopRight');
let dateField = document.getElementById('datetime-picker');
let btn = document.querySelector('button');
let dayField = document.querySelector('[data-days]');
let hourField = document.querySelector('[data-hours]');
let minuteField = document.querySelector('[data-minutes]');
let secondField = document.querySelector('[data-seconds]');
let calcDate = null;
btn.addEventListener('click', startCountDownHandler);
dateField.addEventListener('input', inputHandler);

flatpickr(dateField, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
});

function inputHandler(e) {
  calcDate = e.target.value;
  if (new Date(calcDate) <= new Date()) {
    btn.disabled = true;
    Notify.error({
      width: '300px',
      title: 'Out of date range',
      description: 'You shold choose correct date',
      duration: 2000,
    });
  } else {
    btn.disabled = false;
    Notify.success({
      title: 'Entered date is correct',
      description: 'Start the final countdown...',
      duration: 2000,
    });
  }
}

function startCountDownHandler() {
  if (!calcDate) return;
  let timerId = setInterval(function () {
    let difference = new Date(calcDate) - new Date();
    dayField.innerHTML = Math.floor(difference / (1000 * 60 * 60 * 24));
    hourField.innerHTML = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    minuteField.innerHTML = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    secondField.innerHTML = Math.floor((difference % (1000 * 60)) / 1000);

    if ((difference = 0)) {
      clearInterval(timerId);
      Notify.info({
        title: 'Time`s up!',
        description: 'That`s it...',
        duration: 2000,
      });
    }
  }, 1000);
}
