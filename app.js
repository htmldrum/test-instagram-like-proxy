var http = require( 'http' );
var express = require( 'express' );
var fs = require( 'fs' );
var app = express();
var config = require( './config.json' )[ app.get( 'env' )];

app.use( app.router );

app.set( 'view engine', 'jade' );
app.set( 'views', './views' );

app.use( express.static( './public' ));

app.use( express.logger({
  format : 'tiny',
  stream : fs.createWriteStream( 'app.log', { 'flags' : 'w' } )
}));

var routes = require( './routes' )( app );

http.createServer( app ).listen( 3000, function(){

  console.log( 'Express app started.' );

});
