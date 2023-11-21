const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

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

describe.skip('GET /api/articles/:article_id', () => {
  test('200: responds with an article by its id', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        const {articles} = body
        expect(articles).toHaveLength(13)
        articles.forEach((article) => {
            expect(article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(Number),
                votes: expect.any(Number),
                article_image_url: expect.any(String),
            })
        })
      });
  });
});
