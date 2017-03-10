var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SubmissionSchema = new Schema ({
	date: {
		type: Date
		// required: true
	},
	location: {
		type: String
		//required: false
	},
	topicTitle: {
		type: String
		//required: true
	},
	submissionType: {
		type: String
		// enum: ['Hazard', 'Lost Dog', 'Found Dog', 'Current Condition', 'Community Event', 'Other'],
		//required: true
	},
	/*file: {                This probably wont work. must have imgPath
		type: String, 		 '/uploadedImages/lostDogs/romeo.jpg'
		required: false 
	} */
	description: {
		type: String
		//required: true
	}
});

module.exports = mongoose.model('Submission', SubmissionSchema);