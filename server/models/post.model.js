var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema ({
	date: {
		type: Date,
		required: true
	},
	location: {
		type: String,
		required: false
	},
	topicTitle: {
		type: String,
		required: true
	},
	postType: {
		type: String,
		enum: ['Hazard', 'Lost Dog', 'Found Dog', 'Current Condition', 'Community Event', 'Other'],
		required: true
	},
	/*img: {               // This probably wont work. must have imgPath
		type: String,
		data: Buffer,
		required: false 
	} */
	description: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Post', PostSchema);