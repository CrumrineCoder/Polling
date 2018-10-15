const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

require('dotenv').config();


mongoose.promise = global.Promise;
if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
}

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// Serve the static files from the React app

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({ secret: 'Barrett', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
	app.use(errorHandler());
}

const mLab = 'mongodb://' + process.env.dbUSER + ':' + process.env.dbPASS + process.env.dbHOST + '/' + process.env.dbNAME + '?authMode=scram-sha1';
console.log(mLab);
mongoose.connect(mLab);
mongoose.set('debug', true);

// Add models
require('./models/Polls');
// Add routes
app.use(require('./routes'));

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});


if (!isProduction) {
	app.use((err, req, res) => {
		res.status(err.status || 500);

		res.json({
			errors: {
				message: err.message,
				error: err,
			},
		});
	});
}


// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);