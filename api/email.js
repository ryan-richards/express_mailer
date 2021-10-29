"use strict";
const nodemailer = require("nodemailer");
const {google} = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

// async..await is not allowed in global scope, must use a wrapper
async function sendNotification(emailParams) {

  const accessToken = await oAuth2Client.getAccessToken()

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'info@brookavenue.co.uk',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    }
  });

  const notificationUser = {
    from: 'info@brookavenue.co.uk', // sender address
    to: emailParams.recipient, // list of receivers
    subject: "Thank you for your Inquiry", // Subject line
    html: welcomeUserEmail(), // html body
  }
  
  const notificationAdmin = {
    from: 'info@brookavenue.co.uk', // sender address
    to: "info@brookavenue.co.uk", // list of receivers
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

  const accessToken = await oAuth2Client.getAccessToken()

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'info@brookavenue.co.uk',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    }
  });

  const notificationUser = {
    from: 'info@brookavenue.co.uk', // sender address
    to: emailParams.recipient, // list of receivers
    subject: "Thank you for your Inquiry", // Subject line
    html: welcomeUserEmail(emailParams.name), // html body
  }
  
  const notificationAdmin = {
    from: 'info@brookavenue.co.uk', // sender address
    to: "info@brookavenue.co.uk", // list of receivers
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