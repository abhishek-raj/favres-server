// grab the user model
var User = require('./user-schema');
// create a new user
var addUser = function(userToBeAdded, callback) {
	var message = '';
	if (userToBeAdded && userToBeAdded.name && userToBeAdded.username && userToBeAdded.password && userToBeAdded.email)
	{
		User.findOne({ username: userToBeAdded.username }, function(err, user) {
		  	if (err) {
		  			throw err;
		  	}
		  	if(!(user))
			{				
				var newUser = User({
				  name: userToBeAdded.name,
				  username: userToBeAdded.username,
				  password: userToBeAdded.password,
				  email: userToBeAdded.email
				});
		
				newUser.save(function(err) {
		  		if (err) {
		  			throw err;
		  		}
		  		message = 'User added.';
		  		console.log('User created!');
		  		callback(message);
				});
			}
			else
		  	{
		  		message = 'User with that username already exists.';
		  		console.log('User already exists');
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

exports.addUser = addUser;