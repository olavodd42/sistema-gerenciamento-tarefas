const { registerUser, loginUser, getAllUsers, logoutUser } = require('../controllers/tarefas.js');
const express = require('express');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/users').get(getAllUsers);
router.route('/logout').get(logoutUser);

module.exports = router;