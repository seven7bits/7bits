requirejs.config({
    baseUrl: 'js',
	paths: {
		'io': '../vendor/socket.io-client/dist/socket.io.min',
		'jquery': '../vendor/jquery/jquery',
		'underscore': '../vendor/underscore-amd/underscore',
		'backbone': '../vendor/backbone/backbone',
		'marionette': '../vendor/marionette/lib/backbone.marionette'
	},

	shim: {
		'marionette': {
			'deps': ['backbone'],
			'exports': 'Marionette'
		},

		'backbone': {
			'deps': ['underscore', 'jquery'],
			'exports': 'Backbone'
		}
	},

	packages: [
		'room'
	]
});

require(['app'], function(app) {
	window.app = app;
	app.start();
});
