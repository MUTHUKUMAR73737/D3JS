var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller');
var ProductController = require('../controllers/product.controller');
var checkUserAuthentication = require('../middleware/user-authentication');

// User - login
router.post('/login', UserController.login);

// User - registration
router.post('/registration', UserController.registration);

// User - Registration - Email verification
router.post('/registration/verifyEmail', UserController.registrationVerifyEmail);

// User - Forgot password - Change password
router.post('/changePassword', UserController.changePassword);

// User - Forgot password - Email verification
router.post('/changePassword/verifyEmail', UserController.changePasswordVerifyEmail);

// User - To get product for place order
router.post('/getOrderProduct', checkUserAuthentication, ProductController.getOrderProduct);

// User - update user details
router.post('/updateUserDetail', UserController.changeUserDetails);

// User - delete user details
router.post('/deleteUserDetail', UserController.deleteUserDetail);

// User - Order - cash on delivery -captcha verification
router.post('/getCaptcha', UserController.captchaVerification);

// Super Admin - Get admin details - CRUD operation
router.get('/getAdminDetails', UserController.getAdminDetails);

// Super Admin - Get customer count
router.get('/getCustomerCount', UserController.customerCount);

module.exports = router;