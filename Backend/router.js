const express = require('express');
const router = express.Router();

const user = require('./controllers/userController');

router.post('/Users/Post/Cadastro', user.createUser);
router.post('/Users/Post/Login', user.loginUser);

router.get('/Users/GetUser/:Id', user.getUser);
router.get('/Users/GetAll', user.getAllUsers);


module.exports = router;