const { selectApiTopics, selectApi} = require('../models/models');
const endPoints = require('../endpoints.json')

exports.getApiTopics = (req, res, next) => {
  selectApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getApi = (req, res, next) => {
    selectApi()
        res.status(200).send(endPoints)
    }


exports.handle404 = (req, res) => {
    res.status(404).send({ msg: 'path not found'})
}