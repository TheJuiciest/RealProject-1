var { Submission } = require('../models/submissionModel')
	
exports.submission = function (req, res){
	function reqPath(req, res){
		if (req.file === undefined){
		return ''
		} else{
			return req.file.path
		}
	}
	var newSubmission = new Submission();
	
	newSubmission.date = req.body.date;
	newSubmission.location = req.body.location;
	newSubmission.topicTitle = req.body.topicTitle;
	newSubmission.submissionType = req.body.submissionType;
	newSubmission.username = req.decoded._doc.username;
	newSubmission.fd = reqPath(req);
	newSubmission.comment = req.decoded._doc._id;
	newSubmission.description = req.body.description;
	newSubmission.lat = req.body.lat
	newSubmission.lng = req.body.lng

	newSubmission.save(function(err, post){
		if (err){
			res.send('ive got the error you want ' + err.message);
		} else {
			res.send('post complete');
		}
	});
};