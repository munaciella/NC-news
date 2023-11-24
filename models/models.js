const db = require('../db/connection');

exports.selectApiTopics = () => {
  return db.query(`SELECT * FROM topics`).then((result) => {
    return result.rows;
  });
};

exports.selectApiArticles = (query) => {
  const newQuery = query.topic;
  const queryType = Object.keys(query);
  if (newQuery === 'mitch' && queryType.includes('topic')) {
    return db
      .query(`SELECT * FROM articles WHERE topic = $1 `, [newQuery])
      .then((topic) => {
        console.log(topic[0]);
        return topic;
      });
  } else if (newQuery === 'cats' && queryType.includes('topic')) {
    return db
      .query(`SELECT * FROM articles WHERE topic = $1 `, [newQuery])
      .then((topic) => {
        return topic;
      });
  } else if (!newQuery) {
    return db
      .query(
        `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC`
      )
      .then((result) => {
        return result.rows;
      });
  } else if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: 'not found' });
  }
};

// if (!result.rows.length) {

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
