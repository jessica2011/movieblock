// Initialize Firebase
var config = {
  apiKey: 'AIzaSyA6UWdnQ4H0zRRmPoBIwmUL3oYVgnpIKH8',
  authDomain: 'moviekids-83182.firebaseapp.com',
  databaseURL: 'https://moviekids-83182.firebaseio.com',
  projectId: 'moviekids-83182',
  storageBucket: 'moviekids-83182.appspot.com',
  messagingSenderId: '194443794929'
};
firebase.initializeApp(config);

var $valEmail = $('#email').val();
var $valPassword = $('#password').val();
var $valEmail2 = $('#email2').val();
var $valPassword2 = $('#password2').val();
var photoUser = $('#photo-user');
var nameUser = $('#name-user');

// Registro de usuarios (signUp)
$('#btn-signUp-js').click(function(event) {
  firebase.auth().createUserWithEmailAndPassword($valEmail, $valPassword)
    .then(function(result) {
      window.location.href = '../index.html';
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

// iniciar sesión de usuario
$('#btn-login-js').click(function() {
  var $valEmail2 = $('#email2').val();
  var $valPassword2 = $('#password2').val();
  firebase.auth().signInWithEmailAndPassword($valEmail2, $valPassword2)
    .then(function(result) {
      // alert('Autentificación correcta');
      window.location.href = '../views/home.html';
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Credenciales Incorrectas, Ingrese Nuevamente');
    });
});

  
// cuenta de Google
function IngresoGoogle() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      window.location.href = '../views/home.html';
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      if (errorcode === 'auth/account-exists-with-different-credential') {
        alert('Es el mismo usuario');
      }
    });
  } else {
    firebase.auth().signOut();
  }
};

$('#btnGoogle').on('click', IngresoGoogle);


// Extraer datos de usuario
var photoUser = $('#photo-user');
var nameUser = $('#name-user');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) 
    // El usuario ha iniciado sesión
  var name = user.displayName;
  var email = user.email;
  var photoUrl = user.photoURL;
  var emailVerified = user.emailVerified;
  var uid = user.uid;
  console.log(user);
  nameUser.text(name);
  photoUser.attr('src', photoUrl);
});

// Cerrar sesión
$('#signOut').on('click', function() {
  firebase.auth().signOut().then(function(user) {
    console.log('saliendo...');
    window.location.href = '../index.html';
  }).catch(function(error) {
    console.log(error);
  });
});

// // Funcion para icono me encanta
// $('.favorite').on('click', function() {
//   $(this).toggleClass('like');
// });


