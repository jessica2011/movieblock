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

  $('#signInButtonG').on('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  function saveDate(user) {
    var usuario = {
      uid: user.uid,
      nombre: user.displayName,
      email: user.email,
      foto: user.photoURL
    };
    firebase.database().ref('users/' + user.uid).set(usuario);
  }
});

