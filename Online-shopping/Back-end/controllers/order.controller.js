var Order = require('../model/order.model');
var Product = require('../model/product.model');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var moment = require('moment');

// To get cart details from database
exports.cartDetails = (req, res, next) => {
    if (req.body.email !== undefined) {
        Order.find({
            email: req.body.email
        }).then(orders => {
            if (orders.length >= 1) {
                var totalProduct = [];
                orders.forEach(order => {
                    if (order.cart === true) {
                        totalProduct.push(Product.findOne({
                            productName: order.productName
                        }).select('productName productPrice imageLocation productDiscount offer'));
                    }
                });
                return Promise.all(totalProduct);
            } else {
                res.send({
                    message: 'Not available'
                })
            }
        }).then(listOfOrder => {
            res.send(listOfOrder);
        }).catch(err => {
            res.status(500).send('Email ID not found', err);
        });
    } else {
        res.send('Email required');
    }

}

// To add product into the user's cart
exports.addToCart = (req, res, next) => {

    Order.findOne({
            email: req.body.email,
            productName: req.body.productName
        })
        .exec()
        .then(order => {
            if (order === null) {
                var order = new Order({
                    productName: req.body.productName,
                    email: req.body.email,
                    phone: req.body.phone,
                    cart: true,
                    purchased: false,
                    delivered: false,
                    shipped: false,
                    undelivered: false,
                    deliveryAddress: Object
                });

                order
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "success",
                            result: result
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            } else if (order.cart === false) {
                Order.findOneAndUpdate({
                        email: req.body.email,
                        productName: req.body.productName
                    }, {
                        $set: {
                            cart: true
                        }
                    }).exec()
                    .then(o => {
                        res.send({
                            message: 'success'
                        })
                    }).catch(err => {
                        res.status(500).send({
                            error: err
                        })
                    })
            } else {
                res.status(200).send({
                    message: 'Product-exist'
                })
            }
        }).catch(err => {
            res.status(500).send({
                error: err
            })
        })
}

