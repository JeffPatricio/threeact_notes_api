import crypto from "crypto"

export const requestLog = (req, res, next) => {
  const colors = {
    FgYellow: "\x1b[33m%s\x1b[0m",
    FgBlue: "\x1b[34m%s\x1b[0m",
    FgMagenta: "\x1b[35m%s\x1b[0m"
  }
  const now = new Date()
  const date = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear()
  const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
  console.log(colors.FgMagenta, `[${date + " - " + time}] - IP: ${req.ip} Method: ${req.method} URL: ${req.url}`)
  return next()
}

export const isEmail = (email) => {
  return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email) ? true : false
}

export const encrypt = (text) => {
  try {
    const cipher = crypto.createCipher("aes-256-ctr", "d6F3Efeq")
    return cipher.update(text, "utf8", "hex") + cipher.final("hex")
  } catch (e) {
    console.log(":: Erro na geração do token: ", e)
    return null
  }
}

export const decrypt = (text) => {
  try {
    const decipher = crypto.createDecipher("aes-256-ctr", "d6F3Efeq")
    return decipher.update(text, "hex", "utf8") + decipher.final("utf8")
  } catch (e) {
    console.log(":: Erro na leitura do token: ", e)
    return null
  }
}
