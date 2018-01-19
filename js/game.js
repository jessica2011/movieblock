$(document).ready(begin);

function begin() {
  $('#btn-stop').hide();
  var randomMovieArray = ['tt0114709', 'tt2096673', 'tt0389790', 'tt1576379', 'tt0119282', 'tt0351283', 'tt0113497', 'tt4116284', 'tt0268380', 'tt2294629', 'tt0266543', 'tt1484922', 'tt0313255', 'tt0117008', 'tt0362165', 'tt0465997', ];

  function apiCall() {
    var randomNumber = Math.floor((Math.random() * randomMovieArray.length));
    var randomMovie = randomMovieArray[randomNumber];
    console.log(randomMovie);
    $.getJSON('http://www.omdbapi.com/?i=' + encodeURI(randomMovie) + '&apikey=3a181f1c').then(function(response) {
      var image = response.Poster;

      if (image !== 'N/A') {
        $('#img').attr('src', image);
        $('#name-movie').text(response.Title);
        $('#img-movie').attr('src', image);
        $('#actors-movie').text('Actors : ' + response.Actors);
        $('#plot-movie').text('Synopsis : ' + response.Plot);
        $('#year-movie').text('Year : ' + response.Year);
        $('#rated-movie').text('Classification : ' + response.Rated);
      }
    });
  }

  $('#btn-change').on('click', function() {
    $('#btn-change').hide();
    $('#btn-stop').show();
    apiCall();
    var change = setInterval(apiCall, 150);
    $('#btn-stop').on('click', function() {
      $('#btn-stop').hide();
      $('#btn-change').show();
      clearInterval(change);
    });
  });
}
