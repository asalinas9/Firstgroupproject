
// ---------------------------------------------------------------------------things needed in HTML file-------------------------------

// <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-database.js"></script>
//button with id #search-button
//form with id #search-input
//table with id #searchterm-table
//div with id #comic-div
//div within or near comic-div with id #buybook-div

//-----------------------------------------------------------------questions-----------------------------------------------------------------
// do we need to do anything special bc there are 2 different APIs? maybe create separate functions?



// --------------------------------------------------------------Firebase, adding search term to DB and pulling to HTML---------------------------------------------
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAD8D_DS1TRkJXkWT4g_Y57Itjw_oIcpwU",
  authDomain: "comic-book-search.firebaseapp.com",
  databaseURL: "https://comic-book-search.firebaseio.com",
  projectId: "comic-book-search",
  storageBucket: "comic-book-search.appspot.com",
  messagingSenderId: "167980205893",
  appId: "1:167980205893:web:1df86c3da4a161ef7da02c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// Button for adding Search term
$("#search-btn").on("click", function (event) {
  event.preventDefault();
  // Grabs user input
  var searchTerm = $("#search-input").val().trim();
  // Creates local "temporary" object for holding search term data
  var newSearch = {
    searchterm: searchTerm
  };
  // Uploads search term data to the database
  database.ref().push(newSearch);
  // Logs everything to console
  console.log(newSearch.searchterm);
  //runs searchComics function with calls to APIs
  searchComics(inputComic);
  // Clears all of the text-boxes
  $("#search-input").val("");
});

//Create Firebase event for adding search term  to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var searchTerm = childSnapshot.val().searchterm;
  // Log search term Info
  console.log(searchTerm);
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(searchTerm),
  );
  // Append the new row to the table
  $("#searchterm-table > tbody").append(newRow);
});

//---------------------------------------------------------------------------------------------------------------------------------------end  of firebase functions---------








//------------------------------------------------------------ ajax call to comicbook + ebay APIs--------------------------------------------

            //----------------------------------things left to do:
                    // 1. get URL, API key fro comic book URL and insert below - line 92
                    // 2. figure out which search terms we need to use and insert into fuction name and query url. "title" is used as a placeholder for now - line 87, 92
                    // 3. fill in "consturcting html containing comic information" section with relevant api data attributes - line 92+
                    // 4. update variable names in append function to match cariable created in step 3 - line 101 - 108
                    // 5. repeat for eBay API section (does it have to be the same search parameters as the first api? I'm confused) - lines 119, 128-129, 133
                    // 6. pray it works *fingers crossed emoji*
            //--------------------------------------------------------------------------------------------------------------------------------



function searchComics(title) {

 //----------------------------------------------Comic Book API AJAX Call + append to HTML-------------------------------------------------

  // Querying the comicbooks api for the selected title, the ?app_id parameter is required, but can equal anything
  var ComicQueryURL = "**ADD comicbook api url here" + title + "**End comic book url with api key**";
  $.ajax({
    url: ComicQueryURL,
    method: "GET"
  }).then(function (response) {

    // Printing the entire object to console
    console.log(response);

    // Constructing HTML containing the comic information
            // examples from class activity:
                  // var artistName = $("<h1>").text(response.name);
                  // var artistURL = $("<a>").attr("href", response.url).append(artistName);
                  // var artistImage = $("<img>").attr("src", response.thumb_url);
                  // var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
                  // var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
                  // var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    // Empty the contents of the comic-div, append the new comic content
    $("#comic-div").empty();
    $("#comic-div").append(//artistURL, artistImage, trackerCount, upcomingEvents, goToArtist 
      );
  });

  //-------------------------eBay API AJAX Call + append to HTML-------------------------------------------------------------

  // Querying the ebay api for the selected title, the ?app_id parameter is required, but can equal anything
  var EbayQueryURL = "**ADD ebay api url here" + title + "**End ebay url with api key**";
  $.ajax({
    url: EbayQueryURL,
    method: "GET"
  }).then(function (response) {

    // Printing the entire object to console
    console.log(response);

    // Constructing HTML link/button containing link to buy book on ebay  
              // var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    // Empty the contents of the buybook-div, append the new buy book link
    $("#buybook-div").empty();
    $("#buybook-div").append(//goToArtist
      );
  });

}


