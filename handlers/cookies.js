exports.counter_cookie_sessions = function( req, res ){

  // After enabling cookie sesions
  // app.use( express.cookieSession({                                  // Must be after cookieParser declaration
  // 
  //   key : 'stupid_app_session_name',
  //   // Additional options
  //     // key Name of the cookie. Defaults to connect.sess.
  //     // secret Secret for signing the session. Required if
  //     // cookieParser is not initialized with one.
  //     // cookie Session cookie settings. Regular cookie defaults apply.
  //     // proxy To trust the reverse proxy or not. Defaults to false.
  // 
  // })); 
  // req.session can be used as a dict for hiding vars

  res.send( req.session );
  
};

exports.counter_signed = function( req, res ){

  var count = req.signedCookies.count || 0;

  count = parseInt( count, 10 ) + 1;

  res.cookie( 'count', count, { signed : true } ); // Default is to expire cookies on session end

  res.send( 'Count: ' + count );
  
};

exports.counter = function( req, res ){

  var count = req.cookies.count || 0;

  count = parseInt( count, 10 ) + 1;

  // 3rd arg to res.cookie can be an object of options
  // Options are as follows
  // domain Domain name for the cookie. Defaults to the domain name loaded.
  // path Path for the cookie. Defaults to "/".
  // secure Marks the cookie to be used with HTTPS only.
  // expires Expiry date of the cookie in GMT. If not specified or set to 0, creates a
  // session cookie.
  // maxAge Convenient option for setting the expiry time relative to the current
  // time in milliseconds.
  // httpOnly Flags the cookie to be accessible only to the web server. It helps
  // prevent XSS attacks by disallowing client-side JavaScript access to it.
  // signed Indicates if the cookie should be signed. Signed cookies cannot be
  // tampered with without invalidating them.

  res.cookie( 'count', count ); // Default is to expire cookies on session end

  res.send( 'Count: ' + count );
  
};
