$(document).ready(function() {
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

  $(document).ready(function() {
    var $valEmail = $('#email').val();
    var $valPassword = $('#password').val();

    firebase.auth().createUserWithEmailAndPassword($valEmail, $valPassword).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

    firebase.auth().signInWithEmailAndPassword($valEmail, $valPassword).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
      // ...
      } else {
      // User is signed out.
      // ...
      }
    });
    // Registro de usuarios (signUp)
    $('#btn-signUp-js').click(function(event) {
      // event.preventDefault();

      firebase.auth().createUserWithEmailAndPassword($valEmail, $valPassword)
        .then(function(result) {
          alert('Autentificación correcta');
          // window.location.href = '../../index.html';
        // verifyAccount();
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          alert('Ya está registrado');
        });
    });

    // iniciar sesión de usuario
    $('#btn-login-js').click(function() {
      var $valEmail2 = $('#email2').val();
      var $valPassword2 = $('#password2').val();
      firebase.auth().signInWithEmailAndPassword($valEmail2, $valPassword2)
        .then(function(result) {
          alert('Autentificación correcta');
          // window.location.href = '../views/home/index.html';
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert('Credenciales Incorrectas, Ingrese Nuevamente');
        });
    });

    function IngresoGoogle() {
      if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          // Informacion del usurio resgistrado
          var user = result.user;
          // window.location.href = 'home.html';
        }).catch(function(error) {
          // Manejo de errores
          var errorCode = error.code;
          var errorMessage = error.message;
          // El correo electrónico utilizado de la cuenta del usuario
          var email = error.email;
          // El firebase.auth.AuthCredential tipo que se utilizado
          var credential = error.credential;
          if (errorcode === 'auth/account-exists-with-different-credential') {
            alert('Es el mismo usuario');
          }
        });
      } else {
        firebase.auth().signOut();
      }
    };
    
    $('#signInButtonG').on('click', IngresoGoogle);
  });

  // Funcion para extraer datos de usuario
  var $username = $('#user');
  // var $userEmail = $('.directionMail');
  var $profilePhoto = $('#usernew');
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // El usuario ha iniciado sesión
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      var emailVerified = user.emailVerified;
      var uid = user.uid;
      console.log(user);
      $username.text(name);
      // $userEmail.text(email);
      $profilePhoto.attr('src', photoUrl);
    } else {
      // Ningún usuario ha iniciado sesión
    }
  });
  
  // Función para cerrar sesión
  $('#signOut').on('click', function() {
    // console.log('funciona');
    firebase.auth().signOut().then(function(user) {
      // Salida exitosa
      console.log('saliendo');
      // window.location.href = 'login.html';
    }).catch(function(error) {
      // Un error sucedido
      console.log(error);
    });
  });
});
