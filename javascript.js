// ======================[DEFAULT VALUES]======================= //
const DEFAULT_PEN_COLOR = 'rgb(80,20,230)';
const DEFAULT_BACKGROUND_COLOR = '#FFFFFF';

let currentPenColor = DEFAULT_PEN_COLOR;
let currentBackgroundColor = DEFAULT_BACKGROUND_COLOR;
// ============================================================= //



// =====================[ELEMENT SELECTORS]===================== //
const colorSelector = document.getElementById('color-select');
const btnColorPicker = document.getElementById('btn-color-picker');
const btnRainbow = document.getElementById('btn-rainbow');
const btnLighten = document.getElementById('btn-lighten');
const btnDarken = document.getElementById('btn-darken');
const btnGrid = document.getElementById('btn-grid');
const btnClear = document.getElementById('btn-clear');
const sizeSlider = document.getElementById('sizeSlider');
const gridContainer = document.getElementById('grid-container');
const backgroundColorSelector = document.getElementById('background-color-select');
const sliderText = document.getElementById('tile-size-div');
// ============================================================= //



// ====================[PEN COLOR SELECTOR]==================== //
document.getElementById('color-select').oninput = () => {
  currentPenColor = document.getElementById('color-select').value;
}
// ============================================================= //



// ==================[COLOR PICKER TOGGLE BTN]================== //
let colorPickerStatus = false;

btnColorPicker.onclick = () => {
  const gridDivs = document.querySelectorAll('.grid-element');

  colorPickerStatus = !colorPickerStatus;

  //Activate
  if (colorPickerStatus){
    btnColorPicker.value = "ON";

    gridDivs.forEach((element) =>{
      element.addEventListener('mousedown', handleColorPicker);
    });
    btnColorPicker.style.backgroundColor = "#5C469C";
    btnColorPicker.style.border= "#e1c3ff solid 2px";
  }
}

// Function - calls rbgToHex function, turns off color picker
// gives values to color selector and pen color, reset color picker
function handleColorPicker(event) {
  currentPenColor = rgbToHex(event.target.style.backgroundColor);
  colorSelector.value = currentPenColor;

  colorPickerStatus = false;
  btnColorPicker.value = "OFF";
  btnColorPicker.style.backgroundColor= "#1D267D";
  btnColorPicker.style.border= "#060e58 solid 2px";
}
// ============================================================= //



// ======================[RAINBOW BUTTON]======================= //
let rainbowBtnStatus = false;

btnRainbow.onclick = () =>{
  if (rainbowBtnStatus === false){
    rainbowBtnStatus = true;
    btnRainbow.style.backgroundColor = "#5C469C";
    btnRainbow.style.border= "#e1c3ff solid 2px";
  }
  else {
    rainbowBtnStatus = false;
    btnRainbow.style.backgroundColor= "#1D267D";
    btnRainbow.style.border= "#060e58 solid 2px";
  }
}
// ============================================================= //



// ======================[LIGHTEN BUTTON]======================= //
let lightenStatus = false;

btnLighten.onclick = () =>{
  if (lightenStatus === false){
    lightenStatus = true;
    btnLighten.style.backgroundColor = "#5C469C";
    btnLighten.style.border= "#e1c3ff solid 2px";
  }
  else {
    lightenStatus= false;
    btnLighten.style.backgroundColor= "#1D267D";
    btnLighten.style.border= "#060e58 solid 2px";
  }
}
// ============================================================= //



// ======================[DARKEN BUTTON]======================= //
let darkenStatus = false;

btnDarken.onclick = () =>{
  if (darkenStatus === false){
    darkenStatus = true;
    btnDarken.style.backgroundColor = "#5C469C";
    btnDarken.style.border= "#e1c3ff solid 2px";
  }
  else {
    darkenStatus= false;
    btnDarken.style.backgroundColor= "#1D267D";
    btnDarken.style.border= "#060e58 solid 2px";
  }
}
// ============================================================= //



