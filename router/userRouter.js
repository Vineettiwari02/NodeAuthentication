const express = require('express');
const router = express.Router();
const authController = require('../auth/controller/AuthController');
const authMiddleware = require('../auth/middleware/isAuth.js')

router.get('/', function (req, res) {
    res.send('Hello World i am on express now!');
  });
router.post('/register', authController.register);
router.post('/dashborad', authMiddleware.authJWT ,function(req, res){res.send("welcome to dashboard page")});
router.post('/login', authController.login);
router.get('/verify/:tokens', authController.tokenverify);
//router.post('/dashborad', authMiddleware.authJWT ,function(req, res){res.send("welcome to dashboard page")});
router.post('/dashborad',function(req, res){res.send("welcome to backend server")});
module.exports = router;