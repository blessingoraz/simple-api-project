const user = require('../controllers/user');

module.exports = (app) => {
    app.post('/user', user.create);

    app.post('/login', user.login);

    app.get('/users', user.findAll);

    app.get('/user/:userId', user.findOne);

    app.put('/user/:userId', user.update);

    app.delete('/user/:userId', user.delete);
};
