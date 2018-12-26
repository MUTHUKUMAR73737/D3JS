var jwt = require('jsonwebtoken');
var secretKey = require('../constant');
var User = require("../model/user.model");

// Super Admin Authentication
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
                        if(decoded.role === 'superadmin' && result.role === decoded.role && result.phone === decoded.phone) {
                            next();
                        } else {
                            res.send('SuperAdmin not found');
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