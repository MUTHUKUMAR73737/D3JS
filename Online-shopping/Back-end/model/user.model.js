var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "User name is required"],
      validate: {
        validator: function(v) {
          return /[A-Z]{1}[a-z]*/.test(v);
        },
        message: props => `${props.value} is not a valid username!`
      }
    },
    email: {
      type: String,
      unique: true,
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
    password: {
      type: String,
      required: [true, "User Password is required"]
    },
    role: {
      type: String,
      required: [true, "User role is required"]
    },
    createdOn: {
      type: Date,
      default: Date.now
    },
    phone: {
      type: Number,
      required: [true, "User phone number required"]
    }
  },
  {
    collection: "customers", versionKey: false
  }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
