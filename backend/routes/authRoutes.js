const { registerUser, loginUser, getAllUsers } = require('../controllers/tarefas.js');
const express = require('express');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/users').get(getAllUsers);

module.exports = router;