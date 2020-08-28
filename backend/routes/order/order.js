const express = require('express');
const router = express.Router();
const Cart = require('../../models/Mongo/Cart');
const { Order } = require('../../models/SQL');

router.get('/', async (req, res) => {
  console.log('get ALL orders');
  let allOrders = await Order.findAll().catch((err) => {
    throw new Error(`Error getting all orders ${err}`);
  });
  console.log('allOrders ', allOrders);
  res.send(allOrders);
});

router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  console.log('get ALL orders FOR USER ', user_id);
  let userOrders = await Order.find({ ordered_by_userId: user_id }).catch(
    (err) => {
      throw new Error(`Error getting orders for user: ${user_id}, err: ${err}`);
    }
  );
  res.send(userOrders);
});

router.post('/create', async (req, res) => {
  console.log('creater ORDER ');
  let { body } = req;
  if (
    !body.order_total_price ||
    !body.ordered_by_userId ||
    !body.ordered_by_userId.length ||
    !body.order_content
  ) {
    throw new Error(`Required fields for order not sent`);
  } else {
    //deal with JSON column by stringifying
    body.order_content = JSON.stringify(body.order_content);
  }

  let savedOrder = await Order.create(body).catch((err) => {
    throw new Error(
      `Saving customer order failed, for user with id: ${body.ordered_by_userId} err: ${err}`
    );
  });
  res.send(`success`);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error(`Id of Order not sent`);
  }
  let deleteOrder = await Order.destroy(id).catch((err) => {
    throw new Error(`Failed to delete order with id: ${id}, error: ${err}`);
  });
  res.send(`success`);
});

module.exports = router;
