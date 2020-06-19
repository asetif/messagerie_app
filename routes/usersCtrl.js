var bcrypt   = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models   = require('../models');

//routes
module.exports = {
    register: function (req, res)  {
        // params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        

        if (email == null || username == null || password == null ) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        /*if (!EMAIL_REGEX.test(login)){
            return res.status(400).json({ 'error' : 'email is not valid'});
        }*/

        models.User.findOne({
            attributes: ['email'],
            where: {email : email}
        })
            .then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        models.User.create({
                            email : email,
                            username : username,
                            password : bcryptedPassword,
                        })
                            .then(function (newUser) {
                                return res.status(201).json({
                                    'userId': newUser.id
                                })
                            })
                            .catch(function (err) {
                                console.log(err)
                            return res.status(500).json({ 'error': 'cannot add user' });
                            });
                    });
                } else {
                    return res.status(409).json({ 'error': 'user already exist' });
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' })
            });
    },

    login: function(req, res){

        var email = req.body.email;
        var password = req.body.password;
     
        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.User.findOne({
            where: { email: email}
        })
            .then(function (userFound) {
                if (userFound) {

                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        if (resBycrypt) {
                            return res.status(200).json({
                                'userId': userFound.id,
                                'token': jwtUtils.generateTokenForUser(userFound)
                            });
                        } else {
                            return res.status(403).json({ 'error': 'invalid password' });
                        }
                    });
                } else {
                    return res.status(404).json({ ' error': 'not exist in DB' });
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
        });
    },

    getUserprofile: function (req, res) {
        //getting auth header
        var headerAuth = req.headers['authorization'];
            if (!headerAuth)
                res.status(404).json({ 'error': ' token not found' })
      
        var userId = jwtUtils.getUserId(headerAuth.split(" ")[1]);
            if (userId < 0)
                return res.status(400).json({ 'error': 'wrong token' });

        models.User.findOne({
            attributes: ['id', 'email', 'username'],
                where: { id: userId }
        })
        
        .then(function (user) {
            if (user) {
                return res.status(201).json(user);
            }else {
                return res.status(404).json({ 'error': 'user not found' });
            }
        })
        
        .catch(function (err) {
                return res.status(500).json({ 'erro': 'cannot fetch user' });
        });
    },
}
