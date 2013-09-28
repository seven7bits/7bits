define(function(require) {
	return require('marionette').Layout.extend({
		template: '#template-layout',
		regions: {
			games: '#games',
			gameArea: '#game-area',
			stats: '#stats',
			chat: '#chat'
		}
	});
});
