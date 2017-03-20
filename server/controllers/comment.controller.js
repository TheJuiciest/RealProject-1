var { Comment, Submission } = require('../models/submissionModel')

const comment = function (req, res){
	var newComment = new Comment();

	newComment._user = req.decoded._doc._id;
	newComment.text = req.body.text;
	newComment.date = new Date()
	newComment._submission = req.body.submission;
	
	newComment.save(function(err, comment){
		Submission.update(
    		{ _id: req.body.submission },
    		{ $push: { comments: comment._id } },
    		function(err, update){
    			if (err){
					res.json(err.message);
				} else {
					res.send('post complete');
				}
    		})
	});
};

module.exports = {comment}