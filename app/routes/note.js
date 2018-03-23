const note = require('../controllers/note');
const VerifyToken = require('../auth/VerifyToken');

module.exports = (app) => {
    app.post('/user/:userId/note', VerifyToken, note.create);

    app.get('/user/:userId/notes', VerifyToken, note.findAll);

    app.put('/user/:userId/notes/:noteId', VerifyToken, note.update);

    app.delete('/user/:userId/notes/:noteId', VerifyToken, note.delete);
};

