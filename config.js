var apiPort = 3002
var deployed = true 
module.exports = {
	'secret': 'doggystyle',
	'database': process.env.MONGODB_URI || 'mongodb://localhost/users',
	'apiServer': deployed ? '': 'http://localhost:' + apiPort,
	'apiPort' : process.env.PORT || apiPort,
	'frontEndServer': deployed ? '': "http://localhost:3000" 
};