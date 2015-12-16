exports.getRestaurants = function(req, callback){
  var key = 'AIzaSyBTiYFBUAPUmDpKSgPmJPGtoLFi0grNj1Q';
  var location = req;
  var radius = 500;
  var sensor = false;
  var types = "restaurant";

  var https = require('https');
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + location + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types;
    console.log(url);
    https.get(url, function(response) {
    var body ='';
    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      var places = JSON.parse(body);
      var locations = places.results;
      var len = locations.length;
      var results = [];
      for (index = 0; index < len; ++index) {
          results[index] = {
            name : locations[index].name,
            lat : locations[index].geometry.location.lat,
            lng : locations[index].geometry.location.lng
          };
      }
      callback(results);
      return results;
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};