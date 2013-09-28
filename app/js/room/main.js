define(['../lib/module', './views/layout', '../lib/gamepad'], function(Module, Layout, Gamepad) {
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
				Gamepad.configure(this.loadConfig('/config/nes.json'));
				Gamepad.start();
			}
		},

		appRoutes: {
			'': 'index'
		}
	});
});
