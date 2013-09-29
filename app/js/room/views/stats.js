define(function(require) {
	return require('marionette').ItemView.extend({
		template: '#template-room-stats',

		ui: {
			'user-0': '.user-0',
			'user-1': '.user-1'
		},

		initialize: function() {
			this.listenTo(app, 'user:status', this.setUserStatus);
		},

		setUserStatus: function(user, status) {
			var user = 'user-' + user;
			if (status) {
				this.ui[user].addClass('on').removeClass('off').html('online');
			} else {
				this.ui[user].addClass('off').removeClass('on').html('offline');
			}
		}
	});
});
