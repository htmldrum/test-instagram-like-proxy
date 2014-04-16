var index = require( './handlers/index' );

module.exports = function( app, ig, redirect_url ){

  app.get( '/',  );

  app.get('/authorize_user', function( req, res ){

    res.redirect( ig.get_authorization_url( redirect_url ));
  
  });
  app.get('/handleauth', function(req, res) {
    ig.authorize_user(req.query.code, redirect_url, function(err, result) {
      if (err) {
        console.log(err.body);
        res.send("Didn't work");
      } else {
        req.session.access_token = result.access_token;
        console.log('Yay! Access token is ' + result.access_token);
        res.redirect('/');
      }
    });
  });

};
