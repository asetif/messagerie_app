var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var messagesCtrl = require('./routes/messagesCtrl');
//router
exports.router = (function(){
    var apiRouter = express.Router();

// Users routes
apiRouter.route('/users/create').post(usersCtrl.register);
apiRouter.route('/users/login').post(usersCtrl.login);
apiRouter.route('/users/read').get(usersCtrl.getUserprofile);

// message routes
apiRouter.route('/messages/new').post(messagesCtrl.postMessage);
apiRouter.route('/messages/list').get(messagesCtrl.listMessage)

return apiRouter;
})();