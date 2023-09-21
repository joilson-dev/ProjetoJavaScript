const controles = document.getElementById("controles");
const cssText = document.querySelector(".css");
const btn = document.querySelector(".btn");
const body = document.body;
controles.addEventListener("change", handleChange);

const resetButton = document.getElementById("resetLocalStorage");
resetButton.addEventListener("click", resetLocalStorage);

const handleStyle = {
  elementBtn: btn,
  elementbody: body,
  backgroundColor(value) {
    this.elementBtn.style.backgroundColor = value;
  },
  height(value) {
    this.elementBtn.style.height = value + "px";
  },
  width(value) {
    this.elementBtn.style.width = value + "px";
  },
  texto(value) {
    this.elementBtn.innerText = value;
  },
  color(value) {
    this.elementBtn.style.color = value;
  },
  border(value) {
    this.elementBtn.style.border = value;
  },
  borderRadius(value) {
    this.elementBtn.style.borderRadius = value + "px";
  },
  fontFamily(value) {
    this.elementBtn.style.fontFamily = value;
  },
  fontSize(value) {
    this.elementBtn.style.fontSize = value + "rem";
  },
  background(value) {
    this.elementbody.style.background = value;
  },
};

function handleChange(event) {
  const name = event.target.name;
  const value = event.target.value;

  handleStyle[name](value);
  saveValues(name, value);
  showCss();
}

function resetLocalStorage() {
  localStorage.clear();
  showCss();
}

function saveValues(name, value) {
  localStorage[name] = value;
}
setValues();

function setValues() {
  const properties = Object.keys(localStorage);
  properties.forEach((propertie) => {
    handleStyle[propertie](localStorage[propertie]);
    controles.elements[propertie].value = localStorage[propertie];
  });
  showCss();
}

function showCss() {
  cssText.innerHTML =
    "<span>" + btn.style.cssText.split("; ").join(";</span><span>");
}

const pixelBoard = document.getElementById("pixel-board");
const colorPalette = document.getElementById("color-palette");
const clearButton = document.getElementById("clear-board");
const generateButton = document.getElementById("generate-board");
const boardSizeInput = document.getElementById("board-size");

function createPixelBoard(size) {
  pixelBoard.innerHTML = "";
  pixelBoard.style.width = "auto";

  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < size; j++) {
      const pixel = document.createElement("div");
      pixel.className = "pixel";
      row.appendChild(pixel);
    }
    pixelBoard.appendChild(row);
  }
}

const colors = [
  "#FF5733",
  "#FFC300",
  "#33FF57",
  "#339CFF",
  "#FF33EC",
  "#7A33FF",
  "#33FFD1",
  "#FF5733",
  "#33A3FF",
  "white",
];
const colorElements = document.querySelectorAll(".color");
colorElements.forEach((element, index) => {
  element.style.backgroundColor = colors[index];
});

function selectColor(event) {
  const selectedColor = event.target;
  const color = selectedColor.style.backgroundColor;
  selectedColor.classList.add("selected");
  colorElements.forEach((element) => {
    if (element !== selectedColor) {
      element.classList.remove("selected");
    }
  });
}

function paintPixel(event) {
  const selectedColor = document.querySelector(".selected");
  const color = selectedColor.style.backgroundColor;
  event.target.style.backgroundColor = color;
}

function clearBoard() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });
}

colorPalette.addEventListener("click", selectColor);

pixelBoard.addEventListener("click", paintPixel);

clearButton.addEventListener("click", clearBoard);

generateButton.addEventListener("click", () => {
  const newSize = parseInt(boardSizeInput.value);
  if (newSize >= 1 && newSize <= 25) {
    createPixelBoard(newSize);
  } else {
    alert("Quadro inválido! 1 A 25");
  }
});

createPixelBoard(10);
