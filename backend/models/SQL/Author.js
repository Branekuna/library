'use strict';

const createGuts = require('../../utils/SQLDefaultModel');

const name = 'Author';
const tableName = 'author';

const selectableProps = [
  'id',
  'fname',
  'lname',
  'fullname',
  'imgUrl',
  'created_at',
  'updated_at',
];

const multiJoinProps = [
  'author.id',
  'author.fname',
  'author.lname',
  'author.fullname',
  'author.imgUrl',
  'author.created_at',
  'author.updated_at',
  'author.biography',
  'book.id',
  'book.title',
  'book.price',
  'book.description',
  'book.imgUrl',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
    multiJoinProps,
  });

  const findById = (id) => {
    console.log('id ', id);
    console.log('typeof id ', typeof id);
    return knex
      .select(multiJoinProps)
      .from(tableName)
      .where({ 'author.id': id })
      .leftJoin('author_book as ab', { 'author.id': 'ab.author_id' })
      .leftJoin('book', { 'book.id': 'ab.book_id' })
      .options({ nestTables: true })
      .then((res) => {
        if (!res.length) {
          return res;
        }
        const author = { ...res[0].author, books: [] };
        for (let i of res) {
          author.books.push(i.book);
        }
        return author;
      });
  };

  //TODO: when destroying authors, clean up joining table with author_id and book_id,
  //      THEN call destroy

  return {
    ...guts,
    findById,
  };
};
