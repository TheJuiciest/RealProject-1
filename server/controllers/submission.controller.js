var Submission = require('../models/submissionModel')

exports.submission = function (req, res){
	var newSubmission = new Submission();

	newSubmission.date = req.body.date;
	newSubmission.location = req.body.location;
	newSubmission.topicTitle = req.body.topicTitle;
	newSubmission.submissionType = req.body.submissionType;
	//newPost.img = req.body.img;
	newSubmission.description = req.body.description;

	newSubmission.save(function(err, post){
		if (err){
			res.send('error posting');
		} else {
			res.send('post complete');
			res.redirect('/home');
		}
	});
};