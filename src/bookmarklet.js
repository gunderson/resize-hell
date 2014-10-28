(function(){

	var spookyscary = {
		audiotimer: null,
		resizetimer: null,
		resizeDirection: 0,
		prevResizeDirection: 0,
		prevWindowWidth: window.innerWidth,
		prevWindowHeight: window.innerHeight,
		lastDirectionChangeTime: 0
	};

	function addSound(){
	    var audio = new Audio();
	    audio.preload = "auto";
	    audio.src = 'https://cdn.rawgit.com/gunderson/resize-hell/7f2dd534405bfa42c74ce1991097096495dd3f73/assets/screams.mp3';
	    audio.loop = "true";
		audio.style.opacity = 0;

		spookyscary.audio = audio;

	    var oldResize = window.onresize || function(){};
		window.onresize = function(){
			onResizeBookmarklet();
			oldResize();
		}
	}

	function onResizeBookmarklet(){
		var directionWidth = window.innerWidth - spookyscary.prevWindowWidth;
		var directionHeight = window.innerHeight - spookyscary.prevWindowHeight;
		spookyscary.prevWindowWidth = window.innerWidth;
		spookyscary.prevWindowHeight = window.innerHeight;
		var direction = Math.abs(directionHeight) > Math.abs(directionWidth) ? directionHeight : directionWidth;
		direction = direction > 0 ? 1 : -1;

		if (direction !== spookyscary.resizeDirection){
			if (Date.now() - spookyscary.lastDirectionChangeTime < 500){

				triggerScreams();
			}
			spookyscary.lastDirectionChangeTime = Date.now();
		}
		spookyscary.resizeDirection = direction;
	}

	function triggerScreams(){
		console.log("triggerScreams 0")
		spookyscary.play();
		clearTimeout(spookyscary.audiotimer);
		spookyscary.audiotimer = setTimeout(spookyscary.stop, 4000);
	}

	spookyscary.play = function(){
		spookyscary.audio.play();
	}

	spookyscary.stop = function(){
		spookyscary.audio.pause();
	}

	function initBookmarklet(){
		spookyscary.lastDirectionChangeTime = Date.now();
		addSound();
	}

	initBookmarklet();

	return this;
})()