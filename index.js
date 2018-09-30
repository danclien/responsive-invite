'use strict';
const fs = require('fs');
const nodemailer = require('nodemailer');
const mjml2html = require('mjml').default;

const fromEmail = 'me@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: fromEmail,
         pass: 'appSpecificGmailPassword'
     }
 });

const recipients = [
];

const sendMail = html => {        
  const mailOptions = {
    from: fromEmail,
    to: [
      fromEmail
    ],
    bcc: recipients,
    subject: 'Party invite!',
    html: html
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(info);
    }
  });
}

fs.readFile('./index.mjml', 'utf8', function read(err, mjml) {
  if (err) {
      throw err;
  }

  const result = mjml2html(mjml, {
    beautify: true
  });

  sendMail(result.html);
});
