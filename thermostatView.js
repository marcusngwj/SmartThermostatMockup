const COLOR = {
  WHITE: "#FAFAFA",
  GREY: "#708090",
  BLUE: "#2998E9",
  RED: "#FF6B63"
}

function drawCircle(context, centerX, centerY, radius, lineWidth, strokeColor, fillColor) {
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);  // Drawing a circle: arc(x,y,r,startangle,endangle)
  context.lineWidth = lineWidth;
  context.strokeStyle = strokeColor;
  context.stroke();
  context.fillStyle = fillColor;
  context.fill();
}

function drawText(context, centerX, centerY, strokeColor, fontWeight, fontSize, text) {
  let font = fontWeight + " " + fontSize + " Roboto";
  context.textAlign = "center"; 
  context.textBaseline = "middle"; 
  context.font = font; 
  context.fillStyle = strokeColor;
  context.fillText(text, centerX, centerY);
}

/**
 * Draws a circle enclosing a text
 */
function drawTextButton(context, centerX, centerY, radius, lineWidth, strokeColor, fillColor, fontWeight, fontSize, text) {
  drawCircle(context, centerX, centerY, radius, lineWidth, strokeColor, fillColor);
  drawText(context, centerX, centerY, strokeColor, fontWeight, fontSize, text);
}


class ArrowButton {
  constructor(context, centerX, centerY, symbol) {
    this._ctx = context;
    this._centerX = centerX;
    this._centerY = centerY;
    this._symbol = symbol;

    this.draw = this.draw.bind(this);
    this.isWithinButton = this.isWithinButton.bind(this);
  }

  draw() {
    drawTextButton(this._ctx, this._centerX, this._centerY, 30, 2, COLOR.WHITE, "transparent", "bold", "3em", this._symbol);
  }

  /**
   * Returns true if the given coordinate is in the path of the circle
   */
  isWithinButton(xCoor, yCoor) {
    this._ctx.beginPath();
    this._ctx.arc(this._centerX, this._centerY, 30, 0, 2 * Math.PI);
    return this._ctx.isPointInPath(xCoor, yCoor) 
  }
}


class ThermostatView {
  constructor(canvas) {
    this._canvas = canvas;
    this._canvas.width = canvas.getBoundingClientRect().width;
    this._canvas.height = canvas.getBoundingClientRect().height;
    this._ctx = canvas.getContext("2d");
    this._centerX = this._canvas.width / 2;
    this._centerY = this._canvas.height / 2 ;
    this._leftBtn = new ArrowButton(this._ctx, this._centerX-150, this._centerY, "<");
    this._rightBtn = new ArrowButton(this._ctx, this._centerX+150, this._centerY, ">");

    this.draw = this.draw.bind(this);
    this.addClickEventListener = this.addClickEventListener.bind(this);
  }

  draw(number, bgColor) {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    drawCircle(this._ctx, this._centerX, this._centerY, 200, 25, COLOR.WHITE, bgColor);
    drawText(this._ctx, this._centerX, this._centerY, COLOR.WHITE, "bold", "7em", number);
    this._leftBtn.draw();
    this._rightBtn.draw();
  }

  addClickEventListener(onLeftBtnClick, onRightBtnClick) {
    // https://stackoverflow.com/a/256945
    this._canvas.addEventListener('click', (event) => {
      let xCoorOfClick = event.offsetX; // The offsetX property returns the x-coordinate of the mouse pointer, relative to the target element. https://www.w3schools.com/jsref/event_offsetx.asp
      let yCoorOfClick = event.offsetY;
      if (this._leftBtn.isWithinButton(xCoorOfClick, yCoorOfClick)) {
        return onLeftBtnClick();
      }

      if (this._rightBtn.isWithinButton(xCoorOfClick, yCoorOfClick)) {
        return onRightBtnClick();
      }
    }, false);
  }
}