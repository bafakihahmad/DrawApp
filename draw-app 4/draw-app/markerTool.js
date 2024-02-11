function markerTool(){
    //icon and name for the tool
    this.name = "marker";
	this.icon = "assets/highLighter.png";

    this.xCoverage = 25;
    this.yCoverage = 25;

    this.draw = function()
    {
        if(mouseIsPressed){
            rect(mouseX, mouseY, this.xCoverage, this.yCoverage, 7);
		}
    }


}