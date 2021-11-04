import nodemailer from 'nodemailer'

const mailerConfig = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "29a5032134bd17",
    pass: "445cc49eba00a5"
  }
}

export const mailer = nodemailer.createTransport(mailerConfig)