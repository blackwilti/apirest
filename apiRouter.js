//appel des modules
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');



//router
exports.router = (() => {
    const apiRouter = express.Router();

    //assignation par rapport à la route
    apiRouter.route('/users/addusers/').post(usersCtrl.addusers);
    apiRouter.route('/users/delete/:id').delete(usersCtrl.deleteUserProfil);
    apiRouter.route('/users/update/:id').put(usersCtrl.putUserProfil);

    return apiRouter;

})();