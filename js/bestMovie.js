$(document).ready(begin);

function begin() {
  var movies = ['ferdinand', 'coco', 'cars+3', 'the+lego+batman+movie', 'the+boss+baby'];

  for (var i = 0 ; i < movies.length; i++) {
    var best = movies[i];

    $.getJSON('http://www.omdbapi.com/?t=' + best + '&apikey=3a181f1c').then(function(response) {
      var boxMovies = $('.box-movies');  
      var image = response.Poster;
   
      boxMovies.append('<img class="img-movies tt" data-toggle="modal" data-target="#modal-info" src=' + image + '>');
      $('#name-movie').text(response.Title);
      $('#img-movie').attr('src', image);
      $('#actors-movie').text('Actors : ' + response.Actors);
      $('#plot-movie').text('Synopsis : ' + response.Plot);
      $('#year-movie').text('Year : ' + response.Year);
      $('#rated-movie').text('Classification : ' + response.Rated);
    });
  }
}
