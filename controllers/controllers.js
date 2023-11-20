const { selectApiTopics } = require('../models/models');

exports.getApiTopics = (req, res, next) => {
  selectApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.handle404 = (req, res) => {
    res.status(404).send({ msg: 'path not found'})
}