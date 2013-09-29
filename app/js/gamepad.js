(function(){
	'use strict';

	initializeSockets();
	initializeBindings();

	var socketConnection;

	var menu = document.getElementById('menu');

	function room() {
		return window.location.href.split('/').pop();
	}

	function initializeSockets(){
		socketConnection = io.connect(window.location.host, {
			'reconnect': true,
			'reconnection delay': 5000,
			'max reconnection attempts': 100
		});


		socketConnection.on('connect', function() {
			socketConnection.emit('room', { room: room(), group: 'players' });
		});
	}

	function initializeBindings(){
		var controlsList = ['up', 'down', 'left', 'right', 'select', 'start', 'full-screen', 'a', 'b', 'aa', 'bb'];
		var controlsEls = [];

		for (var i = 0; i < controlsList.length; i++) {
			var id = controlsList[i]; 
			var el = document.getElementById(id);
			$$('#' + id).on('touchstart', onTouchStart);
			$$('#' + id).on('touchend', onTouchEnd);
		}
		$$('body').swipeRight(function(ev){toggleMenu(ev, true);});
		$$('body').swipeLeft(function(ev){toggleMenu(ev, false);});
	}


	function onTouchStart(ev) {
		ev.currentTarget.className = 'mousedown';
		socketConnection.emit('a', {k: ev.currentTarget.id, s: 1});
	}

	function onTouchEnd(ev) {
		ev.currentTarget.className = '';
		socketConnection.emit('a', {k: ev.currentTarget.id, s: 0});
	}

	function toggleMenu(ev, isShown) {
		if (isShown){
			menu.className = 'shown';
		} else {
			menu.className = '';
		}
		socketConnection.emit('a', {s: isShown});
	}

}());
