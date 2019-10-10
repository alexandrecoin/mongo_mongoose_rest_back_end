require('dotenv').config();
const nodemailer = require('nodemailer');
let transport = require('../../server');

transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

sendEmail = async (moment, template) => {
  var mailOptions = {
    from: process.env.MAIL_TEST_ADDRESS, // Sender address
    to: 'to@email.com', // List of recipients
    subject: 'Thank you for subscribing', // Subject line
  };
  if (moment === 'subscription')
    mailOptions = { ...mailOptions, html: template };
  transport.sendMail(mailOptions, function(error, info) {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });
};

module.exports = { transport, sendEmail };
