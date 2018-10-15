const mongoose = require('mongoose');
const router = require('express').Router();
const Polls = mongoose.model('Polls');


router.post('/', (req, res, next) => {
  const { body } = req;
  console.log("HONK!");
  console.log(body);
/*
  if (!body.question) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if (!body.tag) {
    return res.status(422).json({
      errors: {
        tag: 'is required',
      },
    });
  }
*/

  const finalPoll = new Polls(body);
  return finalPoll.save()
    .then(() => res.json({ poll: finalPoll.toJSON() }))
    .catch(next);
});
router.get('/', (req, res, next) => {
  //
  console.log("ECH!");
  return Polls.find()
    .sort({ createdAt: 'descending' })
    .then((polls) => res.json({ polls: polls.map(poll => poll.toJSON()) }))
    .catch(next);
});

/*
router.post('/', (req, res, next) => {
  const { body } = req;

  console.log(body);

  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if (!body.tag) {
    return res.status(422).json({
      errors: {
        tag: 'is required',
      },
    });
  }


  const finalArticle = new Articles(body);
  return finalArticle.save()
    .then(() => res.json({ article: finalArticle.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Articles.find()
    .sort({ createdAt: 'descending' })
    .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
    .catch(next);
});




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

router.get('/:id', (req, res, next) => {
  console.log("GET", req.article.toJSON());
  return res.json({
    articles: [req.article.toJSON()],
  });
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