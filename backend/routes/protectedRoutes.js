const { registerUser, loginUser, protectedRoute } = require('../controllers/tarefas.js');
const User = require('../models/userAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware');

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/').get()

module.exports = router