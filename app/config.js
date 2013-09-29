requirejs.config({
    baseUrl: 'js',
	paths: {
		'io': '../vendor/socket.io-client/dist/socket.io.min',
		'jquery': '../vendor/jquery/jquery',
		'underscore': '../vendor/underscore-amd/underscore',
		'backbone': '../vendor/backbone/backbone',
		'marionette': '../vendor/marionette/lib/backbone.marionette',
		'nes': '../vendor/jsnes/source/nes',
		'nes-ui': 'jsnes/ui',
	},

	shim: {
		'marionette': {
			'deps': ['backbone'],
			'exports': 'Marionette'
		},

		'backbone': {
			'deps': ['underscore', 'jquery'],
			'exports': 'Backbone'
		},

		'nes': ['jquery'],

		'../vendor/jsnes/lib/dynamicaudio-min': ['nes'],
		'../vendor/jsnes/source/utils': ['nes'],
		'../vendor/jsnes/source/cpu': ['nes'],
		'../vendor/jsnes/source/keyboard': ['nes'],
		'../vendor/jsnes/source/mappers': ['nes'],
		'../vendor/jsnes/source/papu': ['nes'],
		'../vendor/jsnes/source/ppu': ['nes'],
		'../vendor/jsnes/source/rom': ['nes'],

		'nes-ui': [
			'../vendor/jsnes/lib/dynamicaudio-min',
			'../vendor/jsnes/source/utils',
			'../vendor/jsnes/source/cpu',
			'../vendor/jsnes/source/keyboard',
			'../vendor/jsnes/source/mappers',
			'../vendor/jsnes/source/papu',
			'../vendor/jsnes/source/ppu',
			'../vendor/jsnes/source/rom'
		]
	},

	packages: [
		'room'
	]
});

require(['app'], function(app) {
	this._.templateSettings = {
		'evaluate': /\{\{(.+?)\}\}/g,
		'interpolate': /\{\{=(.+?)\}\}/g,
		'escape': /\{\{-(.+?)\}\}/g
	};
	window.app = app;
	app.start();
});
