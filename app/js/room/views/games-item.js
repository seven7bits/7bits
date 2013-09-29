define(function(require) {
	return require("marionette").ItemView.extend({
		tagName: 'div',
		template: "#template-room-games-item"
	});
});
