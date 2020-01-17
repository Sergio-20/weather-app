const request = require( "request" );

const geoCode = ( address, callback ) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent( address ) }.json?access_token=pk.eyJ1IjoibnViZXNnbGFkaXVzIiwiYSI6ImNrNWRodTd4eTF3cDIzbW80YzlsNmcwaXgifQ.-B2KEklqIAkzJajROJ1bYQ&limit=1`;
  
    request( { url, json: true }, ( err, res ) => {

      const { features, query, statusCode } = res.body;
  
      if( err )
      {
        callback( `Unable to connect to the internet. Double check your internet connection.` );
      }
  
      else if( statusCode === 400 || statusCode === 404 )
      {
        callback( `We were unable to acquire the weather data. Please adjust your browser url address according to the structure referred within the MapBox API documentation.` );
      }
  
      else if( features.length <= 0 )
      {
        callback( `We were unable to acquire the weather data for ${ query }. Please double check for spelling errors, or try another location.` );
      }
  
      else
      {
        const latitude = features[0].center[1];//x coordinate
        const longitude = features[0].center[0];//y coordinate
        callback( "No error", {
          latitude,
          longitude,
          location: features[0].place_name
        });
      }
  
    });
  
  };

  module.exports = geoCode;