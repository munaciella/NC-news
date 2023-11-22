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
        expect(body.msg).toBe('path not found');
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
        expect(body.msg).toBe('path not found');
      });
  });
});
