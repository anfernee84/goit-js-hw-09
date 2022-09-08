////////////////////////////////////////////////// imports /////////////
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { XNotify } from './x-notify';
////////////////////////////////////////////////// vars ////////////////
const Notify = new XNotify('TopRight');
let dateField = document.getElementById('datetime-picker');
let btn = document.querySelector('button');
let dayField = document.querySelector('[data-days]');
let hourField = document.querySelector('[data-hours]');
let minuteField = document.querySelector('[data-minutes]');
let secondField = document.querySelector('[data-seconds]');
let calcDate = null;
const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};
//////////////////////////////////////////////////// add listeners //////
btn.addEventListener('click', startCountDownHandler);
dateField.addEventListener('input', inputHandler);
/////////////////////////////////////////////////// sync operations /////
flatpickr(dateField, options);
btn.disabled = true;
document.querySelectorAll('.field').forEach(elem => {
  elem.style.cssText +=
    'text-align: center;font-size: 25px;margin-top: 0px;display: inline-flex;flex-direction: column;';
  elem.lastElementChild.style.cssText +=
    'padding-top: 5px;font-size: 14px;text-transform: uppercase;';
});
///////////////////////////////// input handler //////////////////////////
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
      width: '300px',
      title: 'Entered date is correct',
      description: 'Start the final countdown...',
      duration: 2000,
    });
  }
}

////////////////////////////////// ... it`s a final coundown... ////////////
function startCountDownHandler() {
  if (!calcDate) return;
  dateField.disabled = true;
  btn.disabled = true;
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

    if (difference < 1000) {
      clearInterval(timerId);
      Notify.info({
        width: '300px',
        title: 'Time`s up!',
        description: 'That`s it...',
        duration: 2000,
      });
      dateField.disabled = false;
    }
  }, 1000);
}
