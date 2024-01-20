const express = require('express')
const router = express.Router()
const { findAllBooks, findBookByPk, createBook, updateBook, deleteBook} = require('../controllers/bookControllers')
const { protect, restrict } = require('../controllers/authControllers');

router
    .route('/')
    .get(findAllBooks)
    .post(protect, restrict("admin"), createBook)

router
    .route('/:id')
    .get(findBookByPk)
    .put(protect,restrict("admin"), updateBook)
    .delete(protect, restrict("admin"), deleteBook)
module.exports = router 