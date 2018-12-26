// MongoDB - Object Data Modelling - Mongoose library
var mongoose = require("mongoose");
// User model
var User = require("../model/user.model");
// Json web token
var jwt = require('jsonwebtoken');
// Password encryption
var bcrypt = require("bcrypt");
// Rest API call - Email OTP
var request = require("request");
// Static secret key constant for Json Web Token generation
var secretKey = require('../constant')

// User login
exports.login = (req, res, next) => {
  console.log(req.body);
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        let invalidEmail = {
          message: "Invalid-mail"
        };
        res.send(invalidEmail);
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(401).json({
              error: err
            });
          }
          if (result) {
            const token = jwt.sign({
              userId: user[0]._id,
              userName: user[0].username,
              email: user[0].email,
              phone: user[0].phone,
              role: user[0].role,
              createdOn: user[0].createdOn
            }, secretKey.SECRET_KEY);
            let successResult = {
              message: "success",
              token: token,
              role: user[0].role,
              email: user[0].email,
              phone: user[0].phone,
              userId: user[0]._id,
              userName: user[0].username
            };
            res.send(successResult);
          } else {
            let invalidPassword = {
              message: "Invalid-password"
            };
            res.send(invalidPassword);
          }
        });
      }
    })
    .catch(err => {
      console.log('MongoError - ', err);
      res.status(500).json({
        error: err
      });
    });
};

// User registration
exports.registration = (req, res, next) => {
  console.log(req.body);
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        let emailResult = {
          message: 'Mail already exist'
        }
        res.send(emailResult);
      } else {

        if (req.body.password === undefined) {
          var user = new User({
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role
          });

          user
            .save()
            .then(result => {
              res.status(201).json({
                message: "success",
                result: result
              });
            })
            .catch(err => {
              console.log('MongoError - ', err);
              res.status(500).json({
                error: err.errmsg
              });
            });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({
                error: err
              });
            } else {
              var user = new User({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                role: req.body.role
              });

              user
                .save()
                .then(result => {
                  res.status(201).json({
                    message: "success",
                    result: result
                  });
                })
                .catch(err => {
                  console.log('MongoError - ', err);
                  res.status(500).json({
                    error: err.errmsg
                  });
                });
            }
          });
        }

      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// Registration verify email
exports.registrationVerifyEmail = (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        var form = {
          email: req.body.email
        };
        request.post({
            url: "http://172.16.144.166:3001/sendOTP",
            json: form
          },
          function (err, httpResponse, body) {
            if (err) throw err;
            if (body) {
              res.send(body);
            }
          }
        );
      } else {
        let emailResult = {
          message: "Email-exist"
        }
        res.send(emailResult);
        // res.status(401).json({
        //   message: "Email already exist"
        // });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// change password - verify email
exports.changePasswordVerifyEmail = (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        let emailResult = {
          message: "Invalid-mail"
        }
        res.send(emailResult);
      } else if (user[0].email === req.body.email) {
        var form = {
          email: req.body.email
        };
        request.post({
            url: "http://172.16.144.166:3001/sendOTP",
            json: form
          },
          function (err, httpResponse, body) {
            if (err) throw err;
            if (body) {
              res.send(body);
            }
          }
        );
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// change password
exports.changePassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, encryptedPassword) => {
    if (err) {
      res.status(500).json({
        error: err
      });
    }
    if (encryptedPassword) {
      User.findOneAndUpdate({
          email: req.body.email
        }, {
          $set: {
            password: encryptedPassword
          }
        },
        (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Invalid data"
            });
          }
          if (result) {
            res.status(200).json({
              message: "success"
            });
          } else {
            res.status(200).json({
              message: "failure"
            });
          }
        }
      );
    }
  });
};


