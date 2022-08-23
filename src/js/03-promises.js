// imports
import Notiflix from 'notiflix';

// variables
let firstTimeoutId = null;
let stepTimeoutId = null;

// rferences
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

// complate markup
refs.delay.setAttribute('min', '0');
refs.delay.value = 0;
refs.step.setAttribute('min', '0');
refs.step.value = 0;
refs.amount.setAttribute('min', '1');
refs.amount.value = 1;

// event listeners
refs.form.addEventListener('submit', onSubmit);

// event listeners functions
function onSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const myFormData = {};
  formData.forEach((value, key) => {
    myFormData[key] = Number(value);
  });
  for (let i = 1; i <= myFormData.amount; i += 1) {
    const currentDelay = myFormData.delay + myFormData.step * (i - 1);
    createPromise(i, currentDelay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`),
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`),
      );
  }
}

// helpers functions
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
