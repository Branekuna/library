'use strict';

const createGuts = require('../../utils/SQLDefaultModel');

const name = 'Book';
const tableName = 'book';

const selectableProps = [
  'id',
  'title',
  'description',
  'price',
  'imgUrl',
  'created_at',
  'updated_at',
];

const multiJoinProps = [
  'book.id',
  'book.title',
  'book.description',
  'book.price',
  'book.imgUrl',
  'book.created_at',
  'book.updated_at',
  'author.id',
  'author.fname',
  'author.lname',
  'author.fullname',
  'author.imgUrl',
  'author.biography',
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
    return knex
      .select(multiJoinProps)
      .from(tableName)
      .where({ 'book.id': id })
      .leftJoin('author_book as ab', { 'book.id': 'ab.book_id' })
      .leftJoin('author', { 'author.id': 'ab.author_id' })
      .options({ nestTables: true })
      .then((res) => {
        if (!res.length) {
          return res;
        }
        const book = { ...res[0].book, authors: [] };
        for (let i of res) {
          book.authors.push(i.author);
        }
        return book;
      });
  };

  return {
    ...guts,
    findById,
  };
};
