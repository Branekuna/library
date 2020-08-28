const Kitten = require('../models/kittens');
//const KittenSQL = require('../models/sqlKittens');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  let kittenList = null;
  try {
    kittenList = await Kitten.getAll();
  } catch (err) {
    console.error(`Error occured while getting kittens! --> ${err.message}`);
    return err;
  }
  let kittenSQL = null;
  try {
    //
  } catch (err) {
    console.error(`Error occured while getting SQL kittens! --> ${err}`);
  }
  //console.log(`Kitten list from Mongo! : ${kittenList}`);
  //console.log(`Kitten list from SQL ! : ${kittenSQL.serialize()}`);
  res.send({ kittenList, kittenSQL });
});

router.post('/create/:name', async (req, res) => {
  let { name } = req.params;
  let kitten = null;
  try {
    //kitten = await KittenSQL.forge({ kitten_name: name }).save();
  } catch (err) {
    console.error(`Error occured while creating a kitten! --> ${err}`);
    return err;
  }
  console.log(`Kitten created with name: ${name}`);
  res.send(`Successfully created kitten named: ${name}`);
});

module.exports = router;
