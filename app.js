//var http = require( 'http' ),
    //express = require( 'express' ),
    //fs = require( 'fs' ),
    //app = express();
//var config = require( './config.json' )[ app.get( 'env' )];
//var ig = require( 'instagram-node' ).instagram();

//(function configure_express(){

  //app.configure(function(){
    //app.set( 'view engine', 'jade' );
    //app.set( 'views', './views' );
    //app.use( express.logger({
      //format : 'tiny',
      //stream : fs.createWriteStream( 'app.log', { 'flags' : 'w' } )
    //}));
    //app.use( express.cookieParser() );
    //app.use( express.bodyParser({
      //uploadDir : './public/uploads'
    //}));
    //app.use( express.methodOverride() );
    //app.use( express.session( { secret : config.session_secret } ) );

    //app.use( app.router );
    //app.use( express.static( './public' ));
  
  //});

//})();

//ig.use({
  //client_id : config.instagram.client_id,
  //client_secret : config.instagram.client_secret
//});

//var routes = require( './routes' )( app, ig, config.oauth_redirect_url );

//http.createServer( app ).listen( config.port, function(){

  //console.log( "Express server listening on port " + config.port );

//});

var express = require('express');
var api = require('instagram-node').instagram();
var app = express();
var config = require( './config.json' )[ app.get( 'env' )];
var fs = require( 'fs' );
var http = require( 'http' );
var index = require( './handlers/index' );

app.configure(function(){
  app.set( 'view engine', 'jade' );
  app.set( 'views', './views' );
  app.use( express.logger({
    format : 'tiny',
    stream : fs.createWriteStream( 'app.log', { 'flags' : 'w' } )
  }));
  app.use( express.cookieParser() );
  app.use( express.bodyParser({
    uploadDir : './public/uploads'
  }));
  app.use( express.methodOverride() );
  app.use( express.session( { secret : config.session_secret } ) );

  app.use( app.router );
  app.use( express.static( './public' ));

});

api.use({
  client_id: config.instagram.client_id,
  client_secret: config.instagram.client_secret
});

var redirect_uri = 'http://localhost:3000/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes','basic','comments','relationships'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      req.session.access_token = result.access_token;
      console.log(' logging' );
      res.redirect( '/' );
    }
  });
};

app.get( '/', function( req, res ){

  if( !req.session.access_token ){

    res.render( 'login' );

  } else {

    console.log(' ig_likes' );
    api.user_self_liked( [], function(err, medias, pagination, limit){

      console.log( 'err', err );
      console.log( 'medias', medias[0].images.thumbnail.url );
      console.log( 'pagination', pagination );
      console.log( 'limit', limit );

      res.json({
        media : medias,
        pagination : pagination,
        limit : limit
      });

    });

  }

} );
// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/handleauth', exports.handleauth);

http.createServer(app).listen(config.port, function(){
  console.log("Express server listening on port " + config.port );
});

