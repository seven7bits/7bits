define(function(require) {
	require('nes-ui');
	return require('marionette').ItemView.extend({
		template: '#template-room-game-area',

		nes: null,

		ui: {
			screen: '#screen',
			nes: '#nes-screen'
		},

		events: {
			'click .pause': 'pause',
			'click .reset': 'reset',
			'click .sound': 'sound',
			'click .expand': 'expand',
		},

		pause: function(e) {
			if (this.nes.isRunning) {
				this.nes.stop();
				$(e.target).html('release');
			}
			else {
				this.nes.start();
				$(e.target).html('pause');
			}
		},

		reset: function() {
			this.nes.reloadRom();
			this.nes.start();
		},

		sound: function(e) {
			if (this.nes.opts.emulateSound) {
				this.nes.opts.emulateSound = false;
				$(e.target).html('sound: off');
			}
			else {
				this.nes.opts.emulateSound = true;
				$(e.target).html('sound: on');
			}
		},

		expand: function() {
			this.small();
			var element = $('canvas').get(0);
			if(element.requestFullScreen) {
				element.requestFullScreen();
			} else if(element.webkitRequestFullScreen ) {
				element.webkitRequestFullScreen();
			} else if(element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			}

			var difY = screen.height / element.height;
			element.style.webkitTransform = "scale(" + difY + ")";
		},

		exitFullScreen: function() {
			$('canvas').get(0).style.webkitTransform = "scale(1.0)";
		},

		initialize: function() {
			this.listenTo(app, 'rom:select', this.selectRoom);
		},

		selectRoom: function(rom) {
			if (rom.get('type') === 'js') {
				this.ui.nes.hide();
				this.ui.screen.show();
				this.ui.screen.load(rom.get('path'), function() {
					app.trigger('gamepad:configure', rom.get('config'));
				});
			} else {
				this.ui.nes.show();
				this.ui.screen.hide();
				this.nes.ui.loadROM(rom.get('path'));
			}
		},

		onShow: function() {
			this.ui.nes.empty();
			var ui = this.ui.nes.JSNESUI();

			this.nes = new JSNES({
				'swfPath': '/vendor/jsnes/lib/',
				'ui': ui
			});

			var that = this;
			window.nesKeyboard = function() {
				that.nes.keyboard.setKey.apply(that.nes.keyboard, arguments);
			}

			this.big();
		},

		big: function() {
			$('canvas').css({
				width: '512px',
				height: '480px'
			});
		},

		small: function() {
			$('canvas').css({
				width: '256px',
				height: '240px'
			});
		}
	});
});
