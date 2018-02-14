"use strict";

const should = require('should');
const sinon = require('sinon');
const mongoose = require('mongoose');

require('sinon-mongoose');

const UserModel = require('../../../app/models/user');

describe('User controller testing', () => {
    describe('Post user test', () => {
        it('Should save user', (done) => {
            var userMock = sinon.mock(new UserModel({
                username: "Test user from mock",
                email: "nffbbff@gmail.com",
                password: "rhfhhfhf"
            }));
            var user = userMock.object;

            userMock
                .expects('save')
                .yields(null, 'SAVED');

            user.save(function (err, result) {
                userMock.verify();
                userMock.restore();
                should.equal('SAVED', result, "Test fails due to unexpected result")
                done();
            });
        });
    });

    describe('Get users test', function () {
        it('Should get users', function (done) {
            var UserMock = sinon.mock(UserModel);
            UserMock
                .expects('find')
                .yields(null, 'USERS');

            UserModel.find(function (err, result) {
                UserMock.verify();
                UserMock.restore();
                should.equal('USERS', result, "Test fails due to unexpected result")
                done();
            });
        });
    });

    describe('Get user by Id test', () => {
        it('should get a user', (done) => {
            let userMock = sinon.mock(UserModel);
            userMock
                .expects('findById')
                .withArgs({ _id: 12344 })
                .yields(null, 'USER')

            UserModel.findById({ _id: 12344 }, (err, result) => {
                userMock.verify();
                userMock.restore();
                should.equal('USER', result, "Error here ")
                done();
            })
        })
    })

    describe('Delete user test', function () {
        it('Should delete user of given id', function (done) {
            var UserMock = sinon.mock(UserModel);

            UserMock
                .expects('remove')
                .withArgs({ _id: 12345 })
                .yields(null, 'DELETED');

            UserModel.remove({ _id: 12345 }, function (err, result) {
                UserMock.verify();
                UserMock.restore();
                done();
            })
        });
    });

    describe('Update a user test', function () {
        it('Should update the user with new value', function (done) {
            var userMock = sinon.mock(new UserModel({ username: 'Save new user from mock' }));
            var user = userMock.object;

            userMock
                .expects('save')
                .withArgs({ _id: 12345 })
                .yields(null, 'UPDATED');

            user.save({ _id: 12345 }, function (err, result) {
                userMock.verify();
                userMock.restore();
                done();
            })
        });
    });
})
