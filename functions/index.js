const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors')({ origin: true });
app.use(cors);
const fire = require("./fire.js");
var database = fire.database();

app.get('/api', (req, res) => {
  const date = new Date();
  const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
  res.json({ bongs: 'BONG '.repeat(hours) });
});

app.post('/api/polls/createPoll', (req, res) => {
  database.ref('polls/').push(req.body);
});

app.get("/api/polls/get", (req, res) => {
  return database.ref('polls/' + "test").once('value', function(snapshot){
    console.log(snapshot.val());
  })
  .then((snapshot) => {
  //  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
      console.log(snapshot.val());
      res.json(snapshot.val());
  });
})

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

exports.app = functions.https.onRequest(app);