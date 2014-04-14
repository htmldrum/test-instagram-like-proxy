var search = require( './handlers/search' );

module.exports = function( app ){

  app.get( '/search', search.index );
  app.get( '/search_result', search.search_result );

};
