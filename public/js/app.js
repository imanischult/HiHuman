
//onclick handler for deleting friends
$(function () {
  $(".del").on("click", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/friends/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newActivity = {
      name: $("#activity-name").val().trim(),
      time: $("#time").val().trim(),
      loc: $("#location").val().trim(),
      invitees: $("#location").val().trim(),
      notes: $("#location").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/activities", {
      type: "POST",
      data: newActivity
    }).then(
      function () {
        console.log("created new event");
        // Reload the page to add the event to the list of open events. 
        //   location.reload();
      }
    );
  });

  //for updating the profile
  $(".update-profile").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var updatedUser = {
      name: $("#name").val().trim(),
      username: $("#username").val().trim(),
      profilePicture: $("#profilePic").val().trim(),
        email: $("#email").val().trim()
    };

    //Allows a user to close the browser without completing sign up

    var isSubmitting = false

    $(document).ready(function () {
      $('form').submit(function () {
        isSubmitting = true
      })
      $('form').data('initial-state', $('form').serialize());

      $(window).on('beforeunload', function () {
        if (!isSubmitting && $('form').serialize() != $('form').data('initial-state')) {
          return 'You have unsaved changes which will not be saved.'
        }
      });
    })

    var id = $(this).data("id");

    // Send the POST request.
    $.ajax("/api/users/" + id, {
      type: "PUT",
      data: updatedUser
    }).then(
      function () {
        console.log("updated user");
        // Reload the page to get the updated list
        location.assign("/user");
      }
    );
  });
});
