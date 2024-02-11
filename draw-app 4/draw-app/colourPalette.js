class Picker {
  constructor(target, width, height) {
    this.target = target;
    this.width = width;
    this.height = height;
    this.target.width = width;
    this.target.height = height;
    this.color = { r: 0, g: 0, b: 0 };

    let selected = document.querySelector(".selected");
    selected.style.backgroundColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;

    //Get context
    this.context = this.target.getContext("2d", { willReadFrequently: true });

    //Circle
    this.pickerCircle = { x: 10, y: 10, width: 7, height: 7 };
    this.listenerEvts();
  }

  draw() {
    this.build();
  }

  build() {
    let gradient = this.context.createLinearGradient(0, 0, this.width, 0);
    // Color Stops
    gradient.addColorStop(0, "rgb(255, 0,0)");
    gradient.addColorStop(0.15, "rgb(255, 0,255)");
    gradient.addColorStop(0.33, "rgb(0, 0,255)");
    gradient.addColorStop(0.49, "rgb(0, 255,255)");
    gradient.addColorStop(0.67, "rgb(0, 255,0");
    gradient.addColorStop(0.84, "rgb(255, 255,0)");
    gradient.addColorStop(1, "rgb(255, 0,0)");

    //Fill it
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, this.height);

    //Apply black and white
    gradient = this.context.createLinearGradient(0, 0, 0, this.height);

    gradient.addColorStop(0, "rgba(255, 255,255,1)");
    gradient.addColorStop(0.5, "rgba(255, 255,255,0)");
    gradient.addColorStop(0.5, "rgba(0, 0,0,0)");
    gradient.addColorStop(1, "rgba(0, 0,0,1)");

    //Fill it
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, this.height);

    //Circle
    this.context.beginPath();
    this.context.arc(
      this.pickerCircle.x,
      this.pickerCircle.y,
      this.pickerCircle.width,
      0,
      Math.PI * 2
    );
    this.context.strokeStyle = "black";
    this.context.stroke();
    this.context.closePath();
  }
  listenerEvts() {
    let isMouseDown = false;
    let that = this;

    const onMouseDown = function (e) {
      let currentX = e.clientX - that.target.offsetLeft;
      let currentY = e.clientY - e.target.offsetTop;
      if (
        currentY > that.pickerCircle.y &&
        currentY < that.pickerCircle.y + that.pickerCircle.width &&
        currentX > that.pickerCircle.x &&
        currentX < that.pickerCircle.x + that.pickerCircle.width
      ) {
        isMouseDown = true;
      } else {
        that.pickerCircle.x = currentX;
        that.pickerCircle.y = currentY;
      }
    };

    const onMouseMove = function (e) {
      if (isMouseDown) {
        let currentX = e.clientX - that.target.offsetLeft;
        let currentY = e.clientY - that.target.offsetTop;
        that.pickerCircle.x = currentX;
        that.pickerCircle.y = currentY;
      }
    };
    const onMouseUp = function (e) {
      isMouseDown = false;
    };
    // Register
    this.target.addEventListener("mousedown", onMouseDown);
    this.target.addEventListener("mousemove", onMouseMove);
    this.target.addEventListener("mousemove", function (e) {
      let selected = document.querySelector(".selected");
      that.color = that.getPickedColor();
      selected.style.backgroundColor = `rgb(${that.color.r}, ${that.color.g}, ${that.color.b})`;
    });

    document.addEventListener("mouseup", onMouseUp);
  }
  getPickedColor() {
    let imageData = this.context.getImageData(
      this.pickerCircle.x,
      this.pickerCircle.y,
      1,
      1
    );
    this.color = {
      r: imageData.data[0],
      g: imageData.data[1],
      b: imageData.data[2],
    };

    return this.color;
  }
}

//Displays and handles the colour palette.
function ColourPalette() {
  //a list of web colour strings
  // "this." is a public method; hence, this function can

  // used outside the constructor function
  /* this.colours = [
        "black", "silver", "gray", "white", "maroon", "red", "purple",
		"orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
		"blue", "teal", "aqua"
	]; */

  // initialize color picker
  let myPicker = document.getElementById("color-picker");
  let picker = new Picker(myPicker, myPicker.width, myPicker.height);
  setInterval(function () {
    picker.draw();
  }, 1);

  let pickerCanva = picker.target;
  //make the start colour be black
  //this.loadColours(picker.getPickedColor());

  var self = this;

  pickerCanva.addEventListener("click", function (e) {
    self.selectedColour = picker.getPickedColor();
    self.loadColours(
      `rgb(${self.selectedColour.r}, ${self.selectedColour.g}, ${self.selectedColour.b})`
    );
  });

  /* var colourClick = function() {
		//remove the old border
		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");
 
		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];

		//set the selected colour and fill and stroke
		self.selectedColour = c;
		fill(c);
		stroke(c);

		//add a new border to the selected colour
		this.style("border", "2px solid blue");
	}; */

  //load in the colours
  this.loadColours = function (color) {
    //set the fill and stroke properties to be black at the start of the programme
    //running
    //sets initial colour(current fill) to the first item in the colour list
    fill(color);
    stroke(color);
    //for each colour create a new div in the html for the colourSwatches
    /* for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";

			// Add the swatch to the palette and set its background
			// colour to be the colour value.
			var colourSwatch = createDiv();
			colourSwatch.class("colourSwatches");

			colourSwatch.id( );

			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i]);
			colourSwatch.mouseClicked(colourClick);
		}

		select(".colourSwatches").style("border", "2px solid blue"); */
  };
  //call the loadColours function now it is declared
}
