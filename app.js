const express = require('express');
const { getApiTopics, getApi, getApiArticles, getArticlesById, handle404 } = require('./controllers/controllers');
const { handleCustomErrors, handleServerErrors, handlePsqlErrors } = require('./errors');

const app = express()

app.get('/api/topics', getApiTopics)
app.get('/api', getApi)
app.get('/api/articles', getApiArticles)

app.get('/api/articles/:article_id', getArticlesById)

app.all('*', handle404)

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;