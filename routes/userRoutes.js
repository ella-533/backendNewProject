const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require('../controllers/userControllers')
const { login, protect, restrict, correctUser, restrictToOwnUser } = require('../controllers/authControllers')
const { Book } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, correctUser, updateUser)
    .delete(protect, restrictToOwnUser(Book), deleteUser)

module.exports = router