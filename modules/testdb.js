// grab the user model
var User = require('./user-schema');

// create a new user
var newUser = User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  email: 'r@gmail.com',
  favourites: []
});

// save the user
newUser.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});