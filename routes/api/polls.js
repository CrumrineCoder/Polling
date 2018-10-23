const mongoose = require('mongoose');
const router = require('express').Router();
const Polls = mongoose.model('Polls');
var ObjectId = require('mongodb').ObjectID;



router.post('/', (req, res, next) => {
  const { body } = req;
  const finalPoll = new Polls(body);
  return finalPoll.save()
    .then(() => res.json({ poll: finalPoll.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  console.log("Get all Polls");
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
      console.log("param", poll);
      req.poll = poll;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  console.log("GET", req.poll.toJSON());
  return res.json({
    polls: [req.poll.toJSON()],
  });
});

router.post("/vote", (req, res, next) => {
  console.log(req.body);
  Polls.aggregate([
    { "$unwind": '$parent' },
    {
      "$match":
        { "answers._id": req.body._id }
    }
  ]);
  Polls.update({ "answers._id": ObjectId(req.body._id) }, { $inc: { "answers.$.value": 1, "value": 1 } }).then(() => res.sendStatus(200))
  .catch(next);
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