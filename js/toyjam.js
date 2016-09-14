// VARIABLES
var stage;
var container;
var pin;
var itemSelector;
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
	items = new Array();

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
	    items.push( circle );
	}

	// Item Selector
	itemSelector = new createjs.Shape();
	itemSelector.graphics.beginFill("Grey").drawCircle(0,0,30);
	itemSelector.x = radius;
	itemSelector.name = "Item Selector";
	itemSelector.mouseEnabled = false;

	// Pin
	var pinWheel = new createjs.Shape();
		pinWheel.graphics.beginFill("DeepSkyBlue").rect(-25,-25,50,50);

	pin = new createjs.Container();
	pin.targetRotation = 100 + Math.random() * 3000;
	pin.addChild( pinWheel );
	pin.addChild( itemSelector );
	pin.addEventListener( "click" , spinPin );
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
	var currentItem = items[i];
	var distance = Infinity;

	for( var i =0; i < itemCount; i++ )
	{
		//console.log( items[i] );
		
	}	
}

function spinPin( event )
{
	pin.targetRotation += 250 + Math.random() * 750;
}

function distance( x1, y1, x2, y2 )
{
	var a = x1 - x2;
	var b = y1 - y2;
	var c = Math.sqrt( a*a + b*b );
	return c;
}

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{
		//console.log("testing");
		spinPin();
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