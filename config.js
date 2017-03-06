var apiPort = 3002
module.exports = {
	'secret': 'doggystyle',
	'database': 'mongodb://localhost/users',
	'apiServer': 'http://localhost:' + apiPort,
	'apiPort' : apiPort,
	'frontEndServer': "http://localhost:3000" 
};