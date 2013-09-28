module.exports = exports = Gamepad;

var express  = require('express')
  , socketio = require('socket.io')
  , http     = require('http')
  , path     = require('path');

var port = 3000;

var l = function() {
	console.log.apply(console, arguments);
}

function Gamepad() {
	this.express = null;
	this.io = null;
	this.rooms = {};
}

Gamepad.prototype.start = function() {
	this.setupExpress();
	this.setupIO();
	this.listen();
}

Gamepad.prototype.setupExpress = function() {
	this.express = express();

	var that = this;
	this.express.configure(function() {
		that.express.set('views', __dirname + '/../views');
		that.express.set('view engine', 'jade');
	});

	this.express.use(express.static(__dirname + '/../app'));

	this.express.get('/', function(req, res) {
		res.render('index', {title: 'Main'});
	});

	this.express.get('/gamepad', function(req, res) {
		res.render('gamepad');
	});

	this.express.get('/:token', function(req, res) {
		var token = req.params.token;
		res.render('room', {token: token});
	});
}

Gamepad.prototype.setupIO = function() {
	if (!this.express) {
		throw new Error('Express is not initialized.');
	}

	this.ioServer = http.createServer(this.express)
	this.io = socketio.listen(this.ioServer);

	var that = this;

	this.io.sockets.on('connection', function(socket) {
		socket.on('room', function(room) {
			l('Someone joined room:', room);
			socket.join(room);

			if (typeof that.rooms[room] != 'array') {
				that.rooms[room] = [];
			}

			that.rooms[room].push(socket);
		});

		socket.on('disconnect', function() {
			l('Someone disconnected');
		})

		socket.on('a', function(data) {
			that.io.sockets.in(data.room).emit('a', data);
		});
	});
}

Gamepad.prototype.listen = function() {
	this.ioServer.listen(port);
}
