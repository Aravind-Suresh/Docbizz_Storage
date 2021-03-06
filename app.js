var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
	dest: './public/uploads/',
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path);
	}
}));

app.post('/', function (req, res) {
	debugger;
	if(req.body.compress) {
		debugger;
		var settings = require('./settings');
		var util = require('./util');
		var loc = req.files.uploadedFile.path;
		debugger;
		util.shellExecLine('convert -quality ' + settings.files.pictures.STANDARD_QUALITY + ' ' + loc + ' ' + loc).then(function(result) {
			debugger;
			res.end(JSON.stringify({result: true, url:'http://54.169.241.197/uploads/' + req.files.uploadedFile.name}));
		});
	}
	else {
		debugger;
		res.end(JSON.stringify({result: true, url:'http://54.169.241.197/uploads/' + req.files.uploadedFile.name}));
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


module.exports = app;
