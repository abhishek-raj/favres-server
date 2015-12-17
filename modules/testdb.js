// grab the user model
var User = require('./user-schema');
var message = '';
// create a new user
var addUser = function(userToBeAdded) {
	User.find({ username: userToBeAdded.username }, function(err, user) {
  	if (err) {
		var newUser = User({
		  name: userToBeAdded.name,
		  username: userToBeAdded.username,
		  password: userToBeAdded.password,
		  email: userToBeAdded.email,
		  favourites: []
		});

		newUser.save(function(err) {
  		if (err) {
  			message = 'User not added.';
  		}
  		message = 'User added.';
  		console.log('User created!');
		});
  	}

  	message = 'User with that username already exists.';
  	console.log(user);
});
}

exports.addUser = addUser;
exports.message = message;