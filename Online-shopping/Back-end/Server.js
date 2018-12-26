var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/E-shopping";
var express = require('express');
var app = express();
var bodyParser= require('body-parser'); 
var request = require("request");
var jsonWebToken = require("jsonwebtoken");

var morgan = require("morgan");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('content-type', 'application/json');
    next();
});

app.use(morgan('dev'));

app.get('/availableProducts', (req, res) => {
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shopping");
        dbo.collection("products").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});


app.post('/getProductComparison', (req, res) => {
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shopping");
        // myobj
        dbo.collection("products").find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
            db.close();
        });
    });
});



app.post('/customer/changePassword', bodyParser.json() , (req, res) => {
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shopping");
        // console.log(req.body.email, req.body.password);
        dbo.collection("customers").findOneAndUpdate({email: req.body.email}, {$set: {password: req.body.password}},function (err, result) {
            if (err) throw err;
            var successResult = {
                result: 'Success'
            }
            var failureResult = {
                result: 'Failure'
            }
            if(result) {
                res.send(successResult);
            } else {
                res.send(failureResult);
            }
            db.close();
        });
    });
});




app.post('/getIndividualProducts', bodyParser.json() ,(req, res) => {
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shopping");
        // console.log(req.body);
        var requestObject = req.body;
        // console.log(requestObject.name);
        dbo.collection("products").find({"productName": requestObject.name}).toArray(function (err, result) {
            if (err) throw err;
           if(result =='') {
                res.send(result);
                db.close();
           } else if(result[0].productName === requestObject.name){
               res.send(result);
               db.close();
           }
        });
    });
});


app.post('/customer/login', bodyParser.json(), function (req, res) {
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shopping");
        var requestObject = req.body;
        dbo.collection("customers").find({"email": requestObject.username}).toArray(function (err, result) {
            console.log('Inside customer login');
            if (err) throw err;
            let  failureEmailResult= {
                result: 'Login-Failure-Invalid-EmailID'
            };
            let failurePasswordResult = {
                result: 'Login-Failure-Invalid-Password'
            };
          
            let failureResult = {
                result: 'Login-Failure'
            };
            if (result == '') {
                res.send(failureEmailResult);
                db.close();
            } else if (result[0].email == requestObject.username) {
                if(result[0].password == requestObject.password) {
                    const token = jsonWebToken.sign(
                        { username: result[0].username,
                          email: result[0].email,
                          phone: result[0].phone,
                          role: result[0].role,
                          userId: result[0].userId  
                        }, 'secret123');
                        console.log(token);
                        let successResult = {
                            result: 'Login-Success',
                            token: token
                        };
                        // var decoded = jsonWebToken.decode(token);
                        // console.log('Header - ' + decoded.header);
                        // console.log('Payload - ' + decoded.payload);
                        // console.log('Secret - ' + decoded.secret)
                       
                    res.send(successResult);
                } else {
                    res.send(failurePasswordResult);
                }
                db.close();
            } else {
                res.send(failureResult);
            }
        });
    });

});


app.post('/customer/registration', bodyParser.json(), function (req, res) {
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shopping");
        var requestObject = req.body;
        // console.log('Request Body - ', req.body.email);
        dbo.collection("customers").find({ "email": requestObject.email }).toArray(function (err, result) {
            if (err) throw err;
            let successResult = {
                result: 'Registration-Success'
            };
            let failureResult = {
                result: 'Registration-Failure'
            }
            if (result == '') {
                dbo.collection("customers").insertOne(requestObject, function (err, res) {
                    if (err) throw err;
                    // console.log("1 document inserted");
                    db.close();
                });
                res.send(successResult);
            }
            else if (result[0].email == requestObject.email) {
                res.send(failureResult);
                db.close();
            }
        });
    });

});




app.post('/registration/verifyEmail', bodyParser.json(), function(req, res){
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
        if(err) throw err;
        var dbo = db.db('E-shopping');
        var requestObject = req.body;

    dbo.collection("customers").find({ "email": requestObject.email }).toArray(function (err, result) {
        if (err) throw err;
        if (result == '') {
            var form = {
                email:  requestObject.email
            }
                request.post({ url: 'http://172.16.144.166:3000/sendOTP',
                    json: form
                    },
                     function(err,httpResponse,body){  
                            if(err) throw err;
                            var json = {
                                otp: body,
                                result: 'Success'
                            }
                                res.send(json);
                });
            db.close();
        }
        else if (result[0].email == requestObject.email) {
            var json = {
                otp: '',
                result: 'Failure'
            }
            res.send(json);
        }
    });
});
});


app.post('/customer/verifyEmail', bodyParser.json(), function(req, res){
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
        if(err) throw err;
        var dbo = db.db('E-shopping');
        var requestObject = req.body;

    dbo.collection("customers").find({ "email": requestObject.email }).toArray(function (err, result) {
        if (err) throw err;
        if (result == '') {
            var json = {
                otp: 'Email not Found'
            }
            res.send(json);
        }
        else if (result[0].email == requestObject.email) {
            var form = {
                email: result[0].email
            }
                request.post({ url: 'http://172.16.144.166:3000/sendOTP',
                    json: form
                    },
                     function(err,httpResponse,body){  
                            if(err) throw err;
                            var json = {
                                otp: body
                            }
                                res.send(json);
                            });
            db.close();
        }
    });
});
});

app.listen(8080, function () {
    console.log("server running successfully in port:8080 SERVER.JS....");
});
