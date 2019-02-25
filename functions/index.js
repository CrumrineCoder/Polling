const functions = require('firebase-functions');
const express = require('express');
/*
const passport = require('passport');
const passportAuth = require('./auth');
*/
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

  auth.createUserWithEmailAndPassword(user.email, user.password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode || errorMessage) {
      console.log(errorCode);
      console.log(errorMessage);
      res.json(errorMessage)
    }
  });

  res.json(user);
});


app.post('/api/users/logout', (req, res) => {
  auth.signOut();
  res.json({ "user": null });
})


app.post('/api/users/login', (req, res, next) => {
  const user = req.body.user;
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

  auth.signInWithEmailAndPassword(user.email, user.password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode || errorMessage) {
      console.log(errorCode);
      console.log(errorMessage);
      res.json(errorMessage)
    }
  });
/*
  // Use Passport's local strategy to authenticate. If so, return a token. 
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
  })(req, res, next); */
  res.json({"user": user});
});


app.get('/api/users/current', (req, res, next) => {
   auth.onAuthStateChanged(function (user) {
     if (user) {
       var email = user.email;
       console.log("LOGGED IN!");
       res.json({ user: email });
     } else {
       console.log("-not logged in-")
       res.json({ user: null })
     }
   }); 

  /*
   if(user){
     res.json({user: user.email});
   } else{
     res.json({user: null});
   } */
  /*(async () => {
    const fetchUser = new Promise((resolve, reject) => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user)
        } else {
          reject(console.log)
        }
      })
    })

    let user = await fetchUser();
    if (user) {
      res.json({ user: user.email });
    } else {
      res.json({ user: null });
    }
  }); */
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
  console.log("Reqbody", req.body);
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
  ref.once('value', function (snapshot) {
    console.log(snapshot.val());
    res.json(snapshot.val());
  });
});

exports.app = functions.https.onRequest(app);