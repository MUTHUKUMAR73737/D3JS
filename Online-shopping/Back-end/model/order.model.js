var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema  = new Schema({

    productName: {
        required: [true, "productName must be required"],
        type: String
    }, 
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
              v
            );
          },
          message: props => `${props.value} is not a valid email ID!`
        },
        required: [true, "User email ID required"]
      },
      phone: {
        type: Number,
        required: [true, "User phone number required"]
      },
      cart: {
        type: Boolean
      },
      delivered: {
        type: Boolean
      },
      purchased: {
        type: Boolean
      },
      shipped: {
        type: Boolean
      },
      undelivered: {
        type: Boolean
      },
      updatedOn: {
        type: Date,
        default: Date.now
      },
      deliveryAddress: {
        type: Object,
        required: true
      }
},{
  collection: "order", versionKey: false
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;