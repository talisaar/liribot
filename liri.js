
var file = require('file-system');
var fs = require('fs');
var command = process.argv[2];
var keys = require('./node_modules/keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');




var twitterConsumerKey = keys.twitterKeys.consumer_key;
var twitterConsumerSecret = keys.twitterKeys.consumer_secret;
var twitterAccessTokenKey = keys.twitterKeys.access_token_key;
var twitterAccessTokenSecret = keys.twitterKeys.access_token_secret;

var client = new Twitter({
  consumer_key: twitterConsumerKey,
  consumer_secret: twitterConsumerSecret,
  access_token_key: twitterAccessTokenKey,
  access_token_secret: twitterAccessTokenSecret
});


var spotifyClientId = keys.spotifyKeys.client_id;
var spotifyClientSecret = keys.spotifyKeys.client_secret;


var spotify = new Spotify({
  id: spotifyClientId,
  secret: spotifyClientSecret
});



function mytweets () {


	var params = {
	screen_name: 'talisaar',
	count: process.argv[3]
	};


client.get('statuses/user_timeline', params, function(error, tweets, response) {
 

  if(error) {
  	 console.log("error");
  	 return;
  };

   if (!error) {

   	for (i=0; i<tweets.length; i++) {
   		    console.log(tweets[i].created_at+" "+tweets[i].text);
   		}
	  }
	});
};


 
 function spotifythis () {

 	songname = process.argv[3];

spotify.search(

	{ 
	type: 'track', 
	query: songname,
	limit: 1 
	}, 


	function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log("Song name: "+data.tracks.items[0].name); 
    console.log("Performed by: "+data.tracks.items[0].artists[0].name);
    console.log("Link: "+data.tracks.items[0].external_urls.spotify); 
    console.log("Album: "+data.tracks.items[0].album.name); 

});

}


function dowhatitsays () {


	fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  var dataArr = data.split(",");

  process.argv[2] = dataArr[0];
  process.argv[3] = dataArr[1];

  spotifythis();

  });

}


console.log(command);

if (command == "my-tweets") {
	mytweets();
}

if (command == "spotify-this-song") {
	spotifythis();
}



if (command == "do-what-it-says") {
	dowhatitsays();
}


// pseudo code for the OMDB part because I'm lazy!:

// *** require the OMBD npm  
// *** store OMBD keys
// *** a function to grab OMDB data according to user input --- roughly same methodology as used for twitter and spotiy
// *** if statement for the OMDB command that triggers said function










