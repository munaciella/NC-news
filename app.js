const express = require('express');
const { getApiTopics, getApi, getApiArticles, handle404 } = require('./controllers/controllers');
const { handleCustomErrors, handleServerErrors } = require('./errors');
const app = express()

app.get('/api/topics', getApiTopics)
app.get('/api', getApi)
app.get('/api/articles', getApiArticles)

app.all('*', handle404)

app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;