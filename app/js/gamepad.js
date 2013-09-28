(function(){
	'use strict';

	initializeSockets();
	initializeBindings();

	var socketConnection;


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
		}
	}

	io.on

	function onMouseDown(ev) {
		ev.currentTarget.className = 'mousedown';
		socketConnection.emit('button-state', {button: ev.currentTarget.id, state: 1});
	}

	function onMouseUp(ev) {
		ev.currentTarget.className = '';
		socketConnection.emit('button-state', {button: ev.currentTarget.id, state: 0});
	}


}());