

// Make sure we wait to attach our handlers until the DOM is fully loaded.

//onclick handler for deleting friends
$(function() {
    $(".del").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/friends/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted id ", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  

    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newHih = {
        eventName: $("#event-name").val().trim(),
        time: $("#time").val().trim(),
        loc:  $("#loc").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/events", {
        type: "POST",
        data: newHih
      }).then(
        function() {
          console.log("created new event");
          // Reload the page to add the event to the list of open events. 
        //   location.reload();
        }
      );
    });
  
    //for updating the profile
    $(".update-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var updatedUser = {
        name: $("#name").val().trim(),
        username: $("#username").val().trim(),
        profilePicture: $("#profile-pic").val().trim()
      };
  
      var id = $(this).data("id");
  
      // Send the POST request.
      $.ajax("/api/update/", {
        type: "PUT",
        data: updatedUser
      }).then(
        function() {
          console.log("updated user");
          // Reload the page to get the updated list
          location.assign("/user");
        }
      );
    });
  });
