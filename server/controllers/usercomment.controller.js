var userComment = require('../models/userCommentModel')

exports.comment = function (req, res){
	var newComment = new Comment();

	newComment.username = req.decoded._doc.username;

	console.log(req.decoded)
	newComment.text = req.body.text;
	

	newComment.save(function(err, post){
		if (err){
			res.send('error posting');
		} else {
			res.send('post complete');
		}
	});
};