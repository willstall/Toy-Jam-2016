// VARIABLES
var stage;
var container;
var pin;
var items = 12;
var radius = 200;

// FUNCTIONS
function main()
{	
	// Stage
	stage = new createjs.Stage( "canvas" );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;
	stage.update();	

    // Resize
    resize();
	window.addEventListener( 'resize', resize, false );

    // Enable Touch
    createjs.Touch.enable(stage);

    // Update
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 30 );

	// Game
	container = new createjs.Container();
	container.x = container.y = 0;

	document.onkeydown = keyPressed;

    stage.addChild(container);
    stage.update();

	pin = new createjs.Shape();
	pin.graphics.beginFill("DeepSkyBlue").rect(-25,-25,50,50);
	pin.graphics.beginFill("Grey").drawCircle(radius,0,30);
	pin.name = "Testing Object";
	pin.targetRotation = 0;
	pin.addEventListener( "click" , testingPressed );
	pin.addEventListener( "tick", updatePin );

	for(var i = 0; i < items; i++)
	{
	    var x = radius * Math.cos(2 * Math.PI * i / items);
	    var y = radius * Math.sin(2 * Math.PI * i / items);   

	    var circle = new createjs.Shape();
	    	circle.graphics.beginFill("Red").drawCircle(0,0,10);
	    	circle.x = x;
	    	circle.y = y;
	    	circle.name = "Circle";

	    container.addChild(circle);
	}


	container.addChild(pin);    
}

function updatePin( event )
{
	if(pin.targetRotation < 0 )
	{
		pin.targetRotation = 0;
	}else{	
		var accel = .98;
		var destination = pin.targetRotation - ( pin.targetRotation * accel );
		pin.rotation += destination;
		pin.targetRotation -= destination;
	}
	//console.log( pin.targetRotation );
}

function testingPressed( event )	
{
	console.log("rectangle pressed:" + event.target);
	event.target.targetRotation += 500 + Math.random() * 500;
}

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{
		console.log("testing");
	}
}

function tick( event )
{
	if(!container)
		return;

	container.x = window.innerWidth * 0.5;
	container.y = window.innerHeight * 0.5;

    stage.update();    
}

function resize()
{
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}