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

		var div = document.createElement("div");
		div.id = "STOP-IT-OVERLAY";
		div.style.display = "table";
		div.style.position = "fixed";
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.top = "-100%";
		div.style.left = "0";
		div.style.background = "rgba(255,0,0,0.8)";
		spookyscary.div = div;
		div.style.verticalAlign = "middle";
		div.style.zIndex = "1000000000000";

		div.innerHTML = "<h1><img src='http://i.imgur.com/lrAIgUj.jpg'></h1>";
		document.body.appendChild(div);

		var h1 = document.querySelector("#STOP-IT-OVERLAY h1")
		h1.style.display = "table-cell";
		h1.style.margin = "0";
		h1.style.padding = "0";
		h1.style.color = "#fff";
		h1.style.fontFamily = "Arial";
		h1.style.textAlign = "center";
		h1.style.verticalAlign = "middle";


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
		spookyscary.audiotimer = setTimeout(spookyscary.stop, 5000);
	}

	spookyscary.play = function(){
		spookyscary.audio.play();
		spookyscary.div.style.top = "0";
	}

	spookyscary.stop = function(){
		spookyscary.audio.pause();
		spookyscary.div.style.top = "100%";
	}

	function initBookmarklet(){
		spookyscary.lastDirectionChangeTime = Date.now();
		addSound();
	}

	initBookmarklet();

	return this;
})()
