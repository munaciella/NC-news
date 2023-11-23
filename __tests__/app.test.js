const request = require('supertest', 'jest-sorted');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const endPoints = require('../endpoints.json');

afterAll(() => {
  db.end();
});

beforeEach(() => seed(testData));

describe('GET /api/topics', () => {
  test('200: returns an array of topic objects ', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(typeof topic.description).toBe('string');
          expect(typeof topic.slug).toBe('string');
        });
      });
  });
  test('404: responds with an error message with invalid path', () => {
    return request(app)
      .get('/api/topicz')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
});

describe('GET /api/articles/:article_id', () => {
  test('200: responds with an article by its id', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        const array = [body['article']];
        array.forEach((article) => {
          expect(typeof article.title).toBe('string');
          expect(typeof article.topic).toBe('string');
          expect(typeof article.author).toBe('string');
          expect(typeof article.body).toBe('string');
          expect(typeof article.created_at).toBe('string');
          expect(typeof article.votes).toBe('number');
          expect(typeof article.article_img_url).toBe('string');
        });
      });
  });
  test('400: responds with an error message if id is not a valid type', () => {
    return request(app)
      .get('/api/articles/banana')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('bad request');
      });
  });
  test('404: responds with an error message if article does not exist', () => {
    return request(app)
      .get('/api/articles/14')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
});

describe('GET /api/articles/:article_id/comments', () => {
  test('200: returns all comments in an array for an article id', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe('number');
          expect(typeof comment.votes).toBe('number');
          expect(typeof comment.created_at).toBe('string');
          expect(typeof comment.author).toBe('string');
          expect(typeof comment.body).toBe('string');
          expect(typeof comment.article_id).toBe('number');
          expect(comment.article_id).toBe(1);
        });
      });
  });
  test('200: responds with an empty array if article_id exists but there are no comments with that article_id', () => {
    return request(app)
      .get('/api/articles/2/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test('400: responds with an error message if id is not a valid type', () => {
    return request(app)
      .get('/api/articles/apple/comments')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('bad request');
      });
  });
});

describe('GET /api', () => {
  test('200: returns an object with all the endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endPoints);
      });
  });
  test('404: responds with an error message if article id does not exist', () => {
    return request(app)
      .get('/api/articles/99/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
});

describe('GET /api/articles', () => {
  test('200: returns an array of articles objects', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(5);
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe('string');
          expect(typeof article.title).toBe('string');
          expect(typeof article.article_id).toBe('number');
          expect(typeof article.topic).toBe('string');
          expect(typeof article.created_at).toBe('string');
          expect(typeof article.votes).toBe('number');
          expect(typeof article.article_img_url).toBe('string');
          expect(typeof article.comment_count).toBe('string');
          expect(body.articles).toBeSortedBy('created_at', {
            descending: true,
          });
        });
      });
  });
  test('404: responds with an error message with invalid path', () => {
    return request(app)
      .get('/api/article')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test('201: respond with a new comment for an article with a given id', () => {
    const newComment = {
      username: 'rogersop',
      body: 'This is an awesome comment',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          body: 'This is an awesome comment',
          author: 'rogersop',
        });
      });
  });
  test('201: respond with a new comment ignoring unnecessary fields', () => {
    const newComment = {
      username: 'rogersop',
      body: 'This is an awesome comment',
      location: 'Ignore me',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          body: 'This is an awesome comment',
          author: 'rogersop',
        });
      });
  });
  test('400: respond with an error message when article id provided is not a valid type', () => {
    const newComment = {
      username: 'icellusedkars',
      body: 'What an incredible article. I am in awe of this.',
    };
    return request(app)
      .post('/api/articles/one/comments')
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('bad request');
      });
  });
  test('400: respond with an error message when missing a required field', () => {
    const newComment = {
      body: 'What an incredible article. I am in awe of this.',
    };
    return request(app)
      .post('/api/articles/3/comments')
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('bad request');
      });
  });
  test('404: respond with an error message when article id provided does not exist', () => {
    const newComment = {
      username: 'icellusedkars',
      body: 'What an incredible article',
    };
    return request(app)
      .post('/api/articles/99/comments')
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
  test("404: If a new comment is posted with a username that doesn't exist an error will be returned", () => {
    const newComment = {
      username: 'CatsAreCool',
      body: 'Hello this is my new comment',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
});

describe('DELETE /api/comments/:comment_id', () => {
    test('204: responds with a deleted comment', () => {
      return request(app)
        .delete('/api/comments/1')
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
        });
    });
    test('400: responds with an error if invalid input', () => {
        return request(app)
        .delete('/api/comments/banana')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('bad request');
          });
      });
      test('404: responds with an error if comment id does not exist', () => {
        return request(app)
          .delete('/api/comments/99')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('not found');
          });
      });
  });
  