import { XNotify } from './x-notify';
const delayField = document.querySelector('[name="delay"]');
const delayStepField = document.querySelector('[name="step"]');
const promiceAmountField = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');
const Notify = new XNotify('TopRight');

form.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  let currentTimer = Number(delayField.value);
  let stepDelay = Number(delayStepField.value);
  for (let val = 1; val <= promiceAmountField.value; val++) {
    createPromise(val, currentTimer)
      .then(({ position, delay }) => {
        Notify.success({
          width: '400px',
          title: `✅ Fulfilled promise ${position} in ${delay}ms`,
          duration: 500,
        });
      })
      .catch(({ position, delay }) => {
        Notify.error({
          width: '400px',
          title: `❌ Rejected promise ${position} in ${delay}ms`,
          duration: 500,
        });
      });

    currentTimer += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.5;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
