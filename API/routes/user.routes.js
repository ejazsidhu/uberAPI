const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength(3,'First name must be 3 character long.'),
    body('password').isLength(6, "Password must be 6 charaters long.")
],
userController.registerUser
);
module.exports = router;