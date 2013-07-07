var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

fs.open('./index.html', 'r', function(err, fd) {
	fs.fstat(fd, function(err, stats) {
		var bufferSize = stats.size,
		    buffer = new Buffer(bufferSize);
		fs.read(fd, buffer);
		app.get('/', function(request, response) {
  			response.send(buffer.toString('utc 8', fs.readFileSync("index.html")))});
});
		
	});
	fs.close(fd);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
