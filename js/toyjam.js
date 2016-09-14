// VARIABLES
var stage;
var container;
var pin;
var items = 12;
var itemCount = 12;
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

    // Container
	container = new createjs.Container();
	container.x = container.y = 0;
   	stage.addChild(container);
    stage.update();	

    // Update
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener( "tick", updateStage );
    createjs.Ticker.setFPS( 30 );

    // Debug
    document.onkeydown = keyPressed;

	// Items
	for(var i = 0; i < itemCount; i++)
	{
	    var x = radius * Math.cos(2 * Math.PI * i / itemCount);
	    var y = radius * Math.sin(2 * Math.PI * i / itemCount);   

	    var circle = new createjs.Shape();
	    	circle.graphics.beginFill("Red").drawCircle(0,0,10);
	    	circle.x = x;
	    	circle.y = y;
	    	circle.name = "Circle " + i;

	    container.addChild(circle);
	    items[i] = circle;
	}

	// Pin
	pin = new createjs.Shape();
	pin.graphics.beginFill("DeepSkyBlue").rect(-25,-25,50,50);
	pin.graphics.beginFill("Grey").drawCircle(radius,0,30);
	pin.name = "Testing Object";
	pin.targetRotation = 100 + Math.random() * 3000;
	pin.addEventListener( "click" , testingPressed );
	pin.addEventListener( "tick", updatePin );

	container.addChild(pin);    
}

function updatePin( event )
{
	// Rotation
	if(pin.targetRotation < 0 )
	{
		pin.targetRotation = 0; 
	}else{	
		var accel = .98;
		var destination = pin.targetRotation - ( pin.targetRotation * accel );
		pin.rotation += destination;
		pin.targetRotation -= destination;
	}
	// Detection
	for( var i =0; i < itemCount; i++ )
	{

	}	
}

function distance( x1, y1, x2, y2 )
{
	var a = x1 - x2;
	var b = y1 - y2;
	var c = Math.sqrt( a*a + b*b );
	return c;
}

function testingPressed( event )	
{
	console.log("rectangle pressed:" + event.target);
	event.target.targetRotation += 250 + Math.random() * 750;
}

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{
		console.log("testing");
	}
}

function updateStage( event )
{
	// if(!container)
	// 	return;

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