const { selectApiTopics, selectApiArticles } = require('../models/models');
const endPoints = require('../endpoints.json')

exports.getApiTopics = (req, res, next) => {
  selectApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getApi = (req, res, next) => {
        res.status(200).send(endPoints)
    }

exports.getApiArticles = (req, res, next) => {
    selectApiArticles()
    .then((articles) => {
        res.status(200).send({ articles })
    })
    .catch(next)
}


exports.handle404 = (req, res) => {
    res.status(404).send({ msg: 'path not found'})
}