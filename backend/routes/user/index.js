const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cart = require('../../models/Mongo/Cart');
const { User } = require('../../models/SQL');
const { secretSaltGen } = require('../../config');

// get all users
router.get('/', async (req, res) => {
  console.log(`get ALL USERS route`);
  const usersList = await User.findAll().catch((err) => {
    throw Error(`Fetching users from SQL error: ${err}`);
  });

  res.send(usersList);
});

router.param('id', (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new Error(`BookId: ${id} -> invalid or null`);
  } else {
    return next();
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  let user = await User.findById(id).catch((err) => {
    throw new Error(`Couldn't SQL find user: ${id}, due to err: ${err}`);
  });
  console.log('user found ', user[0]);
  res.send(user[0]);
});

router.post('/create', async (req, res) => {
  console.log('KRIJEJT JUSER!');
  const { body } = req;
  if (
    !body.fname ||
    !body.lname ||
    !body.country ||
    !body.password ||
    !body.email ||
    !body.email.length
  ) {
    throw new Error(`Error creating user: one of parameters invalid`);
  }
  body.password = await bcrypt.hash(body.password, 12).catch((err) => {
    throw new Error(`Error encrypting password for new user`);
  });

  const newUserId = await User.create(body)
    .then((idArr) => idArr[0])
    .catch((err) => {
      throw new Error(`Error creating user: SQL.create throws: ${err}`);
    });

  const cartToSave = {
    user_id: newUserId,
  };
  let result = await Cart.create(cartToSave).catch((err) => {
    console.error(`Error creating cart`);
  });

  res.send(`success`);
});

router.patch('/:id', async (req, res) => {
  const { params, body } = req;
  let updatedUser = await User.update(params.id, body).catch((err) => {
    throw new Error(`Error PATCHing User with id: ${params.id}, err: ${err}`);
  });
  res.send(`success`);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting user: ${id}`);

  let userDeleted = await User.destroy(id).catch((err) => {
    throw new Error(`Error deleting user with id ${id}, gives err: ${err}`);
  });
  const user_id = id;
  let cleanUpUsersCart = await Cart.findOneAndDelete({ user_id }).catch(
    (err) => {
      throw new Error(`Error while deleting user's: ${user_id} cart`);
    }
  );

  res.send(`success`);
});

router.post('/login', async (req, res) => {
  console.log('IN LOGIN');
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error(`No email or password sent in body for login`);
  }
  const user = await User.findOne({ email }).catch((err) => {
    console.log(`Error fetching user by email during login from SQL`);
    throw new Error(`ERrror login`);
  });
  const passwordMatch = await bcrypt.compare(password, user.password);
  delete user.password;
  if (!passwordMatch) {
    throw new Error(`Password doesn't match`);
  }
  const token = jwt.sign(
    {
      email: user.email,
      userId: user.id,
    },
    secretSaltGen,
    { expiresIn: '1h' }
  );
  const response = {
    user,
    token,
  };

  res.json(response);
});

module.exports = router;
