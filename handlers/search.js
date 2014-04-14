exports.index = function( req, res ){
  res.render( 'search', { title : "Search" } );
};

exports.search_result = function( req, res ){
  var name = req.query.name,
      source = req.query.source;

  console.log( 'Searching for: ' + name + '. From: ' + source );

  res.send( name + ' : ' + source );

};
