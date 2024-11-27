import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: 'yanky.hermawan@movingbytesplayground.com',
        pass: 'YHermawan2024$'
    }
})