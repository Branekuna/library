'use strict';

const createGuts = require('../../utils/SQLDefaultModel');

const name = 'User';
const tableName = 'user';

const selectableProps = [
  'id',
  'fname',
  'lname',
  'email',
  'address',
  'country',
  'city',
  'password',
  'isAgent',
  'created_at',
  'updated_at',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  return {
    ...guts,
  };
};
