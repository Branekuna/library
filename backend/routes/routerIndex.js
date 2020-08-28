const express = require('express');
const router = express.Router();

const kittens = require('./kitten');
const authors = require('./author/index');
const books = require('./book/index');
const user = require('./user/index');
const cart = require('./cart/cart'); //two routes, no need for index.js
const order = require('./order/order'); //four routes, no need for index.js

router.use('/kittens', kittens);
//get users, create user (createCart() too), update, delete (deleteCart())
router.use('/users', user);
router.use('/cart', cart); //get cart, update cart,
router.use('/orders', order); //get orders, get order, create order, delete order
router.use('/authors', authors);
router.use('/books', books);

module.exports = router;
