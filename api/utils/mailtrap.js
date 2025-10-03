import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d419d52f429426",
            pass: "7fb64a6ab39526" //! Save in env
        }
    });
    const mailOptions = {
        from: "info@fiverclone.com",
        to: email, 
        subject: subject,
        html: text
    };
    await transporter.sendMail(mailOptions);
}

export default sendMail;

  