exports.index = function( req, res ){

  if( !req.session.access_token ){

    res.render( 'login' );

  } else {

    res.render( 'list', { user : req.session.access_token } );

  }

};
