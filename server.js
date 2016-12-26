// Required Modules
var http = require('http');
var url = require('url');
var path = require('path');
const fs = require('fs');

// Array of Mime Types
const mimeTypes = {
	"html": "text/html",
	"jpeg": "images/jpeg",
	"jpg": "images/jpeg",
	"png": "images/png",
	"js": "text/javascript",
	"css": "text/css"
};


const server = http.createServer(function(req, res){
	const uri = url.parse(req.url).pathname;
	const fileName = path.join(process.cwd(),unescape(uri));
	console.log('Loading '+ uri);
	var stats;

	try {
		stats = fs.lstatSync(fileName);
	} catch(e){
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}

	// Check if file/directory
	if (stats.isFile()){
		const mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200, {'Content-Type': mimeType});

		const fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	} else if (stats.isDirectory()){
		res.writeHead(302, {
			'Locantion': 'index.html'
		});
		res.end();
	} else {
		res.writeHead(500, {'Content-Type': 'text/plain'});
		res.write('500 Internal Error\n');
		res.end();
	}
}).listen(3000);











