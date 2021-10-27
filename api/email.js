"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendNotification(emailParams) {

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 587, // port for secure SMTP
    auth: {
      user: process.env.GODADDY_EMAIL,
      pass: process.env.GODADDY_PASS,
    },
  });

  const notificationUser = {
    from: 'hello@ryanjrichards.com', // sender address
    to: "ryanjr@me.com" + emailParams.toEmail, // list of receivers
    subject: "Thank you for your Inquiry", // Subject line
    html: welcomeUserEmail(emailParams.quote), // html body
  }

  const notificationAdmin = {
    from: 'hello@ryanjrichards.com', // sender address
    to: "ryanjr@me.com" + emailParams.toEmail, // list of receivers
    subject: "Thank you for your Inquiry", // Subject line
    html: notifyAdminEmail(emailParams.quote, emailParams.toEmail, emailParams.venue, emailParams.date), // html body
  }

  let infoUser = await transporter.sendMail(notificationUser);
  let infoAdmin = await transporter.sendMail(notificationAdmin);


  function welcomeUserEmail(quote) {
    return `<b>We will be in touch soon! ${quote}</b>`;
  }

  function notifyAdminEmail(quote, email, venue, date) {
    return `<b>You have a new inquiry from ${email} for a wedding at ${venue} on ${date}. User was quoted : ${quote}.</b>`;
  }

  console.log("Message sent: %s", infoUser.messageId);
  console.log("Message sent: %s", infoAdmin.messageId);
}

module.exports = {
  sendNotification
}