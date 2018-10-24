require("dotenv").config();

var request = require("request");
var moment = require("moment");
var fs = require("fs")
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");
var divider = "\n------------------------------------------------------------\n";

function movieThis() {
    var URL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=c1bd24ba";
    request(URL, function (error, response, body) {
        var jsonData = JSON.parse(body);
        if (!error && response.statusCode === 200) {
            var movieData =
                "\n*** Movie Search ***\n" +
                "\n* Title: " + jsonData.Title + 
                "\n* Year: " + jsonData.Year + 
                "\n* IMDB Rating: " + jsonData.imdbRating + 
                "\n* Rotten Tomatoes: " + jsonData.Ratings[1].Value + 
                "\n* Country produced: " + jsonData.Country + 
                "\n* Language: " + jsonData.Language +
                "\n* Plot: " + jsonData.Plot +
                "\n* Cast: " + jsonData.Actors +
                "\n* Poster: " + jsonData.Poster +
                "\n"+divider
                ;
            console.log(movieData);

        }
        fs.appendFile("log.txt", movieData, function(error) {
            if(error) {
              console.log(error);
            }else {
              console.log("Data Saved");
            }
          });
    });
}

function concertThis() {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    request(URL, function (error, response, body) {
        var jsonData = JSON.parse(body)[0];
        if (!error && response.statusCode === 200) {
            var concertData =
                "\n*** Concert Search ***\n" +
                "\n* Lineup: " + jsonData.lineup.join(", ") +
                "\n* Venue: " + jsonData.venue.name +
                "\n* Location: " + jsonData.venue.city +
                "\n* Date: " + moment(jsonData.datetime).format("dddd, MMMM Do YYYY, h:mm a") +
                "\n"+divider
                ;
            console.log(concertData);
        }
        fs.appendFile("log.txt", concertData, function(error) {
            if(error) {
              console.log(error);
            }else {
              console.log("Data Saved");
            }
          });
    });
}

function spotifyThis() {

    spotify.search({ type: 'track', query: term }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var artistData =
                "\n*** Song Search ***\n" +
                "\n* Artist(s): " + data.tracks.items[0].artists[0].name + 
                "\n* Song: " + data.tracks.items[0].name + 
                "\n* Link: " + data.tracks.items[0].preview_url + 
                "\n* Album: " + data.tracks.items[0].album.name + 
                "\n"+divider
                ;
            console.log(artistData);
        }
        fs.appendFile("log.txt", artistData, function(error) {
            if(error) {
              console.log(error);
            }else {
              console.log("Data Saved");
            }
          });
    });
}

// function doWhatItSays() {
//         fs.readFile("log.txt", function (error, data) {
//             if(error) {
//               console.log(error);
//             }else {
//               console.log(content);
//             }
//           });
// }

if (search === "movie-this") {
    movieThis();
} else if (search === "concert-this") {
    concertThis();
} else if (search === "spotify-this-song") {
    spotifyThis();
} else if (search === "do-what-it-says") {
    doWhatItSays();
}



