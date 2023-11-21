const express = require('express');
const { getApiTopics, handle404, getArticlesById } = require('./controllers/controllers');
const { handleCustomErrors, handleServerErrors } = require('./errors');
const app = express()


app.get('/api/topics', getApiTopics)

//app.get('/api/articles/:article_id', getArticlesById)

app.all('*', handle404)


app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;