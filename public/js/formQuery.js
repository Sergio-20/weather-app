const log = console.log;

const searchForm = document.querySelector( "#query-form" );

searchForm.addEventListener( "submit", e => {
    e.preventDefault();

    let searchTerm = document.querySelector( "#search" ).value;

    fetch( `/weather?address=${ searchTerm }` )
    .then( (res) => {
      return res.json();  
    })
    .then( (data) => {  

      document.querySelector( ".search-results" ).style.display = "block";
      
      document.querySelector( ".address" ).innerHTML = `You searched for: <span style="color: #cb2728; text-decoration: underline;">${ data[0].address }</span>`;
      document.querySelector( ".location" ).innerHTML = data[0].location;
      document.querySelector( ".forecast" ).innerHTML = data[0].forecast;
    })
    .catch( (err) => {
      log( err );
    });

});