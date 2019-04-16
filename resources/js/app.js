
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDY0ap1bIDwwvSRsvusGOtH1ow7F6AqPyU",
    authDomain: "hiawesomehumans.firebaseapp.com",
    databaseURL: "https://hiawesomehumans.firebaseio.com",
    projectId: "hiawesomehumans",
    storageBucket: "hiawesomehumans.appspot.com",
    messagingSenderId: "501987551176"
  };
  firebase.initializeApp(config);

  const db = firebase.database();

  $("#newAccount").on("click")

  // <section id="newAccount">
  //   <a href="module.html">Create a New Account</a>
  // </section>

  // <section id="signIn">
  //   <a href="signin.html">Sign In</a>
  // </section>