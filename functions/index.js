const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors')({ origin: true });
app.use(cors);
const fire = require("./fire.js");
var database = fire.database();

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

app.get('/api/polls/checkExistence/:question', (req, res) => {
  var ref = database.ref('polls').orderByChild('question').equalTo(req.params.question)
  ref.once('value', function (snapshot) {
    res.json(snapshot.val() !== null);
  });
});

app.post('/api/polls/editPoll', (req, res) => {
  var ref = database.ref('polls/' + req.body.id);
  ref.update(req.body);
  res.json(req.body.id);
});

app.post('/api/polls/deletePoll/:id', (req, res) => {
  var ref = database.ref('polls/' + req.params.id);
  ref.remove();
  res.json(req.param.id);
});

app.post("/api/polls/rescind/", (req, res) => {
  //for (var i = 0; i < req.body.answersLength; i++) {
  var ref = database.ref('polls/' + req.body._parentID + "/answers");
  ref.once('value', function (snapshot) {
    var trueIndex = -1;
    snapshot.forEach(function (childSnapshot) {
      trueIndex++;
      if (childSnapshot.val().users) {
        var users = Object.values(childSnapshot.val().users);
        var index = users.indexOf(req.body.user);
        if (index !== -1) {
          database.ref('polls/' + req.body._parentID + "/answers").child(trueIndex).child("value").transaction(function (value) {
            return (value || 0) - 1;
          });

          function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
          }

          var key = getKeyByValue(childSnapshot.val().users, req.body.user);
          database.ref('polls/' + req.body._parentID + "/answers").child(trueIndex).child("users").child(key).remove();
        }
      }
    });
  });

  var ref = database.ref('polls/' + req.body._parentID + "/userAnswers");
  ref.once('value', function (snapshot) {
    var trueIndex = -1;
    snapshot.forEach(function (childSnapshot) {
      trueIndex++;
      if (childSnapshot.val().users) {
        var users = Object.values(childSnapshot.val().users);
        console.log(users.length);
        if (users.length == 1) {
          database.ref('polls/' + req.body._parentID + "/userAnswers").child(trueIndex).remove();
        } else{
          var index = users.indexOf(req.body.user);
          if (index !== -1) {
            database.ref('polls/' + req.body._parentID + "/userAnswers").child(trueIndex).child("value").transaction(function (value) {
              return (value || 0) - 1;
            });

            function getKeyByValue(object, value) {
              return Object.keys(object).find(key => object[key] === value);
            }

            var key = getKeyByValue(childSnapshot.val().users, req.body.user);
            database.ref('polls/' + req.body._parentID + "/userAnswers").child(trueIndex).child("users").child(key).remove();
          }
        }
      }
    });
  });


  res.json(req.body._parentID);
});


app.post("/api/polls/votePollAnswer/", (req, res) => {
  var databaseRef = database.ref('polls/' + req.body._parentID + "/answers").child(req.body._id).child('value');
  databaseRef.transaction(function (value) {
    return (value || 0) + 1;
  });
  var databasePushRef = database.ref('polls/' + req.body._parentID + "/answers").child(req.body._id).child("users");
  databasePushRef.push(req.body.user);
  res.json(req.body._parentID);
});

app.post("/api/polls/voteUserAnswer", (req, res, next) => {
  var databaseRef = database.ref('polls/' + req.body._parentID + "/userAnswers").child(req.body._id).child('value');
  databaseRef.transaction(function (value) {
    return (value || 0) + 1;
  });
  var databasePushRef = database.ref('polls/' + req.body._parentID + "/userAnswers").child(req.body._id).child("users");
  databasePushRef.push(req.body.user);
  res.json(req.body._parentID);
})

app.post("/api/polls/userVote", (req, res, next) => {
  var userVote = {
    "text": req.body.userAnswer,
    "value": 1,
    "users": [req.body.user]
  }
  database.ref("polls/" + req.body._parentID + "/userAnswers/" + req.body.userLength).update(userVote);
  res.json(req.body._parentID)
});

app.post("/api/polls/voteMultiple/", (req, res) => {
  for (var i = 0; i < req.body.selected.length; i++) {
    if (req.body.selected[i].submitted == "toSubmit") {
      var userVote = {
        "text": req.body.selected[i].value,
        "value": 1,
        "users": [req.body.user]
      }
      database.ref("polls/" + req.body._parentID + "/userAnswers/" + req.body.userLength).update(userVote);
    } else if (req.body.selected[i].submitted === "answer") {
      var databaseRef = database.ref('polls/' + req.body._parentID + "/answers").child(req.body.selected[i]._id).child('value');
      databaseRef.transaction(function (value) {
        return (value || 0) + 1;
      });
      var databasePushRef = database.ref('polls/' + req.body._parentID + "/answers").child(req.body.selected[i]._id).child("users");
      databasePushRef.push(req.body.user);
    } else {
      var databaseRef = database.ref('polls/' + req.body._parentID + "/userAnswers").child(req.body.selected[i]._id).child('value');
      databaseRef.transaction(function (value) {
        return (value || 0) + 1;
      });
      var databasePushRef = database.ref('polls/' + req.body._parentID + "/userAnswers").child(req.body.selected[i]._id).child("users");
      databasePushRef.push(req.body.user);
    }
  }
  res.json(req.body._parentID);
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
  ref.once('value', function (snapshot) {
    res.json(snapshot.val());
  });
});

exports.app = functions.https.onRequest(app);