require("dotenv").config();

var request = require("request");
var moment = require("moment");

var keys = require("./keys");

// var spotify = new Spotify(keys.spotify);

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (search === "movie-this") {
    var URL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=c1bd24ba";
    request(URL, function (error, response, body) {
        var jsonData = JSON.parse(body);
        if (!error && response.statusCode === 200) {
            var movieData =     
                "\n* Title: " + jsonData.Title +
                "\n* Year: " +  jsonData.Year +
                "\n* IMDB Rating: " + jsonData.imdbRating +
                // "\n* Rotten Tomatoes: " + jsonData.Ratings[0].Value +
                "\n* Country produced: " + jsonData.Country +
                "\n* Language: " + jsonData.Language +
                "\n* Plot: " + jsonData.Plot +
                "\n* Cast: " + jsonData.Actors
            // ;
            console.log(movieData);
        }
        // console.log(jsonData);
    });
} 

else if (search === "concert-this") {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    request(URL, function (error, response, body) {
        var jsonData = JSON.parse(body)[0];
        if (!error && response.statusCode === 200) {
            var artistData =
                "\nVenue: " + jsonData.venue.name + 
                "\nLocation: " +jsonData.venue.city +
                "\nDate: " + jsonData.datetime
                ;
        }
        console.log(artistData);
    })
}

else if (search === "spotify-this-song") {
    var URL = 
}
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

// * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

// Make it so liri.js can take in one of the following commands:



// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

