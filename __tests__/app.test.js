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

// describe("GET /api/articles/:article_id", () => {
//     test("201: responds with an article by its id", () => {
//       const newPrice = { cost_at_auction: 500 };
//       return request(app)
//     //     .get("/api/treasures/1")
//     //     .send(newPrice)
//     //     .expect(201)
//     //     .then(({ body }) => {
//     //       expect(body.treasures).toMatchObject({
//     //         treasure_name: "treasure-a",
//     //         colour: "turquoise",
//     //         age: 200,
//     //         cost_at_auction: 500,
//     //         shop_id: 1,
//     //         treasure_id: 1,
//     //       });
//     })
// })