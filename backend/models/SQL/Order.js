'use strict';

const createGuts = require('../../utils/SQLDefaultModel');

const name = 'Order';
const tableName = 'order';

const selectableProps = [
  'id',
  'order_total_price',
  'ordered_by_userId',
  'order_content',
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
