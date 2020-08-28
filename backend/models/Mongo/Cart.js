const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user_id: {
    type: String,
    require: true,
  },
  products: { type: Array, default: [] },
  totalProductPrice: { type: Number },
  updated_at: { type: Date, default: Date.now },
});

CartSchema.index({ user_id: 1 });

//this.find({}); > getAll
//this.create({prop: passedProp}) > create
//this.findByIdAndUpdate(cartId, newCart) > updateById
//this.findOneAndDelete({ user_id }) > deleteById

module.exports = Cart = mongoose.model('cart', CartSchema);
