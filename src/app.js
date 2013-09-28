var express = require('express')
  , jade    = require('jade')
  , path    = require('path');

var port = 3000;

var app = express();

app.configure(function(){
	app.set('views', __dirname + '/../views');
	app.set('view engine', 'jade');
});

app.use(express.static(__dirname + '/../app'));

app.get('/', function(req, res){
	res.render('index', {title: 'Main'});
});

app.get('/gamepad', function(req, res){
	res.render('gamepad');
});

app.get('/:token', function(req, res){
	var token = req.params.token;
	res.render('room', {token: token});
});

app.listen(port);
