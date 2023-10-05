const sizeSlider = document.getElementById('sizeSlider')

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

let mouseDown = false;

sizeSlider.addEventListener('mousedown', () => {
  mouseDown = true;
});

document.addEventListener('mouseup', () => {
  mouseDown = false;
});