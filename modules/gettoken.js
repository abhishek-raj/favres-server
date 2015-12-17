// grab the user model
var User = require('./user-schema');
// create a new user
var getAuth = function(userToBeChecked, callback) {
	var message = '';
	if (userToBeChecked && userToBeChecked.username && userToBeChecked.password)
	{
		User.findOne({ username: userToBeChecked.username }, function(err, user) {
		  	if (err) {
		  			throw err;
		  	}
		  	if(!(user))
			{				
				var bogusUser = {};
		  		message = 'Invalid username or password.';
		  		console.log('Signin: User not found.');
		  		callback(message, bogusUser);
			}
			else
		  	{
		  		if(user.password == userToBeChecked.password)
		  		{
		  			var realUser = {
		  				name: user.name,
		  				username: user.username,
		  				password: user.password,
		  				email: user.email,
		  				token: user.username+'.'+user.password
		  			}
		  			message = 'Signin Successful.';
		  			callback(message, realUser);
		  		}
		  		else
		  		{
		  			var bogusUser = {};
			  		message = 'Invalid username or password.';
			  		console.log('Sign: Incorrect password');
			  		callback(message, bogusUser);
			  	}
		  	}
		});
	}
	else
	{
		var bogusUser = {};
		message = 'Invalid JSON.';
		callback(message, bogusUser);
	}
}

exports.getAuth = getAuth;