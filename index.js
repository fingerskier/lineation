var fs = require('fs')
var util = require('util')
var stream = require('stream')
var es = require('event-stream');


module.exports = function(filepath, munger){
	var line_stream = fs.createReadStream(filepath)
		.pipe(es.split())
		.pipe(es.mapSync(function(line){

			// pause the readstream
			line_stream.pause();

			munger(line)

			// resume the readstream, possibly from a callback
			line_stream.resume();
		})
		.on('error', function(err){
			console.error(`ERROR: ${err}`)
		})
		.on('end', function(){
			console.log('Read entire file.')
		})
	)
}
