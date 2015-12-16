var mongoose = require('mongoose');
var dburi = process.env.MONGOLAB_URI || 'mongodb://raj:abhishek@ds033135.mongolab.com:33135/heroku-favres';
mongoose.connect(dburi, function (err, res) {
	if (err) { 
		console.log ('ERROR connecting to: ' + dburi + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + dburi);
	}
});

exports = mongoose;