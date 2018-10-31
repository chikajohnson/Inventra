const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
   //  _id: { type: mongoose.SchemaTypes.ObjectId, required: true},
    product: {type: mongoose.SchemaTypes.ObjectId, ref: 'Product'},
    quantity: {type: Number, default: 1, }
});

module.exports = mongoose.model('Order', orderSchema);