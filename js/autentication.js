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

// Ingresando con GOOGLE+
// var provider = new firebase.auth.GoogleAuthProvider();
// $('.btnGoogle-js').click(function() {
//   firebase.auth()
//     .signInWithPopup(provider)
//     .then(function(result) {
//       console.log(result.user);// gg
//       saveData(result.user);
//       $('.photo-user-js').append('<img class="circle" src=\'' + result.user.photoURL + '\'/>');
//       $('.name-user-js').append('<span>' + result.user.displayName + '</span>');
      
//       window.location.href = '../views/home/index.html';
//       var token = result.credential.accessToken;
//       var user = result.user;
//     });
// });

// guarda automáticamente la infrmación del usuario al logearse con google+

// function saveData(user) {
//   var usuario = {
//     uid: user.uid,
//     name: user.displayName,
//     email: user.email,
//     photo: user.photoURL
//   };
//   firebase.database().ref('informationUser/' + user.uid)
//     .set(usuario);
// }

// escribir en la base de datos
// $('#ggg').click(function() {
//   firebase.database().ref('informationUser')
//     .set({
//       nombre: 'jessS',
//       edad: '18',
//       sexo: 'masculino'
//     });
// });

// Aqui leo la BD
// firebase.database().ref('informationUser')
//   .on('child_added', function(s) {
//     var user = s.val();
//     $('.photo-user-js').append('<img class="circle" src=\'' + user.photo + '\'/>');
//     $('.name-user-js').append('<span>' + user.name + '</span>');  
//   });
$(document).ready(function() {
  // Registro de usuarios (signUp)
  $('#btn-signUp-js').click(function(event) {
  // event.preventDefault();
    var $valEmail = $('#email').val();
    var $valPassword = $('#password').val();
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

  // Funcion para mostrar imagen
  // function showImage(user) {
  //   $('#showPhoto').append('<img src=\'' + user.photoURL + '\' />');
  //   $('#namePerson').append('<p>' + user.displayName + '</p>');
  // }
  // funcion para que se guarde la informacion automaticamente en firebase sin repetirse
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


// function observador() {
//   var $userName = $('#nombre');
//   var $photoUser = $('#photo-user-js') ;
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       console.log('Existe usuario activo');
//       // nameUser(user);
//       // logear(user);
//       // User is signed in.
//       var displayName = user.displayName;
//       console.log(displayName);
//       var email = user.email;
//       console.log('******************');
//       console.log(user.emailVerified);
//       console.log('******************');
//       var emailVerified = user.emailVerified;
//       var photoURL = user.photoURL;
//       var isAnonymous = user.isAnonymous;
//       var uid = user.uid;
//       var providerData = user.providerData;
//       $userName.html(name);
//       $photoUser.attr('src', photoURL);
//       // ...
//     } else {
//       console.log('no existe usuario activo');
//     }
//   });
// }
// observador();

// function logear(user) {
//   if (user.emailVerified) {
//     window.location.href = '../views/home.html';
//   }
// }

// cierra sesion del usuario
// $('.signOff-js').click(function() {
//   firebase.auth().signOut()
//     .then(function() {
//       console.log('saliendo..');
//       window.location.href = '../../index.html';
//     }, function(error) {
//       console.error('Sign Out Error', error);
//     });
// }); 

// verificar la cuenta por el email 
// function verifyAccount() {
//   var user = firebase.auth().currentUser;
  
//   user.sendEmailVerification().then(function() {
//     console.log('enviando correo de verificación');
//   }).catch(function(error) {
//     console.log(error);
//   });
// };
window.addEventListener('load', function() {
  // var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
  // recentPostsRef.once('child_added', function (data) {
  
  //   var author = data.val().author || 'Anonymous';
  //   console.log(data.key);
  //   console.log(data.val().body);
  //   console.log(data.val().authorPic);
  //   $('#postsDesk').append("<div class='postsDesktop'>" + "<img src='" + data.val().authorPic + 
  //   "' class='circle ed-item l-20' />" + "<h4>" + author + "</h4>" + "<p>" + data.val().body + "</p>" + "</div>");
  //   //   createPostElement(data.key, data.val().body, author, data.val().uid, data.val().authorPic),
  //   //   containerElement.firstChild);
  // });
  
  
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var user = firebase.auth().currentUser;
    // console.log(user);
    $('#desktop-perfil').html('<img class=\'activator\' src=\'' + user.photoURL + '\'>');
    $('.card-content').html('<span class="card-title activator grey-text text-darken-4"> ' + user.displayName + ' <i class="material-icons right">more_vert</i></span>' + '<p><a href=\'#\'>Agregar informarción +</a></p>');
    // "<div class='ed-item s-90 m-40 s-offset-5'>  <p> Nombre: " + user.displayName + "</p> <a href=''>Agrega Descripción +</a> </div>"  );
  });
  
  signInButtonG.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
  
  signInButtonF.addEventListener('click', function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
  
  
  signOutButton.addEventListener('click', function() {
    firebase.auth().signOut();
  });
  
  
  firebase.auth().onAuthStateChanged(onAuthStateChanged);
  
  
  messageForm.onsubmit = function(e) {
    e.preventDefault();
    var text = messageInput.value;
    if (text) {
      newPostForCurrentUser(text).then(function() {
        myPostsMenuButton.click();
      });
      messageInput.value = '';
    }
  };
  
  
  recentMenuButton.onclick = function() {
    showSection(recentPostsSection, recentMenuButton);
  };
  myPostsMenuButton.onclick = function() {
    showSection(userPostsSection, myPostsMenuButton);
  };
  // myTopPostsMenuButton.onclick = function() {
  //   showSection(topUserPostsSection, myTopPostsMenuButton);
  
  //   var user = firebase.auth().currentUser;
  //   console.log(user.photoURL.photoURL);
  //   $topUserPostsSection.html('<img class=\'ed-item s-90 m-30 s-offset-5\' src=\'' + user.photoURL + '\' />' +
  //             '<div class=\'ed-item s-90 m-40 s-offset-5\'>  <p> Nombre: ' + user.displayName + '</p> <a href=\'\'>Agrega Descripción +</a> </div>');
  // };
  addButton.onclick = function() {
    showSection(addPost);
    messageInput.value = '';
  };
  chatMovil.onclick = function() {
    console('click en chat');
  };
  
  recentMenuButton.onclick();
}, false);