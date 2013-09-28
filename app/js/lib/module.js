define(function(require) {
	return require('marionette').Controller.extend({
		initialize: function(options) {
			this.m = {}; // Module models
			this.c = {}; // Module collections
			this.v = {}; // Modules views
			this.p = {}; // Module promises

			this.options = options;
			this.bindActions();
			this.setup();
			this.setupEvents();
		},

		bindActions: function() {
			var that = this;

			for (var i in this.actions) {
				this.actions[i] = _.bind(this.actions[i], this);
			}
		},

		// Initialize collections and stuff
		setup: function() {},

		// Bind some awesome event handlers to stuff
		setupEvents: function() {},

		// Module actions
		actions: {},

		// Will be delegated to the main router
		appRoutes: {}
	});
});