// Change User Details
exports.changeUserDetails = (req, res) => {
  console.log(req.body);

  User.findByIdAndUpdate({
      _id: req.body._id
    }, {
      $set: {
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        role: req.body.role
      }
    })
    .exec()
    .then(user => {
        res.send({
          message: 'success',
          result: user
        })
      }

    ).catch(err => {
      res.status(500).send({
        error: err
      })
    })
};


exports.deleteUserDetail = (req, res) => {
  User.findByIdAndDelete({
      _id: req.body._id
    }).exec()
    .then(user => {
      res.send({
        message: 'success'
      })
    }).catch(err => {
      res.status(500).send({
        error: err
      })
    });
}




// Super Admin Functionality - Get admin details for CRUD operation
exports.getAdminDetails = (req, res) => {

  User.find({
      role: 'admin'
    }).exec()
    .then(user => {
      if (user.length >= 1) {
        var adminResult = new Array();
        for (let admin of user) {
          adminResult.push({
            _id: admin._id,
            username: admin.username,
            phone: admin.phone,
            email: admin.email
          })
        }
        res.send({
          message: 'success',
          result: adminResult
        });
      } else {
        res.send({
          message: 'user not found'
        });
      }
    }).catch(err => {
      res.status(500).send({
        error: err
      });
    })
};


exports.customerCount = (req, res) => {
  User.aggregate([
              {
                $project: {
                    adminCount: {
                      $add: {
                        $cond: { if: { $eq: ['$role', 'admin'] }  , then: 1, else: 0 }
                      }
                    }, userCount: {
                      $add: {
                        $cond: { if: { $eq: ['$role', 'user'] }  , then: 1, else: 0 }
                      }  
                    }
                }
            },
            {
              $group: {
                _id: 0,
                adminCount: {
                    $sum: '$adminCount'
                },
                userCount: {
                    $sum: "$userCount"
                }
            }
          }],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({
          error: err
        })
      } else {
        res.send(result);
      }
    });
};







exports.captchaVerification = (req, res) => {

  // var url = `https://www.google.com/recaptcha/api/siteverify?secret=6Le-7n4UAAAAAPW38bsu9V7hWbnx44J7WBiQ6gn4&response=03ADlfD1_3NLIyNijhxOhYkksPLpufaGrO7mi4AebdQthd4OeIOPqAVIsDHO0QYoYsGKSQ8CYm1jXe1kmRgq_dPW7_JC9LO6J9_AL9SL-osxBNOkZeP9S9rILcSA681jZsTEMvDGTSORrGGm7zFjQIJzArI0vl0Ff1Ry0fWC7HOes7ldlaSkv-9rAD0FJz2uTaxU8KpIitD9z_DtSbDdoJSXP2vzFr4gP25uko_FBz0j7JZwAf8b9feyWCc-qxZF43tO3SncdvJRaumfcUPxnePVf_Dh6yH0vgAQ`;

  formData = {
    secret: '6Le-7n4UAAAAAPW38bsu9V7hWbnx44J7WBiQ6gn4',
    response: '03ADlfD1_3NLIyNijhxOhYkksPLpufaGrO7mi4AebdQthd4OeIOPqAVIsDHO0QYoYsGKSQ8CYm1jXe1kmRgq_dPW7_JC9LO6J9_AL9SL-osxBNOkZeP9S9rILcSA681jZsTEMvDGTSORrGGm7zFjQIJzArI0vl0Ff1Ry0fWC7HOes7ldlaSkv-9rAD0FJz2uTaxU8KpIitD9z_DtSbDdoJSXP2vzFr4gP25uko_FBz0j7JZwAf8b9feyWCc-qxZF43tO3SncdvJRaumfcUPxnePVf_Dh6yH0vgAQ'
  }

  formData = {
    secret: 'xxxxxx',
    response: 'yyyyyy'
  }

  request.post({
      url: "https://www.google.com/recaptcha/api/siteverify",
      form: formData,
      proxy: '216.239.32.0'
    },
    function (err, httpResponse, body) {
      if (err) throw err;
      if (body) {
        res.send(body);
      }
    });


};