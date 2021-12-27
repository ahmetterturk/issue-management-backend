// const request = require('supertest');

// const profilesRoutes = require('../routes/profilesRoutes');

// describe('Profile Api', () => {
//   // test for get request to get all profiles
//   it('GET /users/profiles, it should return an array of profiles', () => {
//     request(profilesRoutes)
//       .get('/users/profiles')
//       .expect('Content-Type', /json/)
//       .set('Accept', 'application/json')
//       .expect(200)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContainig({
//             fullName: expect.any(String),
//             address: expect.any(String),
//             emergencyContact: expect.any(String),
//             mobilePhone: expect.any(String),
//             dateOfBirth: expect.any(Date),
//             userId: expect.any(String),
//           })
//         );
//       });
//   });
//   // test for get request to get single profile
//   it('GET /users/profiles/:id, it should return a single profile', () => {
//     request(profilesRoutes)
//       .get('/users/profiles/:id')
//       .expect('Content-Type', /json/)
//       .set('Accept', 'application/json')
//       .expect(200)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContainig({
//             fullName: expect.any(String),
//             address: expect.any(String),
//             emergencyContact: expect.any(String),
//             mobilePhone: expect.any(String),
//             dateOfBirth: expect.any(Date),
//             userId: expect.any(String),
//           })
//         );
//       });
//   });
//   // test for get request to return 404 status code, if the profile not found with id
//   it("GET /users/profiles/:id, it should return status 404 if it couldn't find the id", () => {
//     request(profilesRoutes)
//       .get('/users/profiles/:id')
//       .expect('Content-Type', /json/)
//       .expect(404)
//       .then((res) => {
//         expect(res.body).toEqual('No profile found with id 1111');
//       });
//   });
//   // test for post request to create a profile
//   it('POST /issues, should create an issue', () => {
//     request(profilesRoutes)
//       .post('/issues')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .then((req) => {
//         expect.objectContainig({
//           fullName: expect(req.body.fullName).toEqual('John Smith'),
//           address: expect(req.body.address).toEqual(
//             '21 brown st, Castle Hill '
//           ),
//           emergencyContact: expect(req.body.emergencyContact).toEqula('true'),
//           mobilePhone: expect(req.body.mobilePhone).toEqual('049023945'),
//           dateOfBirth: expect(req.body.dateOfBirth).teEqual('22-04-1990'),
//           userId: expec(req.body.userId).toEqual('some id'),
//         });
//       });
//   });

//   // tst for patch request to update a profile
//   it('PATCH /users/profiles/:id, should update a profile', () => {
//     request(profilesRoutes)
//       .patch('/users/profiles/:id')
//       .expect('Content-Type', /json/)
//       .send({
//         fullName: 'Sarah Nin',
//         address: '30 s, Birmingham ave, Bondi.',
//         emergencyContact: 'Ashley Cameron',
//         mobilePhone: '0432989897',
//         dateOfBirth: '22-09-1995',
//         userId: 'some id',
//       })
//       .expect(200);
//   });
//   // test for get request to return 404 status code, if the profile for update not found with id
//   it("PATCH /users/profiles/:id, it should return status 404 if it couldn't find the id", () => {
//     request(profilesRoutes)
//       .patch('/users/profiles/:id')
//       .expect('Content-Type', /json/)
//       .expect(404)
//       .then((res) => {
//         expect(res.body).toEqual('No profile found with id 1111');
//       });
//   });
//   // test for delete request
//   it('DELETE /users/profiles/:id, it should return 200 ok', () => {
//     request(profilesRoutes)
//       .delete('/users/profiles/:id')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .then((res) => {
//         expect(res.body).toEqual({ msg: 'Profile has been deleted' });
//       });
//   });

//   // test for get request to return 404 status code, if the profile for update not found with id
//   it("DELETE /users/profiles/:id, it should return status 404 if it couldn't find the id", () => {
//     request(profilesRoutes)
//       .delete('/users/profiles/:id')
//       .expect('Content-Type', /json/)
//       .expect(404)
//       .then((res) => {
//         expect(res.body).toEqual('No profile found with id 1111');
//       });
//   });
// });
