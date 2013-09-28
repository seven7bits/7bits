define(function(require) {
	var io = require('io');
	return {
		ioServer: 'http://127.0.0.1:3000',
		config: null,

		room: function() {
			return window.location.href.split('/').pop();
		},

		configure: function(config) {
			this.config = config;
		},

		start: function() {
			if (!this.config) {
				throw new Error('Key mapping config is required.');
			}

			this.listen();
		},

		listen: function() {
			var that = this;
			this.io = io.connect(this.ioServer);

			this.io.on('connect', function() {
				that.io.emit('room', that.room());
			});

			this.io.on('a', function(a) {
				this.trigger(a.player, a.key);
			});
		},

		trigger: function(player, key) {
			var c = this.config[player][key];

			var method  = c.method ? c.method : this.config.base.method;
			var context = c.context ? c.context : this.config.base.context;
			var args    = c.args ? c.args : this.config.base.args;

			method.apply(context, args);
		}
	};
});
