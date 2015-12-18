// grab the user model
var User = require('./user-schema');
var Fav = require('./fav-schema');
// create a new user
var removeFav = function(favToBeRemoved, callback) {
	var message = '';
	if (favToBeRemoved && favToBeRemoved.name && favToBeRemoved.username && favToBeRemoved.place && favToBeRemoved.latlng &&favToBeRemoved.password)
	{
		User.findOne({ username: favToBeRemoved.username }, function(err, user) {
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
		  		if(user.password == favToBeRemoved.password)
		  		{
					Fav.findOne({ username: favToBeRemoved.username, place: favToBeRemoved.place, name: favToBeRemoved.name, latlng: favToBeRemoved.latlng }, function(err, fav) {
					  	if (err) {
					  			throw err;
					  	}
					  	if(!(fav))
						{
					  		message = 'Fav does not exist.';
					  		console.log('Fav does not exist!');
					  		callback(message);
						}
						else
					  	{
					  		fav.remove(function(err) {
    						if (err) throw err;
    							message = 'Fav removed successfully.';
					  			console.log('Fav removed successfully.');
					  			callback(message);
  							});
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

exports.removeFav = removeFav;