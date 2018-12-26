var express = require("express");
var router = express.Router();

var OrderController = require("../controllers/order.controller");
var checkUserAuthentication = require('../middleware/user-authentication');
var checkSuperAdminAuthentication = require('../middleware/super-admin-authentication');

// User - Get all cart items
router.post("/getCart", checkUserAuthentication, OrderController.cartDetails);

// User - Add product into the cart
router.post("/addToCart", checkUserAuthentication, OrderController.addToCart);

// User - Delete from cart
router.post("/deleteFromCart", checkUserAuthentication, OrderController.deleteFromCart);

// User - Order Item
router.post("/addToPurchase", checkUserAuthentication, OrderController.addToPurchase);

// User - Cancel order
router.post("/deleteFromPurchase", checkUserAuthentication, OrderController.deleteFromPurchase);

// Super Admin - Order 
router.get("/getOrderSummarySuperAdmin", checkSuperAdminAuthentication, OrderController.superAdminDashboardOrderSummary);

// Super Admin - Order
router.get('/getOrderCountSuperAdmin', checkSuperAdminAuthentication, OrderController.superAdminDashboardOrderCount);

module.exports = router;