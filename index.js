var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');


module.exports = function(filepath){
    fs.createReadStream(filepath)
        .pipe(es.split())
        .pipe(es.mapSync(function(line){

            // pause the readstream
            s.pause();

            console.log(line)

            // resume the readstream, possibly from a callback
            s.resume();
        })
        .on('error', function(){
            console.log('Error while reading file.');
        })
        .on('end', function(){
            console.log('Read entire file.')
        })
    );
}
