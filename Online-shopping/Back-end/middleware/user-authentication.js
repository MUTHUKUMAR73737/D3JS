var jwt = require('jsonwebtoken');
var secretKey = require('../constant');
var User = require("../model/user.model");

// User Authentication
module.exports  = (req, res, next) => {
    try{  
        // request header authorization split token
        const token = req.get('authorization').split(' ')[1];
        // token verification
        const decoded = jwt.verify(token, secretKey.SECRET_KEY);
        // set payload in HTTP request 
        req.userData = decoded;
            User.findOne({email: decoded.email})
            .exec()
            .then(
                result => {
                     // Role authentication from Database and Authentication token
                        if(result.role === 'user' && result.role === decoded.role && result.phone === decoded.phone) {
                            console.log('!!!!!!!!!');
                            next();
                        } else {
                            res.send('User not found');
                        }
                }
            )
            .catch(
                err => {
                    res.status(500).json({
                        error: err
                    });
                }
            );

    } catch(error) {
        res.status(401).json({
            message: 'Authentication-failed'
        })
    }
};