const db = require('../db/connection');

exports.selectApiTopics = () => {
  return db.query(`SELECT * FROM topics`).then((result) => {
    return result.rows;
  });
};

exports.selectApiArticles = () => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC`
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: 'not found' });
      }
      return result.rows;
    });
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
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
    .then(({rows}) => {
        return rows
    })
}

exports.selectApiUsers = () => {
    return db.query(`SELECT * FROM users`)
    .then((result) => {
      return result.rows;
    });
  };
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.deleteComment = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'not found' });
      } else {
        return rows;
      }
    });
};

exports.updateArticleById = (newVote, article_id) => {
  const newVotes = newVote.votes;
  if (typeof newVotes === 'number') {
    return db
      .query(
        'UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;',
        [article_id, newVotes]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  } else {
    return Promise.reject({ status: 400, msg: 'bad request' });
  }
};
