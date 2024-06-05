import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});

export default async function sendMail({
  email,
  subject,
  body,
}: {
  email: string;
  subject: string;
  body: string;
}): Promise<SMTPTransport.SentMessageInfo> {
  return transporter.sendMail({
    from: {
      name: "Saiful Islam - Portfolio",
      address: process.env.APP_USER!,
    },
    to: email,
    subject,
    html: body,
  });
}
