// grab the user model
var Fav = require('./fav-schema');
// create a new user
var addFav = function(favToBeAdded, callback) {
	var message = '';
	if (favToBeAdded && favToBeAdded.name && favToBeAdded.username && favToBeAdded.place && favToBeAdded.latlng)
	{
		Fav.findOne({ username: favToBeAdded.username, place: favToBeAdded.place, name: favToBeAdded.name, latlng: favToBeAdded.latlng }, function(err, fav) {
		  	if (err) {
		  			throw err;
		  	}
		  	if(!(fav))
			{				
				var newFav = Fav({
				  name: favToBeAdded.name,
				  username: favToBeAdded.username,
				  latlng: favToBeAdded.latlng,
				  place: favToBeAdded.place
				});
		
				newFav.save(function(err) {
		  		if (err) {
		  			throw err;
		  		}
		  		message = 'Fav added.';
		  		console.log('Fav created!');
		  		callback(message);
				});
			}
			else
		  	{
		  		message = 'Fav with that details already exists.';
		  		console.log('Fav already exists');
		  		callback(message);
		  	}
		});
	}
	else
	{
		message = 'Invalid JSON.';
		callback(message);
	}
}

exports.addFav = addFav;