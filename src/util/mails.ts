const nodemailer = require("nodemailer");
import * as fs from "fs";
const pug = require('pug');
const path = require("path");

export async function initMailer() {
  // Initiate transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    }
  });
  
  // Verify the connection
  await transporter.verify();
  console.log('Server is ready to take our message');

  try {
    const info = await transporter.sendMail({
      from: `"UpRoar" <${process.env.FROM_EMAIL}>`, // sender address
      to: process.env.TO_EMAIL, // list of receivers
      subject: "UpRoar 1st Newsletter", // subject line
      text: "Hello, This is UpRoar's Newsletter", // plain text body
      html: pug.renderFile(path.join(__dirname, '../../') + 'views/templates/newsletter/newsletter.pug', {
        title: 'UpRoar Newsletter',
        name: 'Amanda Lai',
        website: 'https://www.google.com',
      })
    });

    console.log("message Sent: " + info.messageId);
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log('Error while sending mail', err);
  }
}