// VARIABLES
var stage;
var container;
var loader;
var pin;
var items;
var itemSelector;
var selectedItem;
var items;
var radius = 234;
var debug;
var animals =
	[
		"turtle.png",
		"sheep.png",
		"turkey.png",
		"horse.png",
		"pig.png",
		"coyote.png",
		"frog.png",
		"cat.png",
		"duck.png",
		"cow.png",
		"rooster.png",
		"dog.png"
	];
var origCordPoint;
var cordImg;
var credits;

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

    // Create Loading Placeholder
    var loaderGfx = new createjs.Bitmap("./img/loadingGfx.png");
    	loaderGfx.regX = loaderGfx.regY = 42;
    	loaderGfx.addEventListener("tick", updateLoader );

	var loaderTxt = new createjs.Bitmap("./img/loading1.png");
	// var loaderData = {
	// 	images: ["./img/loading.png"],
	// 	frames: { width: 184, height: 50},
	// 	animations: {
	// 		load: [0,1]
	// 	},
	// 	speed : 0.1,
	// 	framerate: 50
	// };
	// var spriteSheet = new createjs.SpriteSheet( loaderData );
	// var loaderTxt = new createjs.Sprite( spriteSheet );
		loaderTxt.regX = 92;
		loaderTxt.regY = 25;
		loaderTxt.y = 100;
		//loaderTxt.play();

    loader = new createjs.Container();
    loader.x = loader.y = 0;
    loader.addChild( loaderGfx );
    loader.addChild( loaderTxt );

    stage.addChild(loader);
    // Container
	container = new createjs.Container();
	container.x = container.y = 0;

    // Update
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener( "tick", updateStage );
    createjs.Ticker.setFPS( 30 );

    // Debug
    document.onkeydown = keyPressed;

	// Cord and Play
	var playBtn = new createjs.Shape();
		playBtn.graphics.beginFill("Orange").rect(-50,-50,100,100);
		playBtn.x = 297;
		playBtn.y = 297;
		playBtn.alpha = 50;

	cordImg = new createjs.Bitmap("./img/cord.png");
	cordImg.x = -297;
	cordImg.y = -297;
	//cordImg.addEventListener( "click", playSelectedAnimal);
	cordImg.addEventListener("mousedown", pullCordOut );
	cordImg.cursor = "pointer";
	cordImg.hitArea = playBtn;

	origCordPoint = -297;

	var cord = new createjs.Container();
		cord.x = 300;
		cord.y = 200;
		cord.addChild(cordImg);	

	container.addChild( cord );

	// Background
	var background = new createjs.Bitmap("./img/background.png");
		background.mouseEnabled = false;
		background.x = -423;
		background.y = -423;
	container.addChild(background);

    // Setup Audio
    preloadAudio();

	// Items
	var itemCount = sounds.length;
	items = new Array();	

	for(var i = 0; i < itemCount; i++)
	{
	    var x = radius * Math.cos(2 * Math.PI * i / itemCount);
	    var y = radius * Math.sin(2 * Math.PI * i / itemCount);   

	    var circleHitArea = new createjs.Shape();
	    	circleHitArea.graphics.beginFill("Red").drawCircle(0,0,50);
	    	// circleHitArea.x = 32;
	    	// circleHitArea.y = 32;
	    	
	    var circle = new createjs.Bitmap("./img/animals/" + animals[i]);
	    	circle.x = x;
	    	circle.y = y;
	    	circle.regX = 64;
	    	circle.regY = 64;
	    	circle.name = "Circle " + i;
	    	circle.id = i;
	    	circle.cursor = "pointer";
	    	// circle.hitArea = circleHitArea;
	    	circle.addEventListener("click", pressAnimal);

	    container.addChild(circle);
	    items.push( circle );
	}
	selectedItem = items[0];

	// Item Selector
	itemSelector = new createjs.Shape();
	//itemSelector.graphics.beginFill("Grey").drawCircle(0,0,30);
	itemSelector.x = radius;
	itemSelector.name = "Item Selector";
	itemSelector.mouseEnabled = false;

	// Pin
	var pinWheelBtn = new createjs.Shape();
		pinWheelBtn.graphics.beginFill("Grey").drawCircle(188,188,180);

	var pinWheel = new createjs.Bitmap("./img/spinner.png");
		pinWheel.x = -188;
		pinWheel.y = -188;
		pinWheel.hitArea = pinWheelBtn;
		//pinWheel.mouseEnabled = false;

	pin = new createjs.Container();
	pin.targetRotation = 270 + 360;//100 + Math.random() * 3000;
	pin.cursor = "pointer";
	pin.addChild( pinWheel );
	//pin.addChild( pinWheelBtn );
	pin.addChild( itemSelector );
	pin.addEventListener( "click" , spinPin );
	pin.addEventListener( "tick", updateAll );

	container.addChild(pin);

	var creditsHitbox = new createjs.Shape();
		creditsHitbox.graphics.beginFill("Grey").rect(0,0,468,20);

	credits = new createjs.Bitmap("./img/credits.png");
	credits.regX = 248;
	credits.regY = 20;
	credits.hitArea = creditsHitbox;
	credits.cursor = "pointer";
	credits.addEventListener("click" , pressCredits);
	stage.addChild(credits);

	updateStage();
	// Debug
	// debug = new createjs.Shape();
	// debug.graphics.beginFill("Green").drawCircle(1,1,5);
	// debug.name = "Debug";
	// container.addChild(debug);
}

function updateLoader( event )
{
	var amount = .1;
	var accel = 0.01;
	//event.target.rotation += speed;
	var loaderGfx = event.target;

	loaderGfx.scaleX = loaderGfx.scaleY = loaderGfx.scaleX * Math.sin( new Date() * accel ) * amount + 1;
}

