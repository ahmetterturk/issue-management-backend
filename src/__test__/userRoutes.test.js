const request = require('supertest');

const userRoutes = require('../routes/userRoutes');

describe('User controller', () => {
  // Get request test to get all users
  it('GET /user, should return all users', () => {
    request(userRoutes)
      .get('/user')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContainig({
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            imageUrl: expect.any(String),
            isAdmin: expect.any(Boolean),
          })
        );
      });
  });
  // Get request test to get single user
  it('GET /user/:id, should return a single user', () => {
    request(userRoutes)
      .get('/user/:id')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        excpect(res.body).toEqual(
          expect.objectContainig({
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            imageUrl: expect.any(String),
            isAdmin: expect.any(Boolean),
          })
        );
      });
  });

  // Post request to singup the user
  it('POST /user, should return a new user with post request', () => {
    request(userRoutes)
      .post('/user/signup')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect.objectContainig({
          firstName: expect(res.body.firstName).toEqual('John'),
          lastName: expect(res.body.lastName).toEqual('Smith'),
          email: expect(res.body.email).toEqual('john@test.com'),
          password: expect(res.body.password).toEqual('secret'),
          imageUrl: expect(res.body.imageUrl).toEqual('http://imge.jpeg.com'),
          isAdmin: expect(res.body.isAdmin).toEqual(false),
        });
      });
  });

  // POST request to signin the user
  it('POST /user, should signin the user with post request', () => {
    request(userRoutes)
      .post('/user/signin')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect.objectContainig({
          email: expect(res.body.email).toEqual('john@test.com'),
          password: expect(res.body.password).toEqual('secret'),
        });
      });
  });

  // PATCH request to update the user
  it('PATCH /user/:id, should update the existing user', () => {
    request(userRoutes)
      .patch('/user/:id')
      .redirects('/')
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200)
      .set({
        firstName: 'Sarah',
        lastName: 'Jones',
        email: 'sarah@test.com',
        password: '121212',
        imageUrl: 'https://images.jpg.com',
        isAdmin: true,
      });
  });

  // PATCH request if the user not found with the current id
  it('PATCH /user/:id, should return id not found', () => {
    request(userRoutes)
      .patch('/user/:id')
      .redirects('/')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual('No user with id: 1');
      });
  });

  // DELETE request to delete the existing user
  it('PATCH /user/:id, should delete the existing user', () => {
    request(userRoutes)
      .delete('/user/:id')
      .redirects('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual('User has been deleted!');
      });
  });

  // DELETE request if the user not found with the current id
  it('PATCH /user/:id, should return id not found', () => {
    request(userRoutes)
      .delete('/user/:id')
      .redirects('/')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual('No user with id: 1');
      });
  });
});
