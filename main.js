const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridEl = document.getElementById('grid');
const colorEl = Array.from(
  document.getElementsByClassName('color'),
);
const clear = document.getElementById('clear');
const clearSure =
  document.getElementById('clear-sure');
const cancel = document.getElementById('cancel');
const ok = document.getElementById('ok');
const download =
  document.getElementById('download');
let selectedColor = 'black';

const checkHighlight = (el) => {
  if (el.id === selectedColor) {
    el.classList.add('highlight');
  } else {
    el.classList.remove('highlight');
  }
};

colorEl.forEach((el) => {
  el.style.background = el.id;
  el.addEventListener('click', () => {
    selectedColor = el.id;
    colorEl.forEach((el) => {
      checkHighlight(el);
    });
  });
  checkHighlight(el);
});

const gridSize = 16;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const draw = (e) => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const touchX = touch.clientX - rect.left;
  const touchY = touch.clientY - rect.top;

  const gridX = Math.floor(
    (touchX / rect.width) * gridSize,
  );
  const gridY = Math.floor(
    (touchY / rect.height) * gridSize,
  );
  console.log(gridX, gridY);

  ctx.fillStyle = selectedColor;
  ctx.fillRect(
    (gridX * canvas.width) / gridSize,
    (gridY * canvas.height) / gridSize,
    canvas.width / gridSize,
    canvas.height / gridSize,
  );
};

gridEl.addEventListener('touchstart', (e) =>
  draw(e),
);

gridEl.addEventListener('touchmove', (e) =>
  draw(e),
);

clear.addEventListener('click', () => {
  clearSure.classList.remove('invisible');
});

cancel.addEventListener('click', () => {
  clearSure.classList.add('invisible');
});

ok.addEventListener('click', () => {
  clearSure.classList.add('invisible');
  ctx.fillStyle = 'white';
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height,
  );
});

let count = 0;

download.addEventListener('click', () => {
  const filename =
    prompt('Filename:') ||
    `Pixelsandbox-${count}`;
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;

  link.click();
  link.remove();
  count++;
});
