const db = require('../db/connection');

exports.selectApiTopics = () => {
  return db.query(`SELECT * FROM topics`).then((result) => {
    return result.rows;
  });
};

exports.selectApiArticles = (topic) => {
  let queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`;
  const queryValues = [];
  if (topic) {
    queryValues.push(topic);
    queryString += ` WHERE topic = $1 GROUP BY articles.article_id ORDER BY created_at DESC; `;
    return db.query(queryString, queryValues).then((result) => {
      return result.rows;
    });
  } else {
    queryString += ` GROUP BY articles.article_id ORDER BY created_at DESC `;
    return db.query(queryString, queryValues).then((result) => {
      return result.rows;
    });
  }
};

exports.selectArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'path not found' });
      }
      return rows[0];
    });
};

exports.insertNewCommentById = ({ username, body }, article_id) => {
  const articleNumber = parseInt(article_id);
  return db
    .query(
      `INSERT INTO comments(author, body, article_id) VALUES ($1, $2, $3) RETURNING *`,
      [username, body, articleNumber]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.selectArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'not found' });
      }
      return rows[0];
    });
};

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
