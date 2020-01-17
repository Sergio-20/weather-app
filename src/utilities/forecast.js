//NPM Packages
const request = require( "request" );


const forecast = ( lat, long, callback ) => {

    const url = `https://api.darksky.net/forecast/5dbb8aceac436233245ecf1a4aa27213/${ lat }, ${ long }`;

    request( { url, json: true }, ( err, res ) => {

      const { daily, currently, code } = res.body;
    
      if( err )
      {
        callback( `Unable to connect to the internet. Double check your internet connection.` );
      }

      else if( code === 400 || code === 404 )
      {
        callback( `Unable to find the location provided. Please double check your spelling or try another location.` );
      }

      else
      {
        callback( "No error", `${ daily.data[0].summary } It is currently, ${ currently.temperature }℉ , Moreover, there is a ${ currently.humidity }% chance of rain today.` );
      }
    
    }); 

};

module.exports = forecast;