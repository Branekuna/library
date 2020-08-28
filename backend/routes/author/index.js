const express = require('express');
const router = express.Router();
const { Author } = require('../../models/SQL');

// get all authors
router.get('/', async (req, res, next) => {
  console.log(`get ALL AUTHORS route`);
  const authorsList = await Author.findAll().catch((err) => {
    err.message = 'Fetching authors from SQL error failed';
    err.statusCode = 500;
    next(err);
  });
  res.send(authorsList);
});

router.param('id', (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new Error(`AuthorId: ${id} -> invalid or null`));
  } else {
    return next();
  }
});

router.post('/create', async (req, res) => {
  const { fname, lname } = req.body;
  if (!fname || !lname) {
    const err = {};
    err.message = `Creating author requires in .body: fname ${fname} AND lname: ${lname}`;
    err.statusCode = 404;
    next(err);
  }

  let data = {
    fname,
    lname,
  };
  let result = null;
  try {
    result = await Author.create(data);
  } catch (err) {
    console.log(`Error creating(POST) author: ${err}`);
    throw Error(`Error creating(POST) author: ${err}`);
  }
  console.log(`Successfully created ${result}`);
  res.send(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let author = null;
  try {
    author = await Author.findById(id);
  } catch (err) {
    throw Error(`Error GETting Author with ID: ${id}, gives error: ${err}`);
  }
  console.log('author ', author);
  res.send(author);
});

router.patch('/:id', async (req, res) => {
  const { params, body } = req;
  let result = null;
  try {
    result = await Author.update(params.id, body);
  } catch (err) {
    console.log(
      `Error PATCHing Author with ID: ${params.id}, gives error: ${err}`
    );
    throw Error(
      `Error PATCHing Author with ID: ${params.id}, gives error: ${err}`
    );
  }
  console.log('result :', result);
  res.send(`response bla bla`);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) throw Error(`Error deleting author: ID -> ${id}`);
  let result = null;
  try {
    result = await Author.destroy(id);
  } catch (err) {
    console.log(`Error DELETEing Author with ID: ${id}, gives error: ${err}`);
    throw Error(`Error DELETEing Author with ID: ${id}, gives error: ${err}`);
  }
  console.log(`delete author: ${result}`);
  res.send('result bla bla');
});

module.exports = router;
