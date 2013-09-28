var express = require('express')
  , path    = require('path');

var port = 3000;

var app = express();
app.use(express.static(__dirname + '/../app'));
app.listen(port);
