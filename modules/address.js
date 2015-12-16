exports.getAddress = function(req, callback){
  var key = 'AIzaSyBTiYFBUAPUmDpKSgPmJPGtoLFi0grNj1Q';
  var address = req;
  var sensor = false;

  var https = require('https');
  var url = "https://maps.googleapis.com/maps/api/geocode/json?" + "key=" + key + "&address=" + address + "&sensor=" + sensor;
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
            formatted : locations[index].formatted_address,
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