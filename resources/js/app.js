
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


  // ++++ Sign-Up Modal Logic ++++ //

  // Get the modal
var $modal = $('#signUpModal');

// Get the button that opens the modal
var $newAcctBtn = $("#newAccount");

// Get the <span> element that closes the modal
var $close = $(".close")[0];

// When the user clicks the button, open the modal 
$newAcctBtn.on('click', function() {
  $modal.css('display','block')
});

// When the user clicks on <span> (x), close the modal
$close.on('click', function() {
  $modal.css('display','none')
});

// When the user clicks anywhere outside of the modal, close it
window.on('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
