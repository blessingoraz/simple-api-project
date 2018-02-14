const Note = require('../models/note');
const User = require('../models/user');


exports.create = (req, res) => {
    const note = new Note({
        create_by: req.params.userId,
        note: req.body.note
    });
    User.findById(note.create_by, (err, user) => {
        if (err) res.status(500).send({message: 'Cannot find user'});
        user.notes.push(note);
        user.save((err, user) => {
            if (err) res.status(500).send({message: 'Cannot create a user'});
            res.status(201);
            res.send(user);
        });

        note.save((err, note) => {
            if (err) res.status(500).send({message: 'Cannot create a user'});
            res.status(201);
            res.send(note);
        });
    });
};

exports.findAll = (req, res) => {
    Note.where('create_by').equals(req.params.userId).exec((err, notes) => {
        if (err) res.status(500).send({message: 'Cannot retrieve notes'});
        res.send(notes);
    });
};

exports.update = (req, res) => {
    Note.where('create_by').equals(req.params.userId).exec((err, note) => {
        if (err) res.status(500).send({message: 'Cannot retrieve notes'});
        Note.findById(req.params.noteId, (err, data) => {
            if (err) res.status(500).send({message: 'Cannot retrieve note'});
            data.note = req.body.note;

            data.save((err, note) => {
                if (err) res.status(500).send({message: 'Cannot update note'});
                res.send(note);
            });
        });
    });
};

exports.delete = (req, res) => {
    Note.where('create_by').equals(req.params.userId).exec((err, note) => {
        if (err) res.status(500).send({message: 'Cannot retrieve notes'});

        Note.remove({_id: req.params.noteId}, (err, note) => {
            if (err) res.status(500).send({message: 'Cannot delete note'});
            res.send({message: 'Note has been deleted'})
        });

        //TODO: remove the note from the notes array in user
    });
};
