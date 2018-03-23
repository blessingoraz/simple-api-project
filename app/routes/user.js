const user = require('../controllers/user');
const VerifyToken = require('../auth/VerifyToken');


module.exports = (app) => {
    app.post('/user', user.create);

    app.post('/login', user.login);

    app.get('/users', VerifyToken, user.findAll);

    app.get('/user/:userId', VerifyToken, user.findOne);

    app.put('/user/:userId', VerifyToken, user.update);

    app.delete('/user/:userId', VerifyToken, user.delete);
};
