
"use strict";

const should = require('should');
const sinon = require('sinon');
const mongoose = require('mongoose');

require('sinon-mongoose');

const NoteModel = require('../../../app/models/note');

describe('Note controller testing', () => {
    describe('Post note test', () => {
        it('Should save note', (done) => {
            var noteMock = sinon.mock(new NoteModel({
                note: "Test note from mock",
            }));
            var note = noteMock.object;

            noteMock
                .expects('save')
                .yields(null, 'SAVED');

            note.save(function (err, result) {
                noteMock.verify();
                noteMock.restore();
                should.equal('SAVED', result, "Test fails due to unexpected result")
                done();
            });
        });
    });

    describe('Get notes test', function () {
        it('Should get notes', function (done) {
            var NoteMock = sinon.mock(NoteModel);
            NoteMock
                .expects('find')
                .yields(null, 'NOTES');

            NoteModel.find(function (err, result) {
                NoteMock.verify();
                NoteMock.restore();
                should.equal('NOTES', result, "Test fails due to unexpected result")
                done();
            });
        });
    });

    describe('Delete note test', function () {
        it('Should delete note of given id', function (done) {
            var NoteMock = sinon.mock(NoteModel);

            NoteMock
                .expects('remove')
                .withArgs({ _id: 12345 })
                .yields(null, 'DELETED');

            NoteModel.remove({ _id: 12345 }, function (err, result) {
                NoteMock.verify();
                NoteMock.restore();
                done();
            })
        });
    });

    describe('Update a note test', function () {
        it('Should update the note with new value', function (done) {
            var noteMock = sinon.mock(new NoteModel({ text: 'Save new note from mock' }));
            var note = noteMock.object;

            noteMock
                .expects('save')
                .withArgs({ _id: 12345 })
                .yields(null, 'UPDATED');

            note.save({ _id: 12345 }, function (err, result) {
                noteMock.verify();
                noteMock.restore();
                done();
            })
        });
    });
})
