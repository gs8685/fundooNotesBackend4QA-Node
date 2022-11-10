import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

var jwtToken;
var NOTEID;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {
          console.log('DB collection droped');
        });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /users', () => {
    it('Correct input type provided : should return created status code 201', (done) => {
      const userDetails = {
        firstname: 'Darshan',
        lastname: 'Deshmukh',
        email: 'abc@gmail.com',
        password: '123456789'
      };
      request(app)
        .post('/api/v1/users')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
    it('Wrong input type provided : should return status code 400', (done) => {
      const userDetails = {
        firstname: 12345,
        lastname: 'Deshmukh',
        email: 'abc@gmail.com',
        password: '123456789'
      };
      request(app)
        .post('/api/v1/users')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
    it('Correct login credentials provided : should return ok status code 200', (done) => {
      const userDetails = { email: 'abc@gmail.com', password: '123456789' };
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          jwtToken = res.body.data;
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
    it('Wrong login credentials provided : should return error status code 400', (done) => {
      const userDetails = { email: 'abc@gmail.com', password: '12345678' };
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
  });

  describe('CRUD /notes', () => {
    it('Create Note: should return created status code 201', (done) => {
      const note = {
        title: 'testing notes api',
        description: 'testing notes api using mocha and chai'
      };
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(note)
        .end((err, res) => {
          NOTEID = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);

          done();
        });
    });
    it('Create Note given wrong token: should return unauthorized status code 401', (done) => {
      const note = {
        title: 'testing notes api',
        description: 'testing notes api using mocha and chai'
      };
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${jwtToken + '123'}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(401);

          done();
        });
    });
    it('Read note: should return OK status code 200', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('Authorization', `Bearer ${jwtToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
    it('Update note: should return accepted status code 202', (done) => {
      const Updatenote = {
        description: 'testing notes api using mocha and chai.... updated'
      };
      request(app)
        .put(`/api/v1/notes/${NOTEID}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(Updatenote)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);

          done();
        });
    });
    it('Update note given wrong token id : should return bad request status code 400', (done) => {
      const Updatenote = {
        description: 'testing notes api using mocha and chai.... updated'
      };
      request(app)
        .put(`/api/v1/notes/${NOTEID + 123}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(Updatenote)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
    it('Delete note: should return OK status code 200', (done) => {
      request(app)
        .delete(`/api/v1/notes/${NOTEID}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
  });
});
