import nodemailer from 'nodemailer';
import 'dotenv/config';

export default {
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_USER}`,
      pass: `${process.env.EMAIL_PASS}`
    }
  }),
  options: {
    from: `${process.env.EMAIL_USER}`,
  }
}