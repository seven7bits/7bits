define(['backbone', 'lib/app', 'router'], function(Backbone, Application, Router) {
	var app = new Application();

	app.addRegions({
		container: '#container'
	});

	app.addInitializer(function() {
		new Router({ container: app.container });
		Backbone.history.start();
	});

	return app;
});
