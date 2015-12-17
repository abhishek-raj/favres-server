// grab the user model
var User = require('./user-schema');
var Fav = require('./fav-schema');
// create a new user
var getfav = function(userToBeChecked, callback) {
	var message = '';
	if (userToBeChecked && userToBeChecked.username && userToBeChecked.password)
	{
		User.findOne({ username: userToBeChecked.username }, function(err, user) {
		  	if (err) {
		  			throw err;
		  	}
		  	if(!(user))
			{				
				var favs = [];
		  		message = 'Invalid username or password.';
		  		console.log('Favs: User not found.');
		  		callback(message, favs);
			}
			else
		  	{
		  		if(user.password == userToBeChecked.password)
		  		{
		  			Fav.find({ username: userToBeChecked.username}, 'name latlng place', function(err, favs) {
		  				message = 'Sending Favs.';
		  				callback(message, favs);
		  			});
		  		}
		  		else
		  		{
		  			var favs = [];
			  		message = 'Invalid username or password.';
			  		console.log('Favs: User not found.');
			  		callback(message, favs);
			  	}
		  	}
		});
	}
	else
	{
		var favs = {};
		message = 'Invalid JSON.';
		callback(message, favs);
	}
}

exports.getfav = getfav;