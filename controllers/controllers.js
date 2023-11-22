const {
  selectApiTopics,
  selectArticlesById,
  selectApiArticles,
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
  const commentsPromises = [selectCommentsByArticleId(article_id), selectArticlesById(article_id)]
  return Promise.all(commentsPromises)
    .then((resolvedPromises) => {
        const comments = resolvedPromises[0]
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getApiArticles = (req, res, next) => {
    selectApiArticles()
    .then((articles) => {
        res.status(200).send({ articles })
    })
    .catch(next)
}

exports.handle404 = (req, res) => {
  res.status(404).send({ msg: 'not found' });
};
