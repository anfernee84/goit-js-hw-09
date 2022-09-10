import { XNotify } from './x-notify';
const delayField = document.querySelector('[name="delay"]');
const delayStepField = document.querySelector('[name="step"]');
const promiceAmountField = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');
const Notify = new XNotify('TopRight');
form.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  let delayStart = Number(delayField.value);
  let delayStep = Number(delayStepField.value);
  let promiceCount = Number(promiceAmountField.value);
  for (let value = 1; value <= promiceCount; value += 1) {
    createPromise(value, delayStart)
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
    delayStart += delayStep;
    // console.log(delayStart);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
