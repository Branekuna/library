const express = require('express');
const router = express.Router();
const Cart = require('../../models/Mongo/Cart');

router.param('userId', (req, res, next) => {
  console.log('INSIDE PARAM');
  const { userId } = req.params;
  if (!userId) {
    throw new Error(`UserId: ${userId} -> invalid or null`);
  } else {
    return next();
  }
});

// get user's cart
router.get('/:userId', async (req, res) => {
  console.log(`get userId ${req.params.userId} cart`);
  const user_id = req.params.userId;
  let cart = await Cart.findOne({ user_id })
    .lean(true) //speeds up simple get queries
    .catch(() => {
      throw new Error(`Error fetching cart for user: ${userId}`);
    });
  res.send(cart);
});

// update user's cart
router.put('/:userId', async (req, res) => {
  const user_id = req.params.userId;
  const newCart = req.body;
  let cart = await Cart.findOneAndUpdate({ user_id: user_id }, newCart).catch(
    (err) => {
      throw new Error(`Error updating cart for userId: ${userId}`);
    }
  );
  res.send(cart);
});
module.exports = router;
