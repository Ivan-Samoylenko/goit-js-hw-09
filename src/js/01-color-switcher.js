// define variables
let changeBodyBcgTimer = null;
const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

// completes the markup
refs.stopButton.setAttribute('disabled', 'true');

// event listeners
refs.startButton.addEventListener('click', onStart);
refs.stopButton.addEventListener('click', onStop);

// callbacks for event listeners
function onStart() {
  changeBodyBcg();
  changeBodyBcgTimer = setInterval(changeBodyBcg, 1000);
  refs.startButton.setAttribute('disabled', 'true');
  refs.stopButton.removeAttribute('disabled');
}

function onStop() {
  clearInterval(changeBodyBcgTimer);
  refs.startButton.removeAttribute('disabled');
  refs.stopButton.setAttribute('disabled', 'true');
}

// helpers
function changeBodyBcg() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
