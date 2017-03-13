/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userCommentSchema = new Schema ({
	username: {
		type: String
		// required: true
	},
	commentText: {
		type: String
		//required: false
	},
	date: {
		type: Date
	}
});

module.exports = mongoose.model('userComment', userCommentSchema);