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
    user: 'colocar usuario aqui',
    pass: 'colocar senha aqui',
  },
});

module.exports = options => transport.sendMail(options);
