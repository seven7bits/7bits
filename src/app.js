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

	this.io.sockets.on('connection', function(socket) {
		var player = 0;
		socket.on('room', function(room) {
			l('Someone joined room:', room);
			socket.join(room);

			if (typeof that.rooms[room] != 'array') {
				that.rooms[room] = [];
			} else {
				player = that.rooms[room].length;
			}

			that.rooms[room].push(socket);
		});

		socket.on('disconnect', function() {
			l('Someone disconnected');
		});

		socket.on('a', function(data) {
			data.p = player;
			that.io.sockets.in(data.room).emit('a', data);
		});
	});
};

Gamepad.prototype.listen = function() {
	this.ioServer.listen(port);
};
