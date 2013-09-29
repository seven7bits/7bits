define(function(require) {
	require('nes-ui');
	return require('marionette').ItemView.extend({
		template: '#template-room-game-area',

		nes: null,

		ui: {
			screen: '#screen'
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
				this.ui.screen.load(rom.get('path'), function() {
					app.trigger('gamepad:configure', rom.get('config'));
				});
			} else {
				this.onShow();
				this.nes.ui.loadROM(rom.get('path'));
			}
		},

		onShow: function() {
			this.ui.screen.empty();
			var ui = this.ui.screen.JSNESUI({
				"Homebrew": [
					['Concentration Room', 'roms/croom/croom.nes'],
					['LJ65', 'roms/lj65/lj65.nes'],
					['Bomberman', 'roms/BM/BM.nes'],
					['Captain American','roms/CA/Captain American [p1][!].nes'],
					['Flintstones','roms/FS/Flintstones, The - The Surprise at Dinosaur Peak! (U) [p1][!].nes'],
					['Megaman II','roms/G/Megaman II (U) [!].nes'],
					['Double Dragon','roms/Q/Double Dragon (U) [!].nes'],
					['F-1 Race','roms/W/F-1 Race (J).nes']
				],

				"Working": [
					['Bubble Bobble', 'roms/local-roms/Bubble Bobble (U).nes'],

					['Contra', 'roms/local-roms/Contra (U) [!].nes'],
					['Donkey Kong', 'roms/local-roms/Donkey Kong (JU).nes'],
					['Dr. Mario', 'roms/local-roms/Dr. Mario (JU).nes'],
					['Golf', 'roms/local-roms/Golf (JU).nes'],
					['The Legend of Zelda', 'roms/local-roms/Legend of Zelda, The (U) (PRG1).nes'],
					['Lemmings', 'roms/local-roms/Lemmings (U).nes'],
					['Lifeforce', 'roms/local-roms/Lifeforce (U).nes'],

					['Mario Bros.', 'roms/local-roms/Mario Bros. (JU) [!].nes'],
					['Mega Man', 'roms/local-roms/Mega Man (U).nes'],
					['Pac-Man', 'roms/local-roms/Pac-Man (U) [!].nes'],
					['Super Mario Bros.', 'roms/local-roms/Super Mario Bros. (JU) (PRG0) [!].nes'],
					['Tennis', 'roms/local-roms/Tennis (JU) [!].nes'],
					['Tetris', 'roms/local-roms/Tetris (U) [!].nes'],
					['Tetris 2', 'roms/local-roms/Tetris 2 (U) [!].nes'],
					['Zelda II - The Adventure of Link', 'roms/local-roms/Zelda II - The Adventure of Link (U).nes']
				]
			});

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