// Remove an item from cart
exports.deleteFromCart = (req, res, next) => {
console.log(req.body.productName);
    Order.findOne({
            email: req.body.email,
            productName: req.body.productName
        })
        .exec()
        .then(order => {
            console.log(order);
            if (order !== null) {
                if (order.cart == true) {
                    Order.findOneAndUpdate({
                            productName: req.body.productName,
                            email: req.body.email
                        }, {
                            $set: {
                                cart: false
                            }
                        })
                        .exec()
                        .then(o => {
                            res.send({
                                message: 'success'
                            })
                        }).catch(err => {
                            res.status(500).send({
                                error: err
                            })
                        })
                } else {
                    res.status(200).send({
                        message: 'Not exist'
                    })
                }

            } else {
                res.status(200).send({
                    message: 'product does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                error: err
            });
        })
}


// To order item from user module
exports.addToPurchase = (req, res, next) => {
    Order.findOne({
            email: req.body.email,
            productName: req.body.productName
        })
        .exec()
        .then(order => {
            if (order === null) {
                var order = new Order({
                    productName: req.body.productName,
                    email: req.body.email,
                    phone: req.body.phone,
                    cart: false,
                    purchased: true,
                    delivered: false,
                    shipped: false,
                    undelivered: false,
                    deliveryAddress: req.body.deliveryAddress
                });

                order
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "success",
                            result: result
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            } else if (order.purchased === false) {
                Order.findOneAndUpdate({
                        email: req.body.email,
                        productName: req.body.productName
                    }, {
                        $set: {
                            cart: false,
                            purchased: true,
                            delivered: false,
                            shipped: false,
                            undelivered: false,
                            deliveryAddress: req.body.deliveryAddress
                        }
                    }).exec()
                    .then(o => {
                        res.send({
                            message: 'success'
                        })
                    }).catch(err => {
                        res.status(501).send({
                            error: err
                        })
                    })
            } else {
                res.status(200).send({
                    message: 'exist'
                })
            }
        }).catch(err => {
            res.status(500).send({
                error: err
            })
        })
}

// To delete or cancel ordered item 
exports.deleteFromPurchase = (req, res, next) => {

    Order.findOne({
            email: req.body.email,
            productName: req.body.productName
        })
        .exec()
        .then(order => {
            if (order !== null) {
                if (order.purchased == true) {
                    Order.findOneAndUpdate({
                            productName: req.body.productName
                        }, {
                            $set: {
                                purchased: false,
                                cart: false
                            }
                        })
                        .exec()
                        .then(o => {
                            res.send({
                                message: 'success'
                            })
                        }).catch(err => {
                            res.status(500).send({
                                error: err
                            })
                        })
                } else {
                    res.status(200).send({
                        message: 'product is not in purchased'
                    })
                }

            } else {
                res.status(200).send({
                    message: 'product does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                error: err
            });
        })
}


// Admin dashboard cart
exports.superAdminDashboardOrderCount = (req, res) => {
    if (req.body !== undefined) {
        var todayDate = moment().format('L');
        var currentMonth = todayDate.split("/")[0];
        var currentMonthYear = todayDate.split("/")[2];
        var currentMonthDay = todayDate.split("/")[1];
        var lastMonthDate = moment().subtract(30, 'days').calendar();
        var lastMonth = lastMonthDate.split("/")[0];
        var lastMonthYear = lastMonthDate.split("/")[2];
        var lastMonthDay = lastMonthDate.split("/")[1];

        Order.aggregate([
            // {
            //     $match: {
            //         updatedOn: {
            //             $lte: new Date(currentMonthYear, currentMonth, currentMonthDay),
            //             $gte: new Date(lastMonthYear, lastMonth, lastMonthDay)
            //         }
            //     }
            // },
             {
                $sort: {
                    updatedOn: 1
                }
            }, {
                $project: {
                    _id: 0,
                    item: 1,
                    deliveredCount: {
                        $cond: ["$delivered", 1, 0]
                    },
                    purchasedCount: {
                        $cond: ["$purchased", 1, 0]
                    },
                    undeliveredCount: {
                        $cond: ["$undelivered", 1, 0]
                    },
                    shippedCount: {
                        $cond: ["$shipped", 1, 0]
                    },
                    cartCount: {
                        $cond: ["$cart", 1, 0]
                    }
                }
            },
            {
                $group: {
                    _id: "$item",
                    deliveredCount: {
                        $sum: "$deliveredCount"
                    },
                    cartCount: {
                        $sum: "$cartCount"
                    }, shippedCount: {
                        $sum: "$shippedCount"
                    },
                    purchasedCount: {
                        $sum: '$purchasedCount'
                    },
                    undeliveredCount: {
                        $sum: "$undeliveredCount"
                    }
                }
            }, {
                $project: {
                    _id: 0
                }
            }       
        ], function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    error: err
                })
            } else {
                // console.log(result);
                res.json(result);
            }
        });
    }
}



// Admin dashboard chart
exports.superAdminDashboardOrderSummary = (req, res) => {
    Order.aggregate([{
                $match: {
                    updatedOn: {
                        $lte: new Date(2018, 12, 14),
                        $gte: new Date(2018, 00, 01)
                    }
                }
            },
          
            {
                $project: {
                    _id: 0,
                    item: 1,
                    month: {
                        $month: "$updatedOn"
                    },
                    purchasedCount: {
                        $add: {
                            $cond: ["$purchased", 1, 0]
                        }
                    },
                    deliveredCount: {
                        $add: {
                            $cond: ["$delivered", 1, 0]
                        }
                    },
                }
            },

            {
                $group: {
                    _id: "$month",
                    purchasedCount: {
                        $sum: '$purchasedCount'
                    },
                    deliveredCount: {
                        $sum: "$deliveredCount"
                    }
                }
            },
            {
                $project: {
                    _id:0,
                    month: '$_id',
                    purchasedCount: {
                        $sum: '$purchasedCount'
                    },
                    deliveredCount: {
                        $sum: "$deliveredCount"
                    }
                }
            },
            {
                $sort: {
                    month: 1
                }
            }

        ],
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
}

