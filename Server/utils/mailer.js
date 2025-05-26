import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Port 465 requires SSL
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Send email
 * @param {string} to Recipient email
 * @param {string} subject Email subject
 * @param {string} html Email HTML content
 */
export const sendMail = async (to, subject, html) => {
    return transporter.sendMail({
        from: `"Project Hub" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });
};
