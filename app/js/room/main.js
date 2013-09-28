define(['../lib/module', './views/layout'], function(Module, Layout) {
	return Module.extend({
		setup: function() {
			this.v.layout = new Layout();
			this.options.container.show(this.v.layout);
		},

		setupEvents: function() {

		},

		actions: {
			index: function() {

			}
		},

		appRoutes: {
			'': 'index'
		}
	});
});
