const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const home = require('../models/home.model')
const JWTHelper = require('../helpers/auth.helper')
const user = require('../models/user.model')

module.exports.register = async (req, res) => {
    try {
        const { password, image, lastName, firstName, sex, DOB, template } = req.body
        const {email} = req.user
        if(!email || !password || !image || !lastName || !firstName || !sex || !DOB || !template) 
            return res.sendStatus(404)
        const result= await home.register({email, password, image, lastName, firstName, sex, DOB, template})
        delete result.password
        return res.status(200).json({
            message: 'Đăng ký thành công',
            data: result
        })
    }catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

module.exports.verifyEmail = async (req, res)=> {
    try {
        const  { email } = req.body
        console.log(email)
        if(!email)
            return res.sendStatus(404)
        const checkEmail = await user.findByEmail(email)
        if(checkEmail) {
            return res.status(200).json ({
                message: 'Email đã được đăng ký!'
            })
        }

        const token = await JWTHelper.createToken({email}, process.env.ACCESS_TOKEN_SECRET, '10m')
        const oAuth2Option = {
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            redirectUri: process.env.EMAIL_REDIRECT_URI
        }

        const oAuth2Client = new google.auth.OAuth2(oAuth2Option)
        oAuth2Client.setCredentials({refresh_token: process.env.EMAIL_REFRESH_TOKEN})
        const accessToken = await oAuth2Client.getAccessToken()
        
        let transporter= nodemailer.createTransport({
            service:'gmail', 
            auth: {
                type: 'OAuth2',
                user: 'titustran0601@gmail.com',
                clientId: process.env.EMAIL_CLIENT_ID,
                clientSecret: process.env.EMAIL_CLIENT_SECRET,
                refreshToken: process.env.EMAIL_REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        let info = await transporter.sendMail({
            from: `'${email}'`,
            to: email,
            subject: 'Confirm your account on Merry-chat',
            html: ` <form style="padding: 0 20px; width: 600px; height: 300px; margin: 0 auto; border: 1px solid lightgrey; border-radius: 10px;">
                        <h1 style="margin-bottom: 15px; width: 100%; color: #9c2ec4; text-align: center;">MERRY CHAT</h1>
                        <h3 style="color: grey; font-size: 17px;"> Xác nhận email đăng nhập cùng Merry!</h3>
                        <p style="font-size: 17px; width: 100%; color: grey">Xin chào!</p>
                        <p style="font-size: 17px; width: 100%; color: grey; text-align: justify;">Cảm ơn bạn đã đăng ký tài khoản với chúng tôi. Để bắt đầu, chúng tôi cần bạn xác nhận email này chính là bạn. Hãy nhấp vào nút bên dưới để xác nhận:</p>
                        <p style="margin-top: 10px;">
                            <a id="click-to-verify"  style="
                                    display: block;
                                    width: 150px; 
                                    height: 35px; 
                                    background-color: blue; 
                                    color: white; 
                                    font-size: 17px; 
                                    text-align: center; 
                                    line-height: 35px; 
                                    border-radius: 4px;
                                    text-decoration: none;" 
                                href="http://localhost:3000/register/${token}">
                                Xác nhận email!
                            </a>
                        </p>
                    </form>
                    `
        })
        console.log("Message sent: %s", info.accepted)
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
        return res.status(200).json({
            message: 'Vui lòng kiểm tra gmail!'
        })
    }catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}