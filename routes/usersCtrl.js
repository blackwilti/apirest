
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
//import des models dans la db
const models = require('../models');
const asyncLib = require('async');
/*const modeluser = require('../models/modeluser');*/

//verification email avec regex
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

//exporter toute nos routes
module.exports = {
    addusers: (req, res) => {
        //params
        let lastName = req.body.lastName;
        let firstName = req.body.firstName;
        let email = req.body.email;
        let password = req.body.password;
        let role = req.body.role

        //verification element manquant
        if (lastName == null || firstName == null || email == null || password == null || role == null) {
            return res.status(400).json({ 'error': 'il manque des elements' }),
            console.log('----------', lastname, firstname, email, password, role);
        }
        //verification de la longueur du nom de l'utilisateur
        if (password.length > 13 || password.length <= 4) {

            return res.status(400).json({ 'error': 'password trop court' });
        }
        //verifier si l'email est invalide
        if (!EMAIL_REGEX.test(email)) { }
        //verification si le password est invalide
        if (!PASSWORD_REGEX.test(password)) {

            return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and includ 1 number blablabla' });
        }
/*------------------------vérification------------------------*/
    asyncLib.waterfall([
        (done) => {
            models.modeluser.findOne({
                attributes: ['email'],
                where: { email: email },
            })
            .then((userFound) => {
                done(null, userFound);
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'unable to verify'});
            });
        },
        (userFound, done) => {
            if (!userFound) {
                bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                    done(null, userFound, bcryptedPassword);
                })
            } else {
                return res.status(409).json({ 'error': 'peut pas etre verifier'});
            }
        },  
/*------------------creation-------------------*/
        (_userFound, bcryptedPassword, done) => {
            let newUser = models.modeluser.create({  
                lastname : lastName ,
                firstname: firstName ,
                email: email,
                password: password,
                role: role,
            })
            .then((newUser) => {
                done(newUser);
              
            })
            .catch((err) => {
                console.log(err, 'icccciiciiciiiii');
                return res.status(500).json({'error': 'ajout impossible'});
            });

        }
    ], (newUser) => {
        if (newUser) {
            return res.status(201).json({
                'userId': newUser.id,
                'token': jwtUtils.generateTokenForUser(userFound)
            });
        } else {
            console.log(err, 'laaaaaaaaaaaaaa');
            return res.status(500).json({ 'error': 'peu pas ajouter utilisateur'})
        }
    });
},

//-----------permet de vérifier si la fonction fonctionne------------
/*exports.addusers (req, res) => {
    console.log('hello');
};*/
//--------------fin de verif fonction-----------------------

deleteUserProfil:(req, res) => {

    asyncLib.waterfall([
        (done) => {
            models.modeluser.destroy({
                where: {id: req.params.id}
            })
            .then((userFound) => {
                done(userFound)
            })
            .catch((err) => {
                return res.status(400).json({ 'error': "il y'a une erreur la"})
            });
        }],
        (userFound) => {
            if (userFound) {
                return res.status(409).json({'error': "user supprimer"})
            } else {
                return res.status(404).json({'error': "je trouve pas l'utilisateur"})
            }
        })
},

/*putUserProfil:(req, res) => {

       asyncLib.waterfall([
           (done) => {
               models.modeluser.destroy({
                   where: {id: req.params.id}
               })
               .then((userFound) => {
                   done(userFound)
               })
               .catch((err) => {
                   return res.status(400).json({ 'error': "il y'a une erreur la"})
               });
           }],
           (userFound) => {
               if (userFound) {
                   return res.status(409).json({'error': "user supprimer"})
               } else {
                   return res.status(404).json({'error': "je trouve pas l'utilisateur"})
               }
           })
   }*/
};