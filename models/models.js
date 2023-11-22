const db = require('../db/connection');

exports.selectApiTopics = () => {
  return db.query(`SELECT * FROM topics`)
  .then((result) => {
    return result.rows;
  });
};

exports.selectApiArticles = () => {
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC`)
    .then((result) => {
        if(!result.rows.length) {
            return Promise.reject({status: 404, msg: 'path not found'})
        }
        return result.rows
    })
}

exports.selectArticlesById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if (!rows.length) {
            return Promise.reject({status: 404, msg: 'path not found'})
        }
        return rows[0]
    })
}

exports.insertNewCommentById = (article_id, username, body) => {
    //const {article_id, username, body} = newComment
    return db.query(`INSERT INTO articles(author, article_id, body) VALUES ($1, $2, $3) RETURNING*;`, [username,article_id, body])
    .then(({result}) => {
        return result.rows[0]
    })
}