function game()
{	
	loader.off;
	stage.removeChild( loader );
	stage.addChild(container);
	stage.update();	
}

function pressCredits()
{
	alert("You know you love it, bb <3");
}

function pressAnimal( event )
{
	audioPlaying = false;
	// console.log("press animal");
	var targetRotation = Math.atan2(event.target.y,event.target.x) * 180 / Math.PI;
		targetRotation = Math.round( targetRotation );

	if(targetRotation <= 0 )
	{
		targetRotation += 360;
	}

	var currentRotations = Math.floor( pin.targetRotation / 360 );
	var finalTargetRotation = currentRotations * 360 + targetRotation;

	if(finalTargetRotation <= pin.targetRotation)
		finalTargetRotation += 360;

	pin.targetRotation = finalTargetRotation + 720;
}

function pullCordOut( event )
{	
	cordImg.x = -97;
	cordImg.y = -193;

	playCordAudio();
	playSelectedAudio( event );
}

function lerp( A, B, t )
{
	return  A + t * (B - A);	
}

function updateAll( event )
{
	updatePin();
	updateSelectedItem();
	updateAnimalSizes();
	updateCord();
}

function updatePin( event )
{
	// Rotation
	if(pin.targetRotation < 0 )
	{
		pin.targetRotation = 0; 
	}else{	
		var ease = .1;
		//var destination = pin.targetRotation - ( pin.targetRotation * accel );
		//pin.rotation += destination;
		//pin.targetRotation -= destination;
		
		pin.rotation = lerp( pin.rotation, pin.targetRotation, ease);

	}

	if(audioPlaying == true)
		pin.targetRotation += 20;
}

function updateSelectedItem()
{
	var clampedRotation = pin.rotation % 360;
	var animalRange = 360 / sounds.length;
	var animalIndex = Math.floor( clampedRotation / animalRange ) + 1;

	if( animalIndex >= sounds.length )
	{
		animalIndex = 0;
	}

	if( animalIndex != selectedItem.id )
	{
		selectedItem = items[animalIndex];
		if(!audioPlaying)
			playSelectionAudio( animalIndex );		
	}

	//console.log( animalIndex );


	// clampedRotation = currentRotation % 360;
	// animalRange = 360 / numAnimals;
	// animalIndex = Math.floor( clampedRotation / animalRange );

	// Detection
	// var distance = Infinity;
	// var selectorPoint = itemSelector.localToGlobal(itemSelector.x,itemSelector.y);
	// var newSelectedItem = selectedItem;

	// for( var i = 0; i < sounds.length; i++ )
	// {
	// 	var currentItem = items[i];
	// 	var currentItemPoint = currentItem.localToGlobal( currentItem.x, currentItem.y );
	// 	var currentDistance = getDistance( currentItemPoint.x, currentItemPoint.y, selectorPoint.x, selectorPoint.y );

	// 	if( currentDistance < distance )
	// 	{
	// 		newSelectedItem = currentItem;
	// 		distance = currentDistance;
	// 	}
	// }

	// if(newSelectedItem != selectedItem)
	// {
	// 	selectedItem = newSelectedItem;
	// 	playSelectionAudio();	
	// }
	// // Debug Detection
	// //console.log( selectedItem.name );



	// if(!debug)
	// 	return;

	// debug.graphics.clear();
	// debug.graphics.setStrokeStyle(1);
	// debug.graphics.beginStroke("Green");
	// debug.graphics.moveTo(0,0);
	// debug.graphics.lineTo( selectedItem.x, selectedItem.y);	
}

function updateAnimalSizes()
{
	var scaleMax = 1.3;
	var accel = 0.3;
	for( var i = 0; i < sounds.length; i++ )
	{
		currentItem = items[i];
		var targetScale = (currentItem != selectedItem)?( 1 ) : ( scaleMax );
		
		currentItem.scaleX -= (currentItem.scaleX - targetScale) * accel;
		currentItem.scaleY -= (currentItem.scaleY - targetScale) * accel;
	}

	// var accel = .98;
	// var destination = pin.targetRotation - ( pin.targetRotation * accel );
	// pin.rotation += destination;
	// pin.targetRotation -= destination;
}

function updateCord()
{
	var accel = 0.1;
	cordImg.x -= ( cordImg.x - origCordPoint ) * accel;
	cordImg.y -= ( cordImg.y - origCordPoint ) * accel;
}

function spinPin( event )
{
	audioPlaying = false;
	playSpinnerAudio();
	pin.targetRotation += 250 + Math.random() * 750;
}

function getDistance( x1, y1, x2, y2 )
{
	var a = x2 - x1;
	var b = y2 - y1;
	var c = Math.sqrt( a*a + b*b );
	return c;
}

function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )		// SPACEBAR
		spinPin();

	if(event.keyCode == 13 )		// ENTER
		pullCordOut();
}	

function updateStage( event )
{
	// if(!container)
	// 	return;
	rescale();

	container.x = window.innerWidth * 0.5;
	container.y = window.innerHeight * 0.5;

	loader.x = container.x;
	loader.y = container.y;

	credits.x = container.x;
	credits.y = window.innerHeight - 40 *credits.scaleY;
	//credits.y = container.y - 40 * credits.scaleX;

    stage.update();    
}

function rescale()
{
	var percent = 1;

	if(stage.canvas.width <= 846)
	{
		percent = stage.canvas.width / 846;
	}else if(stage.canvas.height <= 846)
	{
		percent = stage.canvas.height / 846;
	}

	container.scaleX = container.scaleY = percent;
	loader.scaleX = loader.scaleY = percent;
	credits.scaleX = credits.scaleY	= percent;

	credits.alpha = (stage.canvas.height <= 840)?(0):(1);
}

function resize()
{
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}