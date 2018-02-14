"use strict";

const should = require('should');
const request = require('supertest');
const app = require('../../../server');
const agent = request.agent(app);

describe('Note CRUD integration testing', () => {
    describe('Get all notes', () => {
        it('Should get status equal success and array of note', (done) => {
            const userId = '5a841a3b3e2e9da2f4a3c0a3';
            agent
                .get(`/user/${userId}/notes`)
                .expect(200)
                .end(function (err, results) {
                    results.status.should.equal(200);
                    done();
                });
        });
    });

    describe('Post a note', () => {
        it('Should allow post to post a note and return _id', (done) => {
            const params = { text: "Note eerrer testing" };
            const userId = '5a841a3b3e2e9da2f4a3c0a3';
            agent
                .post(`/user/${userId}/note`)
                .send(params)
                .expect(200)
                .end((err, results) => {
                    results.body.should.have.property('_id');
                    done();
                });
        });
    });

    describe('Delete a note', () => {
        const userId = '5a841a3b3e2e9da2f4a3c0a3';
        const noteId = '5a84a489eb49e9fb97594376';

        it('Should delete the user by _id', (done) => {
            agent
                .delete(`/user/${userId}/notes/${noteId}`)
                .end((err, result) => {
                    result.body.message.should.equal('Note has been deleted');
                    done();
                });
        });

    });
});
