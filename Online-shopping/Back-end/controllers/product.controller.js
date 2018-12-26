// var mongoose = require("mongoose");
var Product = require("../model/product.model");




// to get total products from DB
exports.getTotalProducts = (req, res) => {
    Product.find().exec()
        .then(result => {
            if (result.length >= 1) {
                res.status(200).send(result);
            } else {
                res.status(404).send(result);
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

//to get products by it's type(Eg-Mobile, Watches and etc,.)
exports.getProductByType = (req, res) => {
    Product.find({
            productType: req.body.productType
        })
        .exec()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

//to get an single product by it's productName
exports.getProduct = (req, res) => {
    // console.log(req.body);
    Product.findOne({
            productName: req.body.productName
        })
        .exec()
        .then(result => {
            if (result !== null) {
                var resultArray = new Array();
                resultArray.push(result);
                res.status(200).send(resultArray);
            } else {
                res.status(200).send({
                    message: 'Not-exist'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


//to get an single product by it's productName  --- Order
exports.getOrderProduct = (req, res) => {
    console.log('Name - ', req.body.productName);
    Product.findOne({
            productName: req.body.productName
        })
        .select('productName productPrice productDiscount imageLocation')
        .exec()
        .then(result => {
            if (result !== null) {
                var resultArray = new Array();
                resultArray.push(result);
                res.status(200).send(resultArray);
            } else {
                res.status(200).send({
                    message: 'Not-exist'
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

// Admin functionality - Product registration
exports.productRegistration = (req, res, next) => {
    var productObject = JSON.parse(req.body.product);
    var specification = JSON.parse(req.body.specification);
    var offer = JSON.parse(req.body.offer);
    var image = {
        normal: 'http://172.16.144.166:3000/product-images/' + req.files[0].filename,
        list: 'http://172.16.144.166:3000/product-images/' + req.files[1].filename,
        left: 'http://172.16.144.166:3000/product-images/' + req.files[2].filename,
        right: 'http://172.16.144.166:3000/product-images/' + req.files[3].filename,
        back: 'http://172.16.144.166:3000/product-images/' + req.files[4].filename,
        other: 'http://172.16.144.166:3000/product-images/' + req.files[5].filename
    };

    Product.find({
            productName: productObject.productName
        })
        .exec()
        .then(result => {
            if (result.length >= 1) {
                res.status(200).json({
                    message: 'product-exist'
                });
            } else {
                var product = new Product({
                    productName: productObject.productName,
                    productType: productObject.productType,
                    productPrice: productObject.productPrice,
                    offer: offer,
                    stock: productObject.stock,
                    productBrand: productObject.productBrand,
                    imageLocation: image,
                    specification: specification,
                    description: productObject.description,
                    productColor: productObject.productColor,
                    productDiscount: productObject.productDiscount,
                    admin: req.body.admin
                });

                product.save()
                    .then(result => {
                        if (result) {
                            res.status(201).json({
                                message: 'success',
                                result: result
                            })
                        } else {
                            res.status(404).json({
                                message: 'failure',
                                result: ''
                            })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })

            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

};

// Admin functionality - Product deletion
exports.deleteProduct = (req, res) => {
    Product.findOneAndDelete({
            productName: req.body.productName,
            admin: req.body.admin
        })
        .exec()
        .then(result => {
            if (result !== null) {
                res.status(200).json({
                    message: 'success'
                })
            } else {
                res.status(404).json({
                    message: 'failure'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

// Admin functionality - Product update
exports.updateProduct = (req, res) => {

    // var productObject = JSON.parse(req.body.product);
    // var productSpecification = JSON.parse(req.body.specification);
    // var productOffer = JSON.parse(req.body.offer);
    var productObject = req.body.product;
    var productSpecification = req.body.specification;
    var productOffer = req.body.offer;

    console.log('Product  = ', productObject);
    console.log('Specification = ', productSpecification);
    console.log('Offer = ', productOffer)

    Product.findOneAndUpdate({
            productName: productObject.productName,
            admin: req.body.admin
        }, {
            $set: {
                productDiscount: productObject.productDiscount,
                productColor: productObject.productColor,
                productBrand: productObject.productBrand,
                description: productObject.description,
                productPrice: productObject.productPrice,
                specification: productSpecification,
                offer: productOffer,
                stock: productObject.stock
            }
        })
        .exec()
        .then(result => {
            if (result !== null) {
                res.status(200).json({
                    message: 'success'
                });
            } else {
                res.status(304).json({
                    message: 'failure'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

// Admin functionality - Get total admin product
exports.getTotalAdminProduct = (req, res) => {
    Product.find({
            admin: req.body.admin
        }).exec()
        .then(product => {
            if (product.length >= 1) {
                res.status(200).send({
                    message: 'success',
                    result: product
                })
            } else {
                res.status(200).send({
                    message: 'failure',
                    result: ''
                })
            }
        }).catch(
            err => {
                if (err) {
                    res.status(200).send({
                        error: err
                    })
                }
            }
        );
}

// Admin functionality - Get One Product for update 
exports.getAdminProduct = (req, res) => {
    Product.findOne({
        admin: req.body.admin,
        productName: req.body.productName
    }).then(product => {
        if (product !== null) {
            res.status(200).send({
                message: 'success',
                result: product
            })
        } else {
            res.status(200).send({
                message: 'failure',
                result: ''
            })
        }
    }).catch(
        err => {
            if (err) {
                res.status(200).send({
                    error: err
                })
            }
        }
    );
}

