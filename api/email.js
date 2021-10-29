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
    to: emailParams.recipient, // list of receivers
    subject: "Thank you for your Inquiry", // Subject line
    html: welcomeUserEmail(), // html body
  }
  
  const notificationAdmin = {
    from: 'hello@ryanjrichards.com', // sender address
    to: "ryanjr@me.com", // list of receivers
    replyTo: emailParams.recipient, //reply to this email directly to the user.
    subject: "New Inquiry", // Subject line
    html: notifyAdminEmail(emailParams.guests, emailParams.recipient, emailParams.venue, emailParams.date), // html body
  }

  let infoUser = await transporter.sendMail(notificationUser);
  let infoAdmin = await transporter.sendMail(notificationAdmin);


  function welcomeUserEmail() {
    return `<b>We will be in touch soon!</b>`;
  }

  function notifyAdminEmail(guests, recipient, venue, date, message) {
    return `<b>You have a new inquiry from ${recipient} for a wedding at ${venue} on ${date}. For ${guests} guests. They inlcuded this message : "${message}" </b>`;
  }

  console.log("Message sent: %s", infoUser.messageId);
  console.log("Message sent: %s", infoAdmin.messageId);
}

async function sendContact(emailParams) {

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
    html: welcomeUserEmail(emailParams.name), // html body
  }
  
  const notificationAdmin = {
    from: 'hello@ryanjrichards.com', // sender address
    to: "ryanjr@me.com", // list of receivers
    replyTo: emailParams.recipient, //reply to this email directly to the user.
    subject: "New Inquiry", // Subject line
    html: notifyAdminEmail(emailParams.name, emailParams.guests, emailParams.recipient, emailParams.venue, emailParams.date, emailParams.message), // html body
  }

  let infoUser = await transporter.sendMail(notificationUser);
  let infoAdmin = await transporter.sendMail(notificationAdmin);


  function welcomeUserEmail(name) {
    return `<b>Hey ${name}, we will be in touch soon!</b>`;
  }

  function notifyAdminEmail(name, guests, recipient, venue, date, message) {
    return `<b>You have a new inquiry from ${name} for a wedding at ${venue} on ${date}. For ${guests} guests. They inlcuded this message : "${message}" </b>
    <p>Resond to them here ${recipient}</p>
    `;
  }

  console.log("Message sent: %s", infoUser.messageId);
  console.log("Message sent: %s", infoAdmin.messageId);
}

module.exports = {
  sendNotification,
  sendContact,
}