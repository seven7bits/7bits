define(['../lib/module', './views/layout'], function(Module, Layout) {
	return Module.extend({
		setup: function() {

		},

		setupEvents: function() {

		},

		actions: {
			index: function() {
				alert(1);
			}
		},

		appRoutes: {
			'': 'index'
		}
	});
});
