const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP, // Replace with your SMTP server
  port: 587, // Usually 587 for TLS
  secure: false, // Set to true if using port 465
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Email options
const mailOptions = {
  from: "noreply@codestuff.dev", // Sender address
  to: "aaron@codestuff.dev", // List of recipients
  subject: "Hello from Node.js", // Subject line
  text: "This is a test email sent from a Node.js application!", // Plain text body
  // html: '<b>This is a test email sent from a Node.js application!</b>' // HTML body (optional)
};

// Send the email
function sendEmail(data) {
  const { name, email, message } = JSON.parse(data);
  mailOptions.to = email;
  mailOptions.subject = `Welcome ${name}`;
  mailOptions.text = message;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred: " + error.message);
    }
    console.log("Email sent: " + info.response);
  });
}

module.exports = { sendEmail };
