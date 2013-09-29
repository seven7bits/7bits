define(['../lib/module', './views/layout', '../lib/gamepad', './views/game-area', './views/games-list', './collections/games'], function(Module, Layout, Gamepad, GameArea, GamesList, games) {
	return Module.extend({
		setup: function() {
			this.v.layout = new Layout();
			this.options.container.show(this.v.layout);
		},

		setupEvents: function() {

		},

		loadConfig: function(url) {
			var config;

			$.ajax(url, {
				dataType: 'json',
				async: false,
				success: function(result) {
					config = result;
				},
				error: function() {
					console.log(arguments);
				}
			});

			return config;
		},

		actions: {
			index: function() {
				var gameArea  = new GameArea();
				var gamesList = new GamesList({ collection: games });

				this.v.layout.gameArea.show(gameArea);
				this.v.layout.games.show(gamesList);

				Gamepad.configure(this.loadConfig('/config/nes.json'));
				Gamepad.start();
			},

			selectRoom: function(rom) {
				if (!$('canvas').length) {
					this.actions.index();
				}

				var rom = games.findWhere({ name: rom });
				app.trigger('rom:select', rom);
			}
		},

		appRoutes: {
			'': 'index',
			':rom': 'selectRoom'
		}
	});
});
