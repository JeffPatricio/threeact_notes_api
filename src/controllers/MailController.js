import mustache from 'mustache'
import mail from '../config/mail'
import { encrypt } from '../utils/index'
import template from '../templates/mail/accountActivation'
import 'dotenv/config'

export default {
    activationEmail(name, email) {
        return new Promise((resolve) => {
            const token = encrypt(email)
            mail.options.subject = `Ativação de Conta ${name}`
            mail.options.to = email
            mail.options.html = mustache.render(template, { url: `${process.env.SERVER_URL}/account/${token}` })
            mail.transporter.close()
            mail.transporter.sendMail(mail.options, (error, info) => {
                if (error) {
                    console.log(`Erro ao enviar email -> ${error} `)
                    return resolve(false)
                } else {
                    console.log(`Email enviado para ${email} -> ${info.response} `)
                    return resolve(true)
                }
            })
        })
    }
}