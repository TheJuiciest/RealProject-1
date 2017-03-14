var Submission = require('../models/submissionModel')

exports.submission = function (req, res){
	var newSubmission = new Submission();
	console.log(req.decoded)
	newSubmission.date = req.body.date;
	newSubmission.location = req.body.location;
	newSubmission.topicTitle = req.body.topicTitle;
	newSubmission.submissionType = req.body.submissionType;
	newSubmission.username = req.decoded._doc.username; //This is derived from the access token by the middleware
	newSubmission.fd = req.file.path || null;
	newSubmission.description = req.body.description;

	newSubmission.save(function(err, post){
		if (err){
			res.send('error posting');
		} else {
			res.send('post complete');
		}
	});
};