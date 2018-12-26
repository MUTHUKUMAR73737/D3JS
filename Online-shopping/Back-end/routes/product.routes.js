var express = require("express");
var router = express.Router();

// Product Image storage
var multer = require("multer");
// const path = require('path');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./product-images/");
  },
  filename: function (req, file, cb) {
    var product = JSON.parse(req.body.product);
    cb(null, product.productName + ' - '+ file.originalname);
  }
});

// Image Filtering
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Cannot get this image"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

var ProductController = require("../controllers/product.controller");
var checkAdminAuthentication = require("../middleware/admin-authentication");

// Home page
router.get("/getTotalProduct", ProductController.getTotalProducts);

// Description page
router.post("/getProduct", ProductController.getProduct);

// Admin - product - registration
router.post("/registration", checkAdminAuthentication, upload.any(), ProductController.productRegistration);

// Admin - product - delete
router.post("/delete", checkAdminAuthentication, ProductController.deleteProduct);

// Admin - product - update
router.post("/update", checkAdminAuthentication, ProductController.updateProduct);

// Product list page
router.post("/getProductType", ProductController.getProductByType);

// Admin functionality - View Admin product
router.post("/getTotalAdminProduct", checkAdminAuthentication, ProductController.getTotalAdminProduct);

// Admin functionality - View Individual product for update
router.post("/getAdminProduct", checkAdminAuthentication, ProductController.getAdminProduct);


module.exports = router;