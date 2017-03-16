var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema ({
	_user: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	text: {
		type: String
	},
	date: Date,
	_submission: {
		type: Schema.Types.ObjectId,
		ref: 'Submission'
	}
});


var SubmissionSchema = new Schema ({
	date: {
		type: Date
	},
	location: {
		type: String
	},
	topicTitle: {
		type: String
	},
	submissionType: {
		type: String
	},
	fd: {               
		type: String	
	},
	username: {
		type: String
	},
	description: {
		type: String
	},
	comments: [{ 
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}],
	lat: Number,
	lng: Number
});


var Comment = mongoose.model('comment', commentSchema);
var Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = { Comment, Submission}