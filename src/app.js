module.exports = exports = Gamepad;

var express  = require('express')
  , socketio = require('socket.io')
  , detect   = require('detectmobilebrowsers')
  , http     = require('http')
  , path     = require('path');

var port = process.env.PORT || 3000;

var l = function() {
	console.log.apply(console, arguments);
};

function Gamepad() {
	this.express = null;
	this.io = null;
	this.rooms = {};
}

Gamepad.prototype.start = function() {
	this.setupExpress();
	this.setupIO();
	this.listen();
};

Gamepad.prototype.setupExpress = function() {
	this.express = express();

	var that = this;
	this.express.configure(function() {
		that.express.set('views', __dirname + '/../views');
		that.express.set('view engine', 'jade');
	});

	this.express.use(express.static(__dirname + '/../app'));
	this.express.use(detect.is_mobile());

	this.express.get('/', function(req, res) {
		res.render('index', {title: 'Main'});
	});

	this.express.get('/:token', function(req, res) {
		var data = { token: req.params.token };

		if (req.is_mobile) {
			res.render('gamepad', data);
		} else {
			res.render('room', data);
		}

	});
};

Gamepad.prototype.setupIO = function() {
	if (!this.express) {
		throw new Error('Express is not initialized.');
	}

	this.ioServer = http.createServer(this.express);
	this.io = socketio.listen(this.ioServer);

	var that = this;

	var seat = function(room, group, socket) {
		var guys = that.rooms[room][group];

		for (var i in guys) {
			if (null === guys[i]) {
				guys[i] = socket;
				return i;
			}
		}

		guys.push(socket);
		return guys.length - 1;
	};

	this.io.sockets.on('connection', function(socket) {
		var player, room, group;

		socket.on('room', function(data) {
			room  = data.room;
			group = data.group;

			console.log('Join (', group, ') room: ', room);
			socket.join(room);

			if (!that.rooms[room]) {
				that.rooms[room] = { viewers: [], players: [] };
			}

			player = seat(room, group, socket);

			if ('players' == group) {
				that.io.sockets.in(room).emit('status', { user: player, status: 1 });
			}

			if ('viewers' == group) {
				if (that.rooms[room].players[0]) {
					that.io.sockets.in(room).emit('status', { user: 0, status: 1 });
				}

				if (that.rooms[room].players[1]) {
					that.io.sockets.in(room).emit('status', { user: 1, status: 1 });
				}
			}
		});

		var remove = function() {
			that.rooms[room][group][player] = null;

			if ('players' == group) {
				that.io.sockets.in(room).emit('status', { user: player, status: 0 });
			}
		};

		socket.on('disconnect', remove);
		socket.on('error', remove);
		socket.on('connect_failed', remove);

		socket.on('a', function(data) {
			data.p = player;
			that.io.sockets.in(room).emit('a', data);
		});
	});
};

Gamepad.prototype.listen = function() {
	this.ioServer.listen(port);
};
