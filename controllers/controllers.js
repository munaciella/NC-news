const {
  selectApiTopics,
  selectApiArticles,
  selectArticlesById,
  insertNewCommentById,
  selectCommentsByArticleId,
  selectApiUsers,
  deleteComment,
  updateArticleById,
  selectUsername
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
  const commentsPromises = [
    selectCommentsByArticleId(article_id),
    selectArticlesById(article_id),
  ];
  return Promise.all(commentsPromises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getApiArticles = (req, res, next) => {
  const { topic } = req.query;
  selectApiArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.postNewCommentById = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;
  insertNewCommentById(newComment, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getApiUsers = (req, res, next) => {
    selectApiUsers()
      .then((users) => {
        res.status(200).send({ users });
      })
      .catch(next);
  };

  exports.getUserByUsername = (req, res, next) => {
    const username = req.params.username
    selectUsername(username)
      .then((user) => {
        res.status(200).send({ user })
      })
      .catch(next)
  }

exports.deleteCommentById = (req, res, next) => {
    const {comment_id} = req.params
    deleteComment(comment_id)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}

exports.patchArticlesById = (req, res, next) => {
    const newVote = req.body
    const {article_id} = req.params
    const patchPromises = [updateArticleById(newVote, article_id), selectArticlesById(article_id)]
    return Promise.all(patchPromises)
    .then((resolvedPatchPromises) => {
        const result = resolvedPatchPromises[0]
        res.status(201).send(result)
    })
    .catch(next)
}

exports.handle404 = (req, res) => {
  res.status(404).send({ msg: 'not found' });
}