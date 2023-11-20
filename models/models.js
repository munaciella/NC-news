const db = require('../db/connection');
const endPoints = require('../endpoints.json')

exports.selectApiTopics = () => {
  return db.query(`SELECT * FROM topics`)
  .then((result) => {
    return result.rows;
  });
};

exports.selectApi = () => {
    return endPoints
}
