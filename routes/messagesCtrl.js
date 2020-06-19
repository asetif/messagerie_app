//import
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils')

//Route

module.exports = {
    postMessage: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId     = jwtUtils.getUserId(headerAuth)

        // params
        var title       = req.body.title;
        var content     = req.body.content;
        var attachement = req.body.attachement;
    
       
        if (title == null || content== null || attachement== null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        asyncLib.waterfall([
            function(done){
                models.User.findOne({
                  where : {id : userId} 
                })
                .then(function(userFound){
                    done(null, userFound);
                })
                .catch(function(err){
                    console.log (err)
                    return res.status(500).json({ 'erro' : 'unable to ferify user'});
                });
            },
            function(userFound, done){
                console.log(userFound)
                if(userFound){
                    models.Message.create({
                        UserId : userFound.id,
                        title : title,
                        content : content,
                        attachement : attachement,
                        likes : 1
                    })
                    .then(function(newMessage){
                        done(newMessage);
                    });
                }else{
                    res.status(400).json({ 'erro' : 'user not found'});
                }
            }
        ], function(newMessage){
            if (newMessage){
                console.log('eeeee')
                return res.status(201).json(newMessage);
            }else{
                return res.status(500).json({ 'erro' : 'cannot post message'});
            }
        });
    }, 
    
    listMessage : function(req, res){
        var fields = req.query.fields;
        var limit  = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order  = req.query.order;

        models.Message.findAll({
            order : [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes : (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit : (!isNaN(limit)) ? limit : null,
            offset : (!isNaN(offset)) ? offset : null,
            include : [{
                model : models.User,
                attributes : ['username']
            }]
        }).then(function(messages){
            if (messages){
                res.status(200).json(messages);
            }else{
                res.status(404).jdon({ 'error' : 'no messages found'})
            }
        }).catch(function(err){
            res.status(500).json({ 'erro' : 'invalid fields'})
        });
    }
}