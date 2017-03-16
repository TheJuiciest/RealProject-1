var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');   
var config = require('../config');      
var path = require('path');
var User = require('./models/user.model');
var { Submission, Comment }= require('./models/submissionModel');
var subcontroller = require('./controllers/submission.controller');
var controller = require('./controllers/user.controller');
var commentController = require('./controllers/comment.controller');
var morgan = require('morgan');
var multer = require('multer');
var path = require('path');


var app = express();
var db = 'mongodb://localhost/dog_project';

mongoose.connect(db)


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", config.frontEndServer);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Request-Method", "GET POST PUT DELETE");
  next();
});

app.use(express.static('public'))     //which page to be displayed (our index.html)

app.get('/', function(req, res){  //specifies the route that the user goes to when they've loaded up their application
	return res.render('index.html'); 	  //Because we've set our directory name to public, we can render the index.html and will automatically look in the public directory
})

//This is going to be the route that our app is going to look for when sending our username and email to the db to save
//Normally you'd create a routes.js file to hold all of those routes in one locations but this is the only one...
//We'll create a method called register within our controller that will handle the logic of adding our username and pw to our db
									//That said, we have to add this controller as a module to the app.js file

// API ROUTES

var apiRoutes = express.Router();				//this defines how things move to and from the mongo database for users


var requireLogin =function (req, res, next) {
  console.log('requiring password', req.body)
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        console.log('decoded', decoded)
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
};


var suffix = {
  'image/jpeg' : 'jpg',
  'image/png' : 'png'
}
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    console.log('directory ',path.join(__dirname, '../public/uploadedImages/lostDogs'))
    cb(null,path.join(__dirname, '../public/uploadedImages/lostDogs'))
  },
  filename: function (req, file, cb){
    console.log('naming file',  file.fieldname + Date.now() +'.'+ suffix[file.mimetype])
    cb(null, file.fieldname + Date.now() +'.'+ suffix[file.mimetype] )
  }
})
var upload = multer({storage: storage}).single("dogPhoto")


apiRoutes.post('/submission', upload, requireLogin, subcontroller.submission);

apiRoutes.post('/comment', requireLogin, commentController.comment);


apiRoutes.post('/register', controller.register);

apiRoutes.get('/submissions', function(req, res) {	//this gets the submission from the user database in mongo and return them as a json object
  Submission.find({})
      .populate({path:'comments',  populate: { path: '_user', select: 'username' }})
      .exec(function(err, submissions) {
        res.json(submissions);
      });
});   

// API ROUTES -------------------


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {	//this will create the token for users when they login
  console.log ('username',req.body.username)
  // find the user
  User.findOne({				//goes through the users in the database
    username: req.body.username			//this takes the name from the login form
  }, function(err, user) {

    if (err) throw err;			//if the name doesn't match something in the database it returns an error

    if (!user) {				//if user doesn't exist, it returns this...
      res.json({ success: false, message: 'You sure you already signed up? No user has been found.' });  

    } else if (user) {

     
      if (user.password != req.body.password) {		//if the user does exist, checks if the password matches and returns wrong password if it doesn't match
        res.json({ success: false, message: 'Looks like you entered the wrong password.' });
      } else { 		//if the name is right and the password is right it creates a token (below)

        var token = jwt.sign(user, config.secret, { 	//this generates the tokens using json webtokens
          expiresIn: 1440 // tells it to expire in 24 hours
        });

        
        res.json({						//returns a JSON object with the following information
          success: true,
          message: 'Enjoy your token!',
          token: token,
          name: req.body.name
        });
      }   

    }

  });
});



apiRoutes.get('/users', function(req, res) {  //this gets the users from the user database in mongo and return them as a json object
  User.find({}, function(err, users) {
    res.json(users);
  });
});


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);               //this puts the /api on anything that uses api routers

app.listen(config.apiPort);
console.log("server started on port " + config.apiPort);
