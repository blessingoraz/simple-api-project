const User = require('../models/user');

exports.create = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) res.status(500).send({message: 'Cannot create a user'});
        res.status(201);
        res.send(user);
    });
}

exports.login = (req, res) => {

    User.findOne({email: req.body.email}, (err, user) => {
        if (err) res.status(500).send({message: `Cannot find user with email: ${req.body.email}`});
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err || isMatch === false) res.status(500).send({message: `You cannot login`});
            res.send(user);
        });
    });
};

exports.findAll = (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).json({message: 'Cannot retrieve users'});
        res.json(users);
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId).populate('notes').exec((err, user) => {
        if (err) res.status(500).send({message: 'Cannot retrieve user'});
        res.send(user);
    });
};

exports.update = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) res.status(500).send({message: 'Cannot retrieve user'});
        user.username = req.body.username;
        user.email = req.body.email;

        user.save((err, user) => {
            if (err) res.status(500).send({message: 'Cannot create a user'});
            res.send(user);
        });
    });
};

exports.delete = (req, res) => {
    User.remove({_id: req.params.userId}, (err, user) => {
        if (err) res.status(500).send({message: 'Cannot delete this user'});
        res.send({message: 'User deleted'});
    })
};
