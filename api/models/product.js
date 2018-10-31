const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
   //  _id: { type: mongoose.SchemaTypes.ObjectId, required: true},
    name: {type:String,required:true,unique: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);