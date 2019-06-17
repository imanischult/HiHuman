var ourRequest = new XMLHttpRequest();

ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/pets-data.json');

ourRequest.onload = function() {

  if (ourRequest.status >= 200 && ourRequest.status < 400) {

    // This is where we'll do something with the retrieved data

    var data = JSON.parse(ourRequest.responseText);

    createHTML(data);

  } else {

    console.log("We connected to the server, but it returned an error.");
  }

};

ourRequest.onerror = function() {

  console.log("Connection error");

};

ourRequest.send();


// helper function
// since data has birth year need to make funct that will get age from year born
Handlebars.registerHelper("calculateAge", function(birthYear) {
    // return "21";

    var age = new Date().getFullYear() - birthYear;
    return age;
    // !if year born, age 0 spit
    // if(age > 0) {
        // return age + "years old";
    // } else {
    // return "Less than a year old"
    // }
    

});


// access data funct
function createHTML(petsData) {

    // links rawTemp to html ele id petsTemp and selects it then access/looks inside its contents
   var rawTemplate = document.getElementById("petsTemplate").innerHTML;
   
//    convert string of text with hdb to create template funct rawTemp
   var compiledTemplate = Handlebars.compile(rawTemplate);

//    use compiledTemp and pass json data of pets will return html
   var ourGeneratedHTML = compiledTemplate(petsData);

// add string of html to empty div
   var petsContainer = document.getElementById("pets-container");

// add to dom
   petsContainer.innerHTML = ourGeneratedHTML;

}