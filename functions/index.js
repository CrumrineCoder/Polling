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
  database.ref("polls/" + newPostKey).update(updates);
  res.json(newPostKey);
});


app.post("/api/polls/votePollAnswer/", (req, res) => {
  var databaseRef = database.ref('polls/' + req.body._parentID + "/answers").child(req.body._id).child('value');
  databaseRef.transaction(function(value) {
    return (value || 0) + 1;
  });
  res.json(req.body._parentID);
});

app.post("/api/polls/voteUserAnswer", (req, res, next) => {
 /* Polls.findOneAndUpdate({ "userAnswers._id": ObjectId(req.body._id) }, { $push: { "userAnswers.$.Users": req.body.user }, $inc: { "userAnswers.$.value": 1, "value": 1 } }, function (err, docs) { res.json(docs) }); */
  var databaseRef = database.ref('polls/' + req.body._parentID + "/userAnswers").child(req.body._id).child('value');
  databaseRef.transaction(function(value) {
    return (value || 0) + 1;
  });
  res.json(req.body._parentID);
})

app.post("/api/polls/userVote", (req, res, next) => {
  var userVote = {
    "text": req.body.userAnswer,
    "value": 1,
    "Users": [req.body.user]
  }
  console.log(userVote);
  database.ref("polls/" + req.body._parentID + "/userAnswers/"+req.body.userLength).update(userVote);
  res.json(req.body._parentID)

    /*

  return Polls.update(
    { _id: req.body._parentID },
    { $push: { userAnswers: userVote } },
    function (err, doc) {
      res.json(doc);
    });


     var newPostKey = database.ref().child('polls').push().key;
  data = req.body;
  data.id = "uid";
  var updates = {};
  updates = data;
  updates.id = newPostKey;
  database.ref("polls/" + newPostKey).update(updates);
  res.json(newPostKey);
    */
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
});

app.get('/api/polls/get/:id', (req, res) => {
  var ref = database.ref('polls/' + req.params.id);
  ref.on('value', function (snapshot) {
    console.log(snapshot.val());
    res.json(snapshot.val());
  });
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