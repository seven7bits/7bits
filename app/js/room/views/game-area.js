define(function(require) {
	require('nes-ui');
	return require('backbone').View.extend({
		onShow: function() {
			var ui = $('#game-area').JSNESUI({
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

			var nes = new JSNES({
				'swfPath': '/vendor/jsnes/lib/',
				'ui': ui
			});

			$('canvas').animate({
				width: '512px',
				height: '480px'
			});

			window.nesKeyboard = function() {
				nes.keyboard.setKey.apply(nes.keyboard, arguments);
			}
		}
	});
});
