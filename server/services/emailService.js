const nodemailer = require('nodemailer');
require('dotenv').config();

const sendConfirmationEmail = async (email, confirmationLink) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // Or use SMTP settings for other providers
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Confirmation",
        html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email.</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = { sendConfirmationEmail };