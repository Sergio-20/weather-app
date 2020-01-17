//Core Modules
const path = require( "path" );


//NPM Modules
const express = require( "express" );
const hbs = require( "hbs" );

//Custom Modules
const forecast = require( "./utilities/forecast.js" );
const geoCode = require( "./utilities/geocode.js" );
const log = console.log;

//Define paths for Express config
const partialsPath = path.join( __dirname, "../templates/partials" );
const publicDir = path.join( __dirname, "../public" );
const viewsPath = path.join( __dirname, "../templates/views" );

//Express and Port references
const app = express();
const port = process.env.PORT || 3000;


app.set( "view engine", "hbs" );
app.set( "views", viewsPath );

hbs.registerPartials( partialsPath );

//Setup the static directory to serve
app.use( express.static( publicDir ) );


app.get( "", ( req, res ) => {
    res.render( "index", {
        title: "Weather"
    }); 
});

app.get( "/about", ( req, res ) => {
    res.render( "about", {
        title: "About",
        author: "Sergio G."
    });
});

app.get( "/help", ( req, res ) => {
    res.render( "help", {
        title: "Help",
        helpText: "Below you will find articles and answers to some of most common FAQs."
    });
});


app.get( "/weather", ( req, res ) => {

    if( !req.query.address )
    {
      return res.send( [{
        error: "You must provide an address."
       }] 
      );
    }

    geoCode( req.query.address, ( err, data ) => {

        if( err !== "No error" ) return res.send( [{ error: err }] );

        const { latitude, longitude, location } = data;
    
        forecast( latitude, longitude, ( err, forecastData ) => {
    
        if( err !== "No error" ) return res.send( [{ error: err }] );
    
          res.send( [{
             forecast: forecastData,
             location, 
             address: req.query.address
           }] 
          );
    
        });
    
      });

});


app.get( "/help/*", ( req, res ) => {
    res.render( "404-help", {
        title: "Page Not Found"
    });
});

app.get( "*", ( req, res ) => {
    res.render( "404", {
        title: "Page Not Found"
    });
});


//Start the server up on port 3000
app.listen( port, () => {
    log( `Server running on port: ${ port }` );
});