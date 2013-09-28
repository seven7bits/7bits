define(['lib/app', 'router'], function(Application, Router) {
	var app = new Application();

	app.addInitializer(function() {
		alert('Initializer');
	});

	return app;
});
