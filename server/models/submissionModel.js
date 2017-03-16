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
		type: Date,
		//required: true
	},
	location: {
		type: String,
		//required: false
	},
	topicTitle: {
		type: String,
		//required: true
	},
	submissionType: {
		type: String,
		// enum: ['Hazard', 'Lost Dog', 'Found Dog', 'Current Condition', 'Community Event', 'Other'],
		//required: true
	},
	fd: {               
		type: String,	
		//required: false
	},
	username: {
		type: String
	},
	description: {
		type: String,
		//required: true
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