define(["marionette", "underscore", "room"], function(Marionette, _, Room) {
	return Marionette.AppRouter.extend({
		appRoutes: {},
		initialize: function(options) {
			var room  = new Room(options);

			this.appRoutes  = _.extend(this.appRoutes, room.actions);
			this.controller = _.extend(room.actions);
		}
	});
});
