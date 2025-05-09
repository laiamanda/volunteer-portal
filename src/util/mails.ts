const nodemailer = require("nodemailer");

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
  console.log('Serer is ready to take our message');
  
  try {
    const info = await transporter.sendMail({
      from: '"Example Team" <amanda.lai.dev@gmail.com>', // sender address
      to: "legoamanda99@gmail.com", // list of receivers
      subject: "Hello World", // subject line
      text: "Hello World?", // plain text body
      html: "<b>Hello World</b>", // html body
    });

    console.log("message Sent: " + info.messageId);
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log('Error while sending mail', err);
  }
}