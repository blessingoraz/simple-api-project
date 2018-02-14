"use strict";

const should = require('should');
const request = require('supertest');
const app = require('../../../server');
const agent = request.agent(app);

describe('User CRUD integration testing', () => {
    describe('Get all users', () => {

        before((done) => {
            const newUser = { username: "User from hooks", email: "hello@gmail.com", password: 'hello' };
            agent
                .post('/user')
                .send(newUser)
                .end(function () {
                    done();
                })
        });

        it('Should get status equal success and array of user', (done) => {
            agent
                .get('/users')
                .expect(200)
                .end(function (err, results) {
                    results.status.should.equal(200);
                    done();
                });
        });

    });

    describe('Post a user', () => {
        it('Should allow post to post a user and return _id', (done) => {
            var params = { username: "User eerrer testing", email: "deeeew@gmail.com", password: "rerere" };
            agent
                .post('/user')
                .send(params)
                .expect(200)
                .end((err, results) => {
                    results.body.email.should.equal('deeeew@gmail.com');
                    results.body.should.have.property('_id');
                    done();
                });
        });
    });

    describe('Delete a user', () => {
        var id;
        before((done) => {
            var params = { username: "User from hooks to", email: "wweew@gmail.com", password: "ererre" };
            agent
                .post('/user')
                .send(params)
                .end((err, result) => {
                    id = result.body._id;
                    done();
                });
        });

        it('Should delete the user by _id', (done) => {
            agent
                .delete(`/user/${id}`)
                .end((err, result) => {
                    result.body.message.should.equal('User deleted');
                    done();
                });
        });

    });

    describe('Update a user', () => {
        var id;
        before((done) => {
            var params = { username: "User here", email: "weweew@gmail.com", password: "dfdffd" };
            agent
                .post('/user')
                .send(params)
                .end((err, result) => {
                    id = result.body._id;
                    done();
                });
        });

        it('Should update the completed status of user by _id to true', function (done) {
            var params = { email: 'lovelove@gmail.com', password: "ddssdsds" };
            agent
                .put(`/user/${id}`)
                .send(params)
                .end(function (err, result) {
                    result.body.email.should.equal('lovelove@gmail.com');
                    done();
                });
        });
    });
});
