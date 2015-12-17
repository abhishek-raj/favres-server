// grab the user model
var User = require('./user-schema');
var Fav = require('./fav-schema');
// create a new user
var addFav = function(favToBeAdded, callback) {
	var message = '';
	if (favToBeAdded && favToBeAdded.name && favToBeAdded.username && favToBeAdded.place && favToBeAdded.latlng &&favToBeAdded.password)
	{
		User.findOne({ username: favToBeAdded.username }, function(err, user) {
		  	if (err) {
		  			throw err;
		  	}
		  	if(!(user))
			{				
		  		message = 'Invalid username or password.';
		  		console.log('Favs: User not found.');
		  		callback(message);
			}
			else
		  	{
		  		if(user.password == favToBeAdded.password)
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
			  		message = 'Invalid username or password.';
			  		console.log('Favs: User not found.');
			  		callback(message);
			  	}
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