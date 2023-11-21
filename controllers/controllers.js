const { selectApiTopics, selectArticlesById } = require('../models/models');

exports.getApiTopics = (req, res, next) => {
  selectApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
    const { body } = req.params
    selectArticlesById(articles)
    .then((articles) => {
        console.log(articles);
        res.status(200).send({ articles })
    })
    .catch(next)
}

exports.handle404 = (req, res) => {
    res.status(404).send({ msg: 'path not found'})
}