function HelperFunctions() {
	// Drawing state stack to keep track of undo/redo
	let drawingStates = [];
	let currentStateIndex = -1;

	// Function to save the current drawing state
	function saveDrawingState() {
		// Get the current drawing state as an image
		let img = canvas.toDataURL();
	
		// Increment the current index to make room for the new state
		currentStateIndex++;
	
		// If there are states after the current one, remove them
		if (currentStateIndex < drawingStates.length) {
		  drawingStates.splice(currentStateIndex);
		}
	
		// Add the new drawing state to the stack
		drawingStates.push(img);
	  }

	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255);

		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();

		// Save the new drawing state
		saveDrawingState();
	});

	 
	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas('myCanvas', 'jpg');

	});

	select("#undoButton").mouseClicked(function() {
		// Make sure there are states to undo to
		if (currentStateIndex > 0) {
			// Decrement the current index to get the previous state
			currentStateIndex--;
		
			// Load the previous state from the stack
			let img = drawingStates[currentStateIndex];
		
			// Display the previous state on the canvas
			image(img, 0, 0);
		
			// Call loadPixels to update the drawing state
			// This is needed for the mirror tool
			loadPixels();
			}
	});

	select("#redoButton").mouseClicked(function() {
		// Make sure there are states to redo to
		if (currentStateIndex < drawingStates.length - 1) {
			// Increment the current index to get the next state
			currentStateIndex++;
	  
			// Load the next state from the stack
			let img = drawingStates[currentStateIndex];
	  
			// Display the next state on the canvas
			image(img, 0, 0);
	  
			// Call loadPixels to update the drawing state
			// This is needed for the mirror tool
			loadPixels();
		  }
	});


}


