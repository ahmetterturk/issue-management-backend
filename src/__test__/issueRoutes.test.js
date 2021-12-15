const request = require('supertest');

const issueRoutes = require('../routes/issuesRoutes');

describe('Issues Api', () => {
  // test for get request of all issues
  it('GET /issues, should return all issues from databse', () => {
    request(issueRoutes)
      .get('/issues')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContainig({
            title: expect.any(String),
            desc: expect.any(String),
            type: expect.any(Boolean),
            priority: expect.any(String),
            status: expect.any(String),
            members: expect.any(Array),
            userId: expect.any(String),
          })
        );
      });
  });
  // test for get request for single issue
  it('GET /issues/:id, should return single issues', () => {
    request(issueRoutes)
      .get('/issues/:id')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContainig({
            title: expect.any(String),
            desc: expect.any(String),
            type: expect.any(Boolean),
            priority: expect.any(String),
            status: expect.any(String),
            members: expect.any(Array),
            userId: expect.any(String),
          })
        );
      });
  });
  // test for get request if single issue not found to return 404
  it('GET /issues/:id, should return with status 404 if not found issue', () => {
    request(issueRoutes)
      .get('/issues/:id')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual('No issue found with id 1111');
      });
  });
  // test for post request to create an issue
  it('POST /issues, should create an issue', () => {
    request(issueRoutes)
      .post('/issues')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((req) => {
        expect.objectContainig({
          title: expect(req.body.title).toEqual('some title'),
          desc: expect(req.body.desc).toEqual('some desc'),
          type: expect(req.body.type).toEqula(true),
          priority: expect(req.body.priority).toEqual('Low'),
          status: expect(req.body.status).teEqual('New'),
          members: expec(req.body.members).toEqual(['Sam', 'Ahmet', 'Arturo']),
          userId: expect(req.body.userId).toEqual('some id'),
        });
      });
  });
  // test for patch request to update an issue with specific id
  it('PATCH /issues/:id, should update an issue', () => {
    request(issueRoutes)
      .patch('/issues/:id')
      .expect('Content-Type', /json/)
      .send({
        title: 'edit title',
        desc: 'edited description',
        type: false,
        priority: 'High',
        status: 'Pending',
        memebers: [],
        userId: 'some id',
      })
      .expect(200);
  });
  // test fer patch request to return 404 if the issue with specific id not found
  it('PATCH /issues/:id, should return with status 404 if not found issue to update', () => {
    request(issueRoutes)
      .patch('/issues/:id')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual('No issue found with id 999');
      });
  });
  // test for delete an issue with specific id
  it('DELETE /issues, should delete an issue', () => {
    request(issueRoutes)
      .delete('/issues/:id')
      .expect('Content-Type', /json/)
      .send({})
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual('Issue has been deleted!');
      });
  });
  // test fer delete request to return 404 if the issue with specific id not found
  it('Delete /issues/:id, should return with status 404 if not found issue to delete', () => {
    request(issueRoutes)
      .patch('/issues/:id')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual('No issue found with id 988');
      });
  });
});
