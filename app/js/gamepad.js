(function(){
	'use strict';

	initializeSockets();
	initializeBindings();

	var socketConnection;

	var menu = document.getElementById('menu');

	function initializeSockets(){
		socketConnection = io.connect('ws://127.0.0.1:3000', {
			'reconnect': true,
			'reconnection delay': 5000,
			'max reconnection attempts': 100
		});
	}

	function initializeBindings(){
		var controlsList = ['up', 'down', 'left', 'right', 'select', 'start', 'full-screen', 'a', 'b', 'aa', 'bb'];
		var controlsEls = [];

		for (var i = 0; i < controlsList.length; i++) {
			var id = controlsList[i]; 
			var el = document.getElementById(id);
			el.onmousedown = onMouseDown;
			el.onmouseup = onMouseUp;
			el.onmouseout = onMouseUp;
		}
		Hammer(document.body).on("swiperight", function(ev){ toggleMenu(ev, true);});
		Hammer(document.body).on("swipeleft", function(ev){ toggleMenu(ev, false);});
	}


	function onMouseDown(ev) {
		ev.currentTarget.className = 'mousedown';
		socketConnection.emit('a', {k: ev.currentTarget.id, s: 1});
	}

	function onMouseUp(ev) {
		ev.currentTarget.className = '';
		socketConnection.emit('a', {k: ev.currentTarget.id, s: 0});
	}

	function toggleMenu(ev, isShown) {
		// toggleMenu.isShown = !Boolean(toggleMenu.isShown);
		if (isShown){
			menu.className = 'shown';
		} else {
			menu.className = '';
		}
		socketConnection.emit('m', {s: isShown});
	}
	


}());
