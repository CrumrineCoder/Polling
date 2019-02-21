const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors')({ origin: true });
app.use(cors);
const fire = require("./fire.js");
var database = fire.database();
var auth = fire.auth();

app.get('/api', (req, res) => {
  console.log(req.body);
  const date = new Date();
  const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
  res.json({ bongs: 'BONG '.repeat(hours) });
});

app.post('/api/users/register', (req, res) => {
  console.log(req.body);
  const user = req.body;
  console.log(user);
  // Validate the user created an email and password
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  auth.createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode || errorMessage){
      console.log(errorCode);
      console.log(errorMessage);
      res.json(errorMessage)
    }
  });

  res.json(user); 
})

app.post('/api/users/login', (req, res) => {
  console.log(req.body);
  const user = req.body.user;
  console.log(user);
  // Validate the user created an email and password
  if (!user.email) {
    console.log("Email");
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    console.log("pas")
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  auth.signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode || errorMessage){
      console.log(errorCode);
      console.log(errorMessage);
      res.json(errorMessage)
    }
  });

  res.json(user); 
});


app.get('/api/users/current', (req, res, next) => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        var email = user.email;
        res.json({user: email});
      } else {
        res.json({user: null})
      }
    });
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
  databaseRef.transaction(function (value) {
    return (value || 0) + 1;
  });
  res.json(req.body._parentID);
});

app.post("/api/polls/voteUserAnswer", (req, res, next) => {
  var databaseRef = database.ref('polls/' + req.body._parentID + "/userAnswers").child(req.body._id).child('value');
  databaseRef.transaction(function (value) {
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
  database.ref("polls/" + req.body._parentID + "/userAnswers/" + req.body.userLength).update(userVote);
  res.json(req.body._parentID)
});

app.post("/api/polls/voteMultiple/", (req, res) => {
  for (var i = 0; i < req.body.selected.length; i++) {
    if (req.body.selected[i].submitted == "toSubmit") {
      var userVote = {
        "text": req.body.selected[i].value,
        "value": 1,
        "Users": [req.body.user]
      }
      database.ref("polls/" + req.body._parentID + "/userAnswers/" + req.body.userLength).update(userVote);
    } else if (req.body.selected[i].submitted === "answer") {
      var databaseRef = database.ref('polls/' + req.body._parentID + "/answers").child(req.body.selected[i]._id).child('value');
      databaseRef.transaction(function (value) {
        return (value || 0) + 1;
      });
    } else {
      var databaseRef = database.ref('polls/' + req.body._parentID + "/userAnswers").child(req.body.selected[i]._id).child('value');
      databaseRef.transaction(function (value) {
        return (value || 0) + 1;
      });
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
  ref.on('value', function (snapshot) {
    console.log(snapshot.val());
    res.json(snapshot.val());
  });
});

exports.app = functions.https.onRequest(app);