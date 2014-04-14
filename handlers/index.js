exports.index = function( req, res ){
  //res.send( 'Welcome!' );
  res.jsonp({ message : 'welcome' } );
};
