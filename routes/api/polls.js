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
  console.log(req.body);
  for (var i = 0; i < req.body.selected.length; i++) {
    if (req.body.selected[i]._id == "Other") {
      console.log(req.body.selected[i])
      var userVote = {
        "text": req.body.selected[i].value,
        "value": 1
      }
      Polls.update(
        { _id: req.body._parentID },
        { $push: { userAnswers: userVote } });
    } else {
      Polls.aggregate([
        { "$unwind": '$parent' },
        {
          "$match":
            { "answers._id": req.body.selected[i]._id }
        }
      ]); 
      console.log("Name", req.body.selected[i].value);
      console.log("ID", req.body.selected[i]._id);
      Polls.findOneAndUpdate({ "answers._id": ObjectId(req.body.selected[i]._id) }, { $inc: { "answers.$.value": 1, "value": 1 } }, function(err, doc){
        console.log("Doc", doc);
      })
    }
  }
  return res.json(req.body);
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