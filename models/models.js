const db = require('../db/connection');

exports.selectApiTopics = () => {
  return db.query(`SELECT * FROM topics`)
  .then((result) => {
    return result.rows;
  });
};

exports.selectApiArticles = () => {
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id GROUP BY article_id`)
    .then((result) => {
        console.log(result);
        return result.rows
    })
}