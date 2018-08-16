const nodemailer = require('nodemailer');
// const {
//   host,
//   port,
//   user,
//   pass,
// } = require('../../config/mail');

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '358ad6e2d0fb1d',
    pass: '234bf1410386af',
  },
});

module.exports = options => transport.sendMail(options);
