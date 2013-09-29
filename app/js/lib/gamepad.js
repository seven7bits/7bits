define(function(require) {
	var io = require('io');
	return {
		ioServer: 'http://127.0.0.1:3000',
		config: null,

		room: function() {
			return window.location.href.split('/').pop().split('#').shift();
		},

		configure: function(config) {
			this.config = config;
			this.method = this.resolveMethod();
		},

		resolveMethod: function() {
			var method = window;
			var path   = this.config.method.split('.');

			for (i in path) {
				method = method[path[i]];
			}

			return method;
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
				that.io.emit('room', { room: that.room(), group: 'viewers' });
			});

			this.io.on('status', function(data) {
				app.trigger('user:status', data.user, data.status);
			});

			this.io.on('a', function(a) {
				that.trigger(a.p, a.k, a.s);
			});
		},

		trigger: function(player, key, state) {
			console.log(arguments);
			var args = this.config["" + player][key].args;
			args[1]  = state;

			this.method.apply(this, args);
		}
	};
});
