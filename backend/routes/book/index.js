const express = require('express');
const router = express.Router();
const { Book, Author, Author_Book } = require('../../models/SQL');

// get all books
router.get('/', async (req, res) => {
  console.log(`get ALL BOOKS route`);
  let booksList = null;
  try {
    booksList = await Book.findAll();
  } catch (err) {
    console.log(`Fetching authors from SQL error: ${err}`);
    throw Error(`Fetching authors from SQL error: ${err}`);
  }
  res.send(booksList);
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
  let result = null;
  try {
    result = await Book.findById(id);
  } catch (err) {
    throw Error(`Error GETting Book with ID: ${id}, gives error: ${err}`);
  }
  console.log(`Successfully fetched from Db: ${JSON.stringify(result)}`);
  res.send(result);
});

router.post('/create', async (req, res) => {
  const { title, description, price, authors } = req.body;
  if (!title || !description || !price) {
    throw Error(
      `Creating Book requires in .body: title ${!!title} AND description: ${!!description} AND price: ${!!price}`
    );
  }
  if (Number.isNaN(Number.parseFloat(price))) {
    throw Error(`Price sent is not a decimal number`);
  }
  if (!authors || !authors.length) {
    throw Error(`Book author/s not sent`);
  }
  let authorIdsForSaving = [];
  for (let author of authors) {
    const { fname, lname } = author;
    //find if author exists
    let foundAuthor = null;
    let createdAuthor = null;
    try {
      foundAuthor = await Author.find({ fname, lname });
    } catch (err) {
      console.log(`Error finding author: ${(fname, lname)}, causing: ${err}`);
      throw Error(`Error finding author: ${(fname, lname)}, causing: ${err}`);
    }
    if (foundAuthor && foundAuthor.length) {
      console.log('foundAuthor', foundAuthor[0].id);
      authorIdsForSaving.push(foundAuthor[0].id);
      continue;
    }
    //if !foundAuthor, create a new one
    if (!foundAuthor || !foundAuthor.length) {
      console.log('AUTHOR NOT FOUND ', fname, lname);
      try {
        createdAuthor = await Author.create({ fname, lname });
      } catch (err) {
        console.log(
          `Error creating missing author ${(fname, lname)}, causing: ${err}`
        );
        throw Error(
          `Error creating missing author ${(fname, lname)}, causing: ${err}`
        );
      }
      authorIdsForSaving.push(createdAuthor[0]);
    }
  }
  let bookData = {
    title,
    description,
    price,
  };
  let savedBook = null;
  console.log('authorIdsForSaving', authorIdsForSaving); //[ 11, 4 ] array of ids

  try {
    savedBook = await Book.create(bookData); //saving book into table
    await Author_Book.create(authorIdsForSaving, savedBook[0]); //joining table update
  } catch (err) {
    console.log(`Error creating(POST) book/updating joining table: ${err}`);
    throw Error(`Error creating(POST) book/updating joining table: ${err}`);
  }
  console.log(`Successfully created ${savedBook}`);
  res.send(savedBook);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { authors, title, description, price } = req.body;

  //find old authorIds
  console.log('authors', authors);
  let oldAuthors = [];
  let authorIdsToDiscard = [];
  try {
    oldAuthors = await Author_Book.find({ book_id: id });
    for (let author of oldAuthors) {
      authorIdsToDiscard.push(author.author_id);
    }
  } catch (err) {
    console.log(`Error PATCHing Book with ID: ${id}, gives error: ${err}`);
    throw Error(`Error PATCHing Book with ID: ${id}, gives error: ${err}`);
  }
  console.log('authorIdsToDiscard', authorIdsToDiscard);

  //check if author objects all have ids
  //if not, save that author, and get the new id returned
  //extend the object in question with the new authorId
  let authorsUpdated = [];
  for (let author of authors) {
    if (author.id) {
      //remove author_ids sent by client from the discard pile
      let index = authorIdsToDiscard.indexOf(author.id);
      authorIdsToDiscard.splice(index, 1);
      //add author to
      authorsUpdated.push(author);
    } else {
      console.log('IN ELSE fname ', author.fname);
      let tempId = null;
      try {
        tempId = await Author.create(author);
        await Author_Book.create(tempId, id); //joining table update
      } catch (err) {
        console.log(`Error creatig author in book PATCH ${err}`);
        throw Error(`Error creating author in book PATCH ${err}`);
      }
      author['id'] = tempId[0];
      authorsUpdated.push(author);
    }
  }
  console.log('authorIdsToDiscard', authorIdsToDiscard);
  console.log('newAuthors', authorsUpdated);
  //discard old author relations
  for (let removeId of authorIdsToDiscard) {
    await Author_Book.destroy(removeId).catch((err) => {
      console.log(`Error removing old author relations in book PATCH ${err}`);
    });
  }

  await Book.update(id, { title, description, price }).catch((err) => {
    console.log(`Error PATCHing Book with ID: ${id}, gives error: ${err}`);
  });
  res.send(`success`);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) throw Error(`Error deleting Book: ID -> ${id}`);
  let result = null;
  try {
    await Author_Book.destroy(null, id); //always delete the FK references first
    result = await Book.destroy(id);
  } catch (err) {
    console.log(`Error DELETEing Book with ID: ${id}, gives error: ${err}`);
    throw Error(`Error DELETEing Book with ID: ${id}, gives error: ${err}`);
  }
  console.log(`delete Book: ${result}`);
  res.send(`success`);
});

module.exports = router;
