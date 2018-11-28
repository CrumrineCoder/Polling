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

router.get('/', (req, res, next) => {
  return Polls.find()
    .sort({ createdAt: 'descending' })
    .then((polls) => res.json({ polls: polls.map(poll => poll.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Polls.findById(id, (err, poll) => {
    if (err) {
      return res.sendStatus(404);
    } else if (poll) {
      req.poll = poll;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    polls: [req.poll.toJSON()],
  });
});


//GET current route (required, only authenticated users have access)
router.get('/getOne', (req, res, next) => {
  const id = req.payload;
  return Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }
      return res.json({ user: user.toAuthJSON() });
    });
});

router.post("/vote", (req, res, next) => {
  Polls.aggregate([
    { "$unwind": '$parent' },
    {
      "$match":
        { "answers._id": req.body._id }
    }
  ]);
  return Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body._id) }, { $inc: { "answers.$.value": 1, "value": 1 } }, function (err, doc) {
    res.json(doc);
  })
})

router.post("/userVote", (req, res, next) => {
  var userVote = {
    "text": req.body.selected,
    "value": 1
  }
  return Polls.update(
    { _id: req.body._parentID },
    { $push: { userAnswers: userVote } },
    function (err, doc) {
      res.json(doc);
    });
});

router.post("/voteMultiple", (req, res, next) => {
  var report = [];
  console.log("body", req.body);
  for (var i = 0; i < req.body.selected.length; i++) {
    console.log("submitted", req.body.selected[i]);
    if (req.body.selected[i].submitted == "toSubmit") {
      console.log("TO SUBMIT");
      var userVote = {
        "text": req.body.selected[i].value,
        "value": 1
      }
      console.log(userVote);
      Polls.update(
        { _id: req.body._parentID },
        { $push: { userAnswers: userVote } }, function (err, docs) { console.log("DOCS", docs) });
      //   Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body.selected[i]._id) }, { $push: { "answers.$.users": req.body.user }  }, function(err, docs){ report.push(docs)});
    } else {
      if (req.body.selected[i].submitted === "answer") {
        //      Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body.selected[i]._id) }, { $inc: { "answers.$.value": 1, "value": 1 } }, function (err, docs) { report.push(docs) });
        console.log("Body User!", req.body.user);
        Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body.selected[i]._id) }, { $push: { "answers.$.Users": req.body.user }, $inc: { "answers.$.value": 1, "value": 1 } }, function (err, docs) { report.push(docs) });
      } else {
        Polls.findOneAndUpdate({ "userAnswers._id": ObjectId(req.body.selected[i]._id) }, { $inc: { "userAnswers.$.value": 1, "value": 1 } }, function (err, docs) { report.push(docs) });
        Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body.selected[i]._id) }, { $push: { "answers.$.Users": req.body.user } }, function (err, docs) { report.push(docs) });
      }
    }
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