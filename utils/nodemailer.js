require('dotenv').config()

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.HOSTMAIL,
    port: process.env.PORTMAIL,
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASSMAIL
    }
});


const mailoptions = {
    from:process.env.USERMAIL,
    to:process.env.USERMAILADMIN
}


module.exports = {transporter,mailoptions}
