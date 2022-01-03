const request = require('supertest');

const messageRoutes = require('../routes/messagesRoutes');

describe('Message controller', () => {
  // GET request test to get all messages
  it('GET /messages, should return all the users', () => {
    request(messageRoutes)
      .get('/messages')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContainig({
            messageBody: expect.any(String),
            issueId: expect.any(String),
            userName: expect.any(String),
            userId: expect.any(String),
          })
        );
      });
  });
  // Post request test to create a message
  it('POST /messages, should create a new message', () => {
    request(messageRoutes)
      .get('/messages')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect.objectContainig({
          messageBody: expect(res.body.messageBody).toEqual('Hello there'),
          issueId: expect(res.body.issueId).toEqual('John Smith'),
          userName: expect(res.body.userName).toEqual('10101014dsf'),
          userId: expect(res.body.userId).toEqual('0598uyt'),
        });
      });
  });
  // Delete request test for delete a message
  it('DELETE /messages/:id, should delete a message', () => {
    request(messageRoutes)
      .delete('/messages/:id')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual('Message has been deleted');
      });
  });
  // Delete request test for not found 404
  it('DELETE /messages/:id, should return 404 not found', () => {
    request(messageRoutes)
      .delete('/messages/:id')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual('No message with id 111');
      });
  });
});
