const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.create = (req, res) => {
    const user = new User(req.body);
    const payload = {
        admin: user.admin,
        id: user._id
    };
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
    user.token = token;
    if (!validator.isEmail(user.email)) return res.status(500).send("Email is not correct");
    user.save((err, user) => {
        if (err) return res.status(500).send({ message: 'Cannot create a user' });
        res.status(201);
        res.send(user);
    });
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) res.status(500).send({ message: `Cannot find user with email: ${req.body.email}` });
        if (!user) return res.status(404).send('No user found.');
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err || isMatch === false) res.status(500).send({ message: `You cannot login` });
            const token = jwt.sign({ id: user._id }, secret.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            user.token = token;
            res.send(user);
        });
    });
};

exports.findAll =  (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.find({}, (err, users) => {
            if (err) res.status(500).json({ message: 'Cannot retrieve users' });
            if (!users) return res.status(404).send("No users found.");

            res.json(users);
        });
    });

};

exports.findOne = (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        User.findById(req.params.userId).populate('notes').exec((err, user) => {
            if (err) res.status(500).send({ message: 'Cannot retrieve user' });
            res.send(user);
        });
    });
};

exports.update = (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        User.findById(req.params.userId, (err, user) => {
            if (err) res.status(500).send({ message: 'Cannot retrieve user' });
            user.username = req.body.username;
            user.email = req.body.email;

            user.save((err, user) => {
                if (err) res.status(500).send({ message: 'Cannot create a user' });
                res.send(user);
            });
        });
    });
};

exports.delete = (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        User.remove({ _id: req.params.userId }, (err, user) => {
            if (err) res.status(500).send({ message: 'Cannot delete this user' });
            res.send({ message: 'User deleted' });
        })
    });
};
