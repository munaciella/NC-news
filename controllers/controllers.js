const {
  selectApiTopics,
  selectArticlesById,
  selectCommentsByArticleId,
} = require('../models/models');
const endPoints = require('../endpoints.json');

exports.getApiTopics = (req, res, next) => {
  selectApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getApi = (req, res, next) => {
  res.status(200).send(endPoints);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  console.log(article_id);
  selectCommentsByArticleId(article_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.handle404 = (req, res) => {
  res.status(404).send({ msg: 'path not found' });
};
