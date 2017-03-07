var Post = require('../models/post.model')

exports.post = function (req, res){
	var newPost = new Post();
	newPost.date = req.body.date;
	newPost.location = req.body.location;
	newPost.topicTitle = req.body.topicTitle;
	newPost.postType = req.body.postType;
	//newPost.img = req.body.img;
	newPost.description = req.body.description;

	newPost.save(function(err, post){
		if (err){
			res.send('error posting');
		} else {
			res.send('post complete');
			res.redirect('/home');
		}
	});
};