"use strict";
const nodemailer = require("nodemailer");
const supabase = require('./supabase');

// async..await is not allowed in global scope, must use a wrapper
async function sendNotification() {

  let emailParams = supabase.get_inquires();
  console.log(emailParams.recipient + "in send notify function now");


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
    to: emailParams.recipient, // list of receivers
    subject: "Thank you for your Inquiry", // Subject line
    html: welcomeUserEmail(emailParams.guests), // html body
  }

  const notificationAdmin = {
    from: 'hello@ryanjrichards.com', // sender address
    to: "ryanjr@me.com", // list of receivers
    subject: "Thank you for your Inquiry", // Subject line
    html: notifyAdminEmail(emailParams.guests, emailParams.recipient, emailParams.venue, emailParams.date), // html body
  }

  let infoUser = await transporter.sendMail(notificationUser);
  let infoAdmin = await transporter.sendMail(notificationAdmin);


  function welcomeUserEmail(guests) {
    return `<b>We will be in touch soon! Your requested gelato for ${guests} guests.</b>`;
  }

  function notifyAdminEmail(guests, recipient, venue, date) {
    return `<b>You have a new inquiry from ${recipient} for a wedding at ${venue} on ${date}. For ${guests} guests.</b>`;
  }

  console.log("Message sent: %s", infoUser.messageId);
  console.log("Message sent: %s", infoAdmin.messageId);
}

module.exports = {
  sendNotification,
}