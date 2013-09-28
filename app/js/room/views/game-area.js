define(function(require) {
	require('nes-ui');
	return require('backbone').View.extend({
		onShow: function() {
			var ui = $('#game-area').JSNESUI({
				"Homebrew": [
					['Concentration Room', '/vendor/jsnes/roms/croom/croom.nes'],
					['LJ65', '/vendor/jsnes/roms/lj65/lj65.nes']
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
