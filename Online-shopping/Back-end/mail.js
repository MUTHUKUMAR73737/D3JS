var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
var nodemailer = require("nodemailer");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/sendOTP", bodyParser.json(), function(req, res) {
  var otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
  var myObj = req.body;
  var message = `<p>Your one time password for <strong>E-SHOPPING</strong> - <strong>${otp}</strong></p>`;
  var receiverEmail = myObj.email;
  console.log(receiverEmail);
  var transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
              user: "muthukumar.subramaniam@aspiresys.com",
              pass: "Muthu@123"
            },
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587,
            tls: {
              ciphers: "SSLv3"
            },
            requireTLS: true
  });

  var mailOptions = {
            from: "muthukumar.subramaniam@aspiresys.com",
            to: receiverEmail,
            subject: "Your OTP",
            html: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log("Error at email sending - " + error);
              res.status(401).json({
                otp: '0000',
                message: 'Failure'
              })
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).json({
                otp: otp,
                message: 'Success'
              });
            }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port Email OTP !!!!!! ${PORT}`);
});
