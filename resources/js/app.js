
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDY0ap1bIDwwvSRsvusGOtH1ow7F6AqPyU",
  authDomain: "hiawesomehumans.firebaseapp.com",
  databaseURL: "https://hiawesomehumans.firebaseio.com",
  projectId: "hiawesomehumans",
  messagingSenderId: "501987551176"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.database();
var uid;



  // ++++ Create New Profile Modal Logic ++++ //

  // Get the modal
var $createProfModal = $('#signUpModal');

// Get the button that opens the modal
var $newAcctBtn = $("#newAccountOpenModal");

// Get the span element that closes the modal
var $closeCreate = $("#closeCreate");

// When the user clicks the button, open the modal 

$newAcctBtn.on('click', function() {
  $createProfModal.css('display','block')
});

// When the user clicks the "create account" button, open the instructions page
$("#newAccount").click(function() {
  
})

// When the user clicks "next" button, open "choose mask page"
$('#nextBut').click(function() {
  window.location.href = 'chooseAMask.html';
})

//When the user clicks "sign in" button, open "user profile"
$('#userAccount').click(function() {
  // window.location.href = 'userProfile.html';
})

// When the user clicks on <span> (x), close the modal
$closeCreate.on('click', function() {
  $createProfModal.css('display','none')
  console.log(this)
});


  // ++++ Sign-In Modal Logic ++++ //

  // Get the modal
  var $signInModal = $('#signInModal');

  // Get the button that opens the modal
  var $signInBtn = $("#signIn");
  
  // Get the span element that closes the modal
  var $closeSignIn = $("#closeSignIn");
  
  // When the user clicks the button, open the modal 
  $signInBtn.on('click', function() {
    $signInModal.css('display','block')
  });
  
  // When the user clicks on <span> (x), close the modal
  $closeSignIn.on('click', function() {
    $signInModal.css('display','none')
    console.log(this)
  });


// When the user clicks anywhere outside of the modal, close it
// document.on('click', function(event) {
//   if (event.target == $modal) {
//     $modal.css('display', 'none')
//   }
// });





// //new account functionality




//sign in functionality. Firebase docs provides this. 
const signIn = (event) => {
  let usrEmail = $("#userSignIn").val().trim();
  let usrPassword = $("#user_password").val().trim();
  event.preventDefault();
  firebase.auth().signInWithEmailAndPassword(usrEmail, usrPassword).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

//create a new account when the newAccount button is clicked. 
const signUp = (event) => {
  event.preventDefault();
  //Capture all the data. Doing it this way because I try to avoid too many global variables.
  let email = $("#email").val().trim();
  let username = $("#user_name").val().trim();
  let pass = $("#userPassword").val().trim();
  let passVal = $("#re-type_password").val().trim();
  console.log(email, username, pass, passVal);
  //verify that the passwords match
    // if (pass === passVal) {
      //if matching, then run the auth function with the variables above as parameters. 
      auth.createUserWithEmailAndPassword(email, pass).then(function (data) {
        try {
          db.ref('users').child(data.user.uid).set({
            email: data.user.email,
            key: data.user.uid,
            username: username,
            role: "",
            mask: "",
            icons: [],
            reasons: [],
            testsTaken: [],
            noTestsTaken: 0
          })
          console.log("user created");
          
        } catch (error) {
          console.log(`Error creating database entry for user! --> ${error}`);
        }
      }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          $("#email").append("<p class='errorText'>this email already exists in the system</p>");
        } else {
          $("<form>").append(errorMessage);
        }
      })
    // } else { // if not matching, show an error. 
    //   $("#password").append("<p class='errorText'>passwords do not match</p>")
    // }
    $("input").val(" ");
    return "user created";
    
};



// // admin page functionality


// //this function takes a userid from the database and gives them the admin role
// // const setAdmin = (uid) => {
// //   db.ref().on("child_added", function(childSnapshot) {
// //     role: admin
// //   })
// //     .then(function (UserInfo) {
// //       // See the UserInfoUserInfo reference doc for the contents of UserInfo.
// //       console.log('Successfully updated user', UserInfo.toJSON());
// //     })
// //     .catch(function (error) {
// //       console.log('Error updating user:', error);
// //     });
// // }

// //on clicking the make admin button on the admin page
// // $("#make-admin").on("click", function (event) {
// //   event.preventDefault();
// //   let usrEmail = $("#adminEmail").val().trim();
// //   //need to figure out how to identify the specific user, which is haaaard in realtime without using, like, node. 
// //   db.ref(`users/email`).on()
// //   firebase.user
// //     .then(function (UserInfo) {
// //       // See the UserInfoUserInfo reference doc for the contents of UserInfo.
// //       console.log('Successfully fetched user data:', UserInfo.toJSON());
// //       let uid = UserInfo.uid;
// //       setAdmin(uid);
// //     })
// //     .catch(function (error) {
// //       console.log('Error fetching user data:', error);
// //     });
// // })
// // function toggleRegisterState() {
// //     $('.toggle span').toggleClass('toggled');

// //     if (is_register) {
// //       $('form h3').text('Sign Up');
// //       $('form #confirm').show();
// //     } else {
// //       $('form h3').text('Log In');
// //       $('form #confirm').hide();
// //     }

// //     is_register = !is_register;
// //   }

// function checkAuthState() {
//     auth.onAuthStateChanged(function (user) {
//       if (user) {
//         uid = auth.currentUser.uid;

//         showAuthView(true, user.email);

//         db.ref('/users/' + user.uid).once('value', function (ref) {
//           console.log(ref.val());
//         })
//       } else {
//         showAuthView(false, null);
//       }
//     });
//   }


// function logUserOut() {
//     auth.signOut().then(function () {
//       showAuthView(false, null);
//     }).catch(function (error) {
//       // An error happened.
//     });
//   }

function init() {
    $('#newAccount').on('click', signUp);
    $('#signIn').on('click', signIn);
    // $('#logout').on('click', logUserOut);
    // checkAuthState();
  }

// Start The App
init();



