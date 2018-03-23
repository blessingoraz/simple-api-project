const Note = require('../models/note');
const User = require('../models/user');

const jwt = require('jsonwebtoken');


exports.create = (req, res) => {
    const note = new Note({
        create_by: req.params.userId,
        note: req.body.note
    });

    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        User.findById(note.create_by, (err, user) => {
            if (err) res.status(500).json({message: 'Cannot find user'});
            // user.notes.push(note);
            // user.save((err, user) => {
            //     if (err) res.status(500).send({message: 'Cannot create a user'});
            //     res.status(201).json(user);
            // });

            note.save((err, note) => {
                if (err) res.status(500).json({message: 'Cannot create a user'});
                res.status(201).json(note);
            });
        });
    });
};

exports.findAll = (req, res) => {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        Note.where('create_by').equals(req.params.userId).exec((err, notes) => {
            if (err) res.status(500).json({message: 'Cannot retrieve notes'});
            res.json(notes);
        });
    });
};

exports.update = (req, res) => {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Note.where('create_by').equals(req.params.userId).exec((err, note) => {
            if (err) res.status(500).json({message: 'Cannot retrieve notes'});
            Note.findById(req.params.noteId, (err, data) => {
                if (err) res.status(500).json({message: 'Cannot retrieve note'});
                data.note = req.body.note;

                data.save((err, note) => {
                    if (err) res.status(500).json({message: 'Cannot update note'});
                    res.json(note);
                });
            });
        });
    });
};

exports.delete = (req, res) => {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Note.where('create_by').equals(req.params.userId).exec((err, note) => {
            if (err) res.status(500).json({message: 'Cannot retrieve notes'});

            Note.remove({_id: req.params.noteId}, (err, note) => {
                if (err) res.status(500).json({message: 'Cannot delete note'});
                res.json({message: 'Note has been deleted'})
            });
        });
    });
};
