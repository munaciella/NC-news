const db = require('../db/connection');

exports.selectApiTopics = () => {
  return db.query(`SELECT * FROM topics`)
  .then((result) => {
    return result.rows;
  });
};

exports.selectArticlesById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if (!rows.length) {
            return Promise.reject({status: 404, msg: 'path not found'})
        }
        return rows[0]
    })
}