// ====================[GRID TOGGLE BUTTON]==================== //
btnGrid.onclick = () => {
  const gridDivs = document.querySelectorAll('.grid-element');

  if (btnGrid.value === "ON"){

    btnGrid.value = "OFF";
    gridDivs.forEach((element) => {
      element.style.border = 'none';
    });
    // Change grid button text
    btnGrid.textContent = 'Grid: OFF';
  }
  else {
    btnGrid.value = "ON";

    gridDivs.forEach((element) => {
      element.style.border = '#f4f4f4 solid 1px';
    });
    // Change grid button text
    btnGrid.textContent = 'Grid: ON';
  }
}
// ============================================================= //



// ========================[CLEAR BUTTON]======================== //
btnClear.onclick = () => {
  clearGrid();
  updateGrid(document.getElementById('sizeSlider').value);
}
// ============================================================= //



// ==================[BACKGROUND COLOR PICKER]================== //
document.getElementById('background-color-select').oninput = () => {
  clearGrid();
  currentBackgroundColor = document.getElementById('background-color-select').value;
  updateGrid(document.getElementById('sizeSlider').value);
}
// ============================================================= //



// ====================[SLIDER UPDATE LOGIC]==================== //
document.getElementById('sizeSlider').oninput = () => {
  clearGrid();
  updateGrid(document.getElementById('sizeSlider').value);
  sliderTextOutput(document.getElementById('sizeSlider').value);
}
// ============================================================= //



// ******************************[FUNCTIONS]****************************** //


// ====================[SLIDER TEXT OUTPUT]===================== //
function sliderTextOutput (value){
  sliderText.textContent = `${value} x ${value}`;
}
// ============================================================= //



// =======================[GRID UPDATE]========================= //
function updateGrid(value){
  gridContainer.style.gridTemplateColumns = `repeat(${value}, 1fr)`
  gridContainer.style.gridTemplateRows = `repeat(${value}, 1fr)`

  // Creates all the individual grid elements
  for (let i = 0; i < value*value; i++){
    const gridElement = document.createElement('div');

    // Logic for painting on the grid elements
    gridElement.addEventListener('mouseover', changeColor);
    gridElement.addEventListener('mousedown', changeColor);

    // Adds class / background color and appends to the grid
    gridElement.classList.add('grid-element');
    if (btnGrid.value === 'ON')
      gridElement.classList.add('grid-element-border');
    gridElement.style.backgroundColor = currentBackgroundColor;
    gridContainer.appendChild(gridElement);
  }
}
// ============================================================= //



// =======================[DRAWING LOGIC]========================= //
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Drawing logic
function changeColor(e){
  if (colorPickerStatus) {
    return; // Do nothing when the color picker is active
  }
  if (e.type === 'mouseover' && !mouseDown) return;
  if (e.type === 'mouseover' || e.type === 'mousedown'){
    if (rainbowBtnStatus){
      const randomR = Math.floor(Math.random()*256);
      const randomG = Math.floor(Math.random()*256);
      const randomB = Math.floor(Math.random()*256);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    else if (lightenStatus){
      const tempBackground = rgbToHex(e.target.style.backgroundColor);
      alert(tempBackground);
    }
    else if (darkenStatus){

    }
    else
      e.target.style.backgroundColor = currentPenColor;
  }
}
// =============================================================== //



// =======================[CLEAR GRID]========================== //
function clearGrid(){
  gridContainer.innerHTML= '';
}
// ============================================================= //



// ===================[RGB TO HEX CONVERTER]===================== //
// Function for conversion from RGB to hexadecimal color code
function rgbToHex(rgb) {
  // Split the RGB value into individual components
  const rgbArray = rgb.match(/\d+/g);

  // Convert the components to hexadecimal and pad with zeros if needed
  const hexValue = rgbArray.map(component => {
    const hex = parseInt(component).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  });

  return `#${hexValue.join('')}`;
}
// ============================================================= //

// *********************************************************************** //


// Loads the grid upon page load
window.onload = () => {
  updateGrid(document.getElementById('sizeSlider').value);
}