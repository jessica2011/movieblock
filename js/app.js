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
        alert('opps');
      }
    });
    $inputSearch.val('');
  }
  function renderMovies(response) {
    var resultCheckboxs = $('#results-checkboxs');
    console.log(response);
    var movies = response.Search;
    var resultsUl = $('#results');
    resultCheckboxs.empty();
    resultsUl.empty();

    // limpiando cheboxs
    $inputSearch.on('click', function() {
      if ($('#prod1').prop('checked')) {
        $('#prod1').click();
        $('#prod1').prop('checked', false);
      }

      if ($('#prod2').prop('checked')) {
        $('#prod2').click();
        $('#prod2').prop('checked', false);
      }

      if ($('#prod3').prop('checked')) {
        $('#prod3').click();
        $('#prod3').prop('checked', false);
      }

      if ($('#prod4').prop('checked')) {
        $('#prod4').click();
        $('#prod4').prop('checked', false);
      }

      if ($('#prod5').prop('checked')) {
        $('#prod5').click();
        $('#prod5').prop('checked', false);
      }

      if ($('#prod6').prop('checked')) {
        $('#prod6').click();
        $('#prod6').prop('checked', false);
      }

      if ($('#prod7').prop('checked')) {
        $('#prod7').click();
        $('#prod7').prop('checked', false);
      }

      if ($('#rated1').prop('checked')) {
        $('#rated1').click();
        $('#rated1').prop('checked', false);
      }

      if ($('#rated2').prop('checked')) {
        $('#rated2').click();
        $('#rated2').prop('checked', false);
      }

      if ($('#rated3').prop('checked')) {
        $('#rated3').click();
        $('#rated3').prop('checked', false);
      }

      if ($('#rated4').prop('checked')) {
        $('#rated4').click();
        $('#rated4').prop('checked', false);
      }
    });

    for (var search in movies) {
      var movie = movies[search];
      var imdbID = movie.imdbID;
      $.getJSON('http://www.omdbapi.com/?apikey=3a181f1c&i=' + imdbID + '&type=movie', function(data) {
        var keys = Object.keys(data);
        console.log(data);
        var word = data[keys[5]];
        console.log(word);
        //  identificando palabra "Family"
        var patt = /Family/g;
        result = patt.test(word);
        console.log(result);
        var wordTwo = data[keys[5]];
        console.log(wordTwo);
        //  identificando palabra "Animation"
        var pattTwo = /Animation/g;
        resultTwo = pattTwo.test(wordTwo);
        console.log(resultTwo);
        console.log(data.Poster);
        if (result === true || resultTwo === true) {
          resultsUl.append(
            '<li class="li-images data-toggle="modal" data-target=' + '"#' + data.imdbID + '">' +
              '<p>' + data.Title + '</p>' +
              '<img class="w-h-example" src="' + data.Poster + '" />' +
            '</li>'
          );
        }
        //  verificando checkboxs
        //  producciones
        var stringProduction = data.Production;
        console.log(stringProduction);
        //  Clasificación
        var stringRated = data.Rated;
        console.log(stringRated);
        //  checkboxs
        $('#prod1').on('click', checked);
        $('#prod2').on('click', checked);
        $('#prod3').on('click', checked);
        $('#prod4').on('click', checked);
        $('#prod5').on('click', checked);
        $('#prod6').on('click', checked);
        $('#prod7').on('click', checked);
        $('#rated1').on('click', checked);
        $('#rated2').on('click', checked);
        $('#rated3').on('click', checked);
        $('#rated4').on('click', checked);
        function checked() {
          resultsUl.hide();
          if (event.target.checked) {
            if (tagProduction(event.target.value, stringProduction) || tagProduction(event.target.value, stringRated)) {
              resultCheckboxs.append(
                '<li class="li-images data-toggle="modal" data-target=' + '"#' + data.imdbID + '">' +
                  '<p>' + data.Title + '</p>' +
                  '<img class="w-h-example" src="' + data.Poster + '" />' +
                '</li>'
              );
              $('#modals').append(
                //   Modal
                '<div class="modal fade" id="' + data.imdbID + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
                  '<div class="modal-dialog modal-dialog-centered" role="document">' +
                    '<div class="modal-content">' +
                      '<div class="modal-header">' +
                        '<h5 class="modal-title" id="exampleModalLongTitle">' + data.Title + '</h5>' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                          '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                      '</div>' +
                      '<div class="modal-body">' +
                        '<img class="w-h-example-mini" src="' + data.Poster + '" />' +
                        '<p>Actors : ' + data.Actors + '</p>' +
                        '<p>Synopsis : ' + data.Plot + '</p>' +
                        '<p>Year : ' + data.Year + '</p>' +
                        '<p>Classification : ' + data.Rated + '</p>' +
                      '</div>' +
                      '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                        '<button type="button" class="btn btn-primary">Save changes</button>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>'
              );
            }
          } else {
            resultsUl.show();
            resultCheckboxs.empty();
          }
        };
      });
    }
  }

  function renderError(error) {
    console.error(error);
  }
});
//  funcion que verifica si coinciden con los checkboxs seleccionados
function tagProduction(nameProduction, string) {
  var regex = new RegExp(nameProduction, 'g');
  result = regex.test(string);
  return result;
  console.log(result);
}
