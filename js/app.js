$(document).ready(function() {
  var $inputSearch = $('#title');
  var $btnSearch = $('#searchBtn');
  $btnSearch.click(searchByTitle);
  function searchByTitle() {
    var movieTitle = $inputSearch.val();
    var url = 'http://www.omdbapi.com/?s=' + movieTitle + '&apikey=3a181f1c';
    
    $.ajax({
      url: url,
      success: renderMovies,
      error: function() {
      }
    });
  }
  function renderMovies(response) {
    console.log(response);
    var movies = response.Search;
    var resultsUl = $('#results');
    var details = $('#description');
    resultsUl.empty();

    for (var m in movies) {
      var movie = movies[m];
      var title = movie.Title;
      var imdbID = movie.imdbID;
      var poster = movie.Poster;
      

      console.log([title, imdbID, poster]);

      var liMovie = $('<li class="list-group-item">');
      var posterImg = $('<img class="poster-movie" src="' + poster + '" />');
      liMovie.append(posterImg);
      liMovie.append(title);
      resultsUl.append(liMovie);
    }
  }
  function renderError(error) {
    console.error(error);
  }
});