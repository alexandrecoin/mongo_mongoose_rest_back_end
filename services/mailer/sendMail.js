require('dotenv').config()
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

module.exports = {transport};