const note = require('../controllers/note');

module.exports = (app) => {
    app.post('/user/:userId/note', note.create);

    app.get('/user/:userId/notes', note.findAll);

    // app.get('/user/:userId', user.findOne);

    app.put('/user/:userId/notes/:noteId', note.update);

    app.delete('/user/:userId/notes/:userId', note.delete);
};

