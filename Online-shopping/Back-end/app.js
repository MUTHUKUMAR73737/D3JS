var url = "mongodb://localhost:27017/E-shopping";
var express = require('express');
var app = express();
var bodyParser= require('body-parser'); 
var mongoose = require('mongoose');

mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

var morgan = require("morgan");
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Image HOSTING
app.use('/product-images', express.static('product-images'));

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('content-type', 'application/json');
    next();
});

app.use(morgan('dev'));

app.use('/product', productRoutes);
app.use('/customer', userRoutes);
app.use('/order', orderRoutes);


app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(3000 , function () {
    console.log("server running successfully in port:3000 APP.JS....");
});

module.exports = app;