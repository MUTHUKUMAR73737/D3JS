var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true
  },
  productType: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  productBrand: {
    type: String,
    required: true
  },
  productDiscount: {
    type: Number,
    required: true
  },
  productColor: {
    type: String,
    required: true
  },

  imageLocation: {
    type: Object,
    required: true
  },
  specification: {
    type: Object,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  offer: {
    type: Object,
    required: true,
    EMI: Number,
    debitCard: Number
  },
  admin: {
    type: String,
    required: true

  }
}, {
  collection: "products",
  versionKey: false
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;