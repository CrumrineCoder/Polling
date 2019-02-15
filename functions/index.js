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
  var newPostKey = database.ref().child('polls').push().key;
  data = req.body;
  data.id = "uid";
  var updates = {};
  updates = data;
  updates.id = newPostKey; 
  database.ref("polls/"+newPostKey).update(updates);
});

app.get("/api/polls/get/", (req, res) => {
  var ref = database.ref("polls/");
  var query = ref.orderByChild("question");
  var sum = [];
  query.once("value", function (snap) {
    snap.forEach(function (childSnap) {
      sum.push(childSnap.val());
    });
    res.json(sum);
  });

  
app.get('/api/polls/get/:id', (req, res) => {
  console.log("honks");
  const date = new Date();
  const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
  console.log(hours);
  res.json({ bongs: 'BONG '.repeat(hours) });
});
  /*console.log(sum);
  res.json(sum);*/
  //   var topUserPostsRef = database.ref('polls/').orderByChild('question');
  //   console.log(topUserPostsRef);
  //  // console.log(topUserPostsRef.val());
  //   return database.ref('polls/' + "test").once('value', function(snapshot){
  //     console.log(snapshot.val());
  //   })
  //   .then((snapshot) => {
  //   //  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //     // ...
  //       console.log(snapshot.val());
  //       res.json(snapshot.val());
  //   });
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