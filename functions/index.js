/*const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors')({origin: true});
app.use(cors);

app.get('/api', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.json({bongs: 'BONG '.repeat(hours)});
  });

app.get('/', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.send(`
      <!doctype html>
      <head>
        <title>Time</title>
        <link rel="stylesheet" href="/style.css">
        <script src="/script.js"></script>
      </head>
      <body>
        <p>In London, the clock strikes:
          <span id="bongs">${'BONG '.repeat(hours)}</span></p>
        <button onClick="refresh(this)">Refresh</button>
      </body>
    </html>`);
  });

  exports.app = functions.https.onRequest(app); */
/*
  const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.use('/api', require('../routes/api'));

module.exports = functions.https.onRequest(router);
*/
const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// Serve the static files from the React app

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({ secret: 'Barrett', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// Init passport authentication 
app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session());



if (!isProduction) {
	app.use(errorHandler());
}

const mLab = 'mongodb://' + process.env.dbUSER + ':' + process.env.dbPASS + process.env.dbHOST + '/' + process.env.dbNAME + '?authMode=scram-sha1';

mongoose.connect(mLab);
mongoose.set('debug', true);

// Add models
require('../models/Polls');
require('../models/Users');
require('../config/passport');
// Add routes
app.use(require('../routes'));

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});


if (!isProduction) {
	app.use((req, res, err) => {
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

//const port = process.env.PORT || 5000;
//app.listen(port);
exports.app = functions.https.onRequest(app);
//console.log('App is listening on port ' + port);