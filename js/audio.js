// VARIABLES
var audioPath = "./audio/";
var audioReady = false;
var audioPlaying = false;
var sounds = [
	["Turtle.mp3"],
	["Sheep.mp3"],
	["Turkey.mp3"],
	["Horse.mp3"],
	["Pig.mp3"],
	["Wolf.mp3"],
	["Frog.mp3"],
	["Cat.mp3"],
	["Duck.mp3"],
	["Cow.mp3"],
	["Chicken.mp3"],
	["Dog.mp3"]
];
var soundEffects =
[
    {id:"Cord", src:"whip2.mp3"},
    {id:"Spinner", src:"spinner.mp3"},
    {id:"Selection", src:"selector.mp3"}
];
var animalSoundInstance;

// FUNCTIONS
function preloadAudio()
{
	// if (!createjs.Sound.initializeDefaultPlugins())
	// {
	// 	alert("This browser cannot play audio."); 
	// 	return; 
	// }

    createjs.Sound.on("fileload", audioLoaded);
	createjs.Sound.registerSounds(soundEffects, audioPath);

	var manifest = new Array;
	for(var i = 0; i< sounds.length; i++)
	{
		for( var a = 0; a < sounds[i].length; a++)
		{
			var sound = {
				id : "sound_"+i+"_"+a,
				src : audioPath + "animals/" + sounds[i][a]
			};
			manifest.push( sound );
		}
	}

	var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.addEventListener("complete", audioLoaded);
		queue.loadManifest(manifest);
}

function audioLoaded( event )
{
	audioReady = true;

	//console.log("Sounds Loaded");
	//createjs.Sound.play(event.src);
}

function audioComplete( event )
{
	//console.log(event.target);
	event.target.off();
	event.target.destroy();
}

function getRandomSound( id )
{
	
	var sound = "sound_" + id + "_" + Math.floor((Math.random() * sounds[id].length)).toString();	
	return sound;
}

function selectedAudioComplete( event )
{
	audioPlaying = false;
}

function playSelectedAudio( event )
{
	if(!audioReady)
		return;

	var sound = getRandomSound( selectedItem.id );	// needs to be replaced with real id

	audioPlaying = true;	
	//console.log("Play Audio: " + sound );
	if(animalSoundInstance)
		animalSoundInstance.destroy();

	animalSoundInstance = createjs.Sound.play( sound );
	animalSoundInstance.on("complete", selectedAudioComplete );
}

//var audioSelectionInstance;

function playSelectionAudio()
{
	if(!audioReady)
		return;

	// if( audioSelectionInstance )
	// {
	// 	audioSelectionInstance.destroy();
	// }

	//audioSelectionInstance = createjs.Sound.play("Selection");
	//audioSelectionInstance.volume = 0.5;
	//audioSelectionInstance.on("complete", this.handleComplete, this);
}

function playSpinnerAudio()
{
	if(!audioReady)
		return;

	//createjs.Sound.play("Spinner");
}

function playCordAudio()
{
	if(!audioReady)
		return;

	createjs.Sound.play("Cord");	
}