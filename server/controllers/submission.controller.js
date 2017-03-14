var { Submission } = require('../models/submissionModel')

exports.submission = function (req, res){
	var newSubmission = new Submission();

	newSubmission.username = req.decoded._doc.username;

	console.log(req.decoded)
	newSubmission.date = req.body.date;
	newSubmission.location = req.body.location;
	newSubmission.topicTitle = req.body.topicTitle;
	newSubmission.submissionType = req.body.submissionType;
	newSubmission.username = req.decoded._doc.username;
	newSubmission.fd = req.file.path;
	newSubmission.comment = req.file._id;
	newSubmission.description = req.body.description;

	
	newSubmission.find({})
		.populate('userComment')
		.exec(function (err, newsubmission) {
  			if (err) return handleError(err);
  				console.log(newsubmission);
		})

	newSubmission.save(function(err, post){
		if (err){
			res.send('error posting');
		} else {
			res.send('post complete');
		}
	});
};