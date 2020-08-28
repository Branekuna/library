'use strict';

const createGuts = require('../../utils/SQLDefaultModel');

const name = 'Author_Book';
const tableName = 'author_book';

const selectableProps = ['author_id', 'book_id'];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const create = (arr_authorIds, bookId) => {
    let arrObjects = [];
    for (let author_id of arr_authorIds) {
      const tempObj = {
        author_id,
        book_id: bookId,
      };
      arrObjects.push(tempObj);
    }
    return knex.insert(arrObjects).into(tableName).timeout(guts.timeout);
  };

  const destroy = (author_id = null, book_id = null) => {
    let conditions = {};
    if (author_id) {
      conditions = { author_id };
    }
    if (book_id) {
      conditions = { ...conditions, book_id };
    }
    console.log(`conditions: ${JSON.stringify(conditions)}`);
    return knex.del().from(tableName).where(conditions).timeout(guts.timeout);
  };

  return {
    ...guts,
    destroy,
    create,
  };
};
