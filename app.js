const express = require('express');
const { getApi, getApiTopics, handle404, getArticlesById, getCommentsByArticleId, postNewCommentById, getApiArticles } = require('./controllers/controllers');
const { handleCustomErrors, handleServerErrors, handlePsqlErrors } = require('./errors');

const app = express()

app.use(express.json())

app.get('/api/topics', getApiTopics)
app.get('/api', getApi)
app.get('/api/articles', getApiArticles)
app.get('/api/articles/:article_id', getArticlesById)

app.post('/api/articles/:article_id/comments', postNewCommentById)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.all('*', handle404)

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;