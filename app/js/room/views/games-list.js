define(function(require) {
	return require("marionette").CompositeView.extend({
		template: "#template-room-games",
		itemView: require("./games-item"),
		itemViewContainer: ".container"
	});
});
