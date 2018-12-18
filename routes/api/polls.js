const mongoose = require('mongoose');
const router = require('express').Router();
const Polls = mongoose.model('Polls');
var ObjectId = require('mongodb').ObjectID;

router.post('/createPoll', (req, res, next) => {
  const { body } = req;
  const finalPoll = new Polls(body);
  return finalPoll.save()
    .then(() => res.json({ poll: finalPoll.toJSON() }))
    .catch(next);
});

router.get('/get/', (req, res, next) => {
  return Polls.find()
    .sort({ createdAt: 'descending' })
    .then((polls) => res.json({ polls: polls.map(poll => poll.toJSON()) }))
    .catch(next);
});
/*
router.param('id', (req, res, next, id) => {
  console.log("DONKEY KONG", id); 

  
  return Polls.findById( ObjectId(id), (err, poll) => {
    if (err) {
      return res.sendStatus(404);
    } else if (poll) {
      req.poll = poll;
      return next();
    }
  }).catch(next); 
}); */

router.get('/get/:id', (req, res, next) => {
  // res.send("Ok"); 
  return Polls.findOne({ _id: req.params.id }, function (err, docs) { res.json(docs) });
});

router.post("/voteAnswer", (req, res, next) => {
  console.log("Vote Body", req.body);
  Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body._id) }, { $push: { "answers.$.Users": req.body.user }, $inc: { "answers.$.value": 1, "value": 1 } }, function (err, docs) { res.json(docs) });
})

router.post("/voteUserAnswer", (req, res, next) => {
  console.log("Vote Body", req.body);
  Polls.findOneAndUpdate({ "userAnswers._id": ObjectId(req.body._id) }, { $push: { "userAnswers.$.Users": req.body.user}, $inc: { "userAnswers.$.value": 1, "value": 1 } }, function (err, docs) { res.json(docs) });
})

router.post("/userVote", (req, res, next) => {
  console.log("User Vote", req.body); 
  var userVote = {
    "text": req.body.userAnswer,
    "value": 1,
    "Users": [req.body.user]
  }
  return Polls.update(
    { _id: req.body._parentID },
    { $push: { userAnswers: userVote } },
    function (err, doc) {
      res.json(doc);
    });
});

router.post("/voteMultiple", (req, res, next) => {
  console.log("VOTE", req.body); 
  var report = [];
  //const user = {userID: req.body.user._id, email: req.body.user.email, token: req.body.user.token};
  for (var i = 0; i < req.body.selected.length; i++) {
    if (req.body.selected[i].submitted == "toSubmit") {
      var userVote = {
        "text": req.body.selected[i].value,
        "value": 1,
        "Users": [req.body.user]
        //{"id": req.body.user}
      }
      Polls.update(
        { _id: req.body._parentID },
        { $push: { userAnswers: userVote }, $inc: { "value": 1 } }, function (err, docs) { if (err) { console.log("ER ER ER", err); }; report.push(docs); });
      //   Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body.selected[i]._id) }, { $push: { "answers.$.users": req.body.user }  }, function(err, docs){ report.push(docs)});
    } else {
      if (req.body.selected[i].submitted === "answer") {
        Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body.selected[i]._id) }, { $push: { "answers.$.Users": req.body.user }, $inc: { "answers.$.value": 1, "value": 1 } }, function (err, docs) { report.push(docs); });
      } else {
        Polls.findOneAndUpdate({ "userAnswers._id": ObjectId(req.body.selected[i]._id) }, { $push: { "userAnswers.$.Users": req.body.user }, $inc: { "userAnswers.$.value": 1, "value": 1 } }, function (err, docs) { report.push(docs) });
      }
    }
  }
  return res.json(report);
});
mongoose.set('debug', true);

router.post("/rescind", (req, res, next) => {
  var report = [];
  for (var i = 0; i < req.body.answersLength; i++) {
    Polls.updateMany(
      { _id: ObjectId(req.body._parentID), "answers.Users": req.body.user },
      { $pull: { "answers.$.Users": req.body.user }, $inc: { "answers.$.value": -1, "value": -1 } },
      function (err, docs) {
        report.push(docs)
      });
  }
  for (var i = 0; i < req.body.userAnswersLength; i++) {
    Polls.updateMany(
      { _id: ObjectId(req.body._parentID), "userAnswers.Users": req.body.user },
      { $pull: { "userAnswers.$.Users": req.body.user }, $inc: { "userAnswers.$.value": -1, "value": -1 } },
      function (err, docs) {
        report.push(docs)
      });
  }
  return res.json(report);
})

/*
router.param('id', (req, res, next, id) => {

  return Articles.findById(id, (err, article) => {
    if (err) {
      return res.sendStatus(404);
    } else if (article) {
      console.log("param", article);
      req.article = article;
      return next();
    }
  }).catch(next);
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if (typeof body.title !== 'undefined') {
    req.article.title = body.title;
  }

  if (typeof body.tag !== 'undefined') {
    req.article.tag = body.tag;
  }

  if (typeof body.body !== 'undefined') {
    req.article.body = body.body;
  }
  console.log("Patch", req.article.toJSON());
  return req.article.save()
    .then(() => res.json({ article: req.article.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Articles.findByIdAndRemove(req.article._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

*/

module.exports = router;