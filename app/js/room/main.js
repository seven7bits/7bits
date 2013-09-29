define(['../lib/module', './views/layout', '../lib/gamepad', './views/game-area', './views/games-list', './collections/games', './views/qr', './views/stats'], function(Module, Layout, Gamepad, GameArea, GamesList, games, QR, Stats) {

	return Module.extend({
		setup: function() {
			this.v.layout = new Layout();
			this.options.container.show(this.v.layout);
		},

		setupEvents: function() {
			this.listenTo(app, 'gamepad:configure', this.configureGamepad);
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

		configureGamepad: function(config) {
			Gamepad.configure(this.loadConfig(config));
		},

		actions: {
			index: function() {
				var gameArea  = new GameArea();
				var gamesList = new GamesList({ collection: games });
				var qr = new QR();
				var stats     = new Stats();

				this.v.layout.gameArea.show(gameArea);
				this.v.layout.games.show(gamesList);
				this.v.layout.stats.show(stats);
				this.v.layout.qr.show(qr);

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
