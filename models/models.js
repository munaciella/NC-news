const db = require('../db/connection');

exports.selectApiTopics = () => {
  return db.query(`SELECT * FROM topics`)
  .then((result) => {
    return result.rows;
  });
};

exports.selectArticlesById = (id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [id])
    .then(({rows}) => {
        return rows
    })
}
