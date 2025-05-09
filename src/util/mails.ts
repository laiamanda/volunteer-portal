const nodemailer = require("nodemailer");

async function initMailer() {
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
  console.log('Serer is ready to take our message');
}
