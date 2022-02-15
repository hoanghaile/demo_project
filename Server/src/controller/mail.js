import { Admin } from '../models/Admin.js';
import nodemailer from 'nodemailer';
//import { sendMail } from '../utils/mail.js';
import { Otp } from '../models/opt.js'
import argon2 from 'argon2';
//import { Token }from '../models/token.js';
//import crypto from 'crypto';
//import Joi from 'joi';

// export const mail = async (req, res) => {
//     try {
//         const schema = Joi.object({ email: Joi.string().email().required() });
//         const { error } = schema.validate(req.body)
//         if (error)
//             return res.status(400).send(error.details[0].message)
//         const user = await Admin.findOne({ email: req.body.email });
//         if (!user)
//             return res.status(400).send("user with given email doesn't exist");
//         let token = await Token.findOne({ userId: user._id });
//         if (!token) {
//             token = await new Token({
//                 userId: user._id,
//                 token: crypto.randomBytes(32).toString("hex"),

//             }).save();
//             const link = `${process.env.CLIENT_URL}/password-reset/${user._id}/${token.token}`;
//             await sendMail(user.email, 'Password reset', link);
//             res.status(200).send("password reset link sent to your email account");
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("An error occured");
//     }
// }

// export const passwordReset = async (req, res) => {
//     try {
//         const schema = Joi.object({ password: Joi.string().required() })
//         const { error } = schema.validate(req.body);
//         if (error)
//             return res.status(400).send(error.details[0].message)
//         const user = await Admin.findById(req.params.userId)
//         if (!user)
//             return res.status(400).send("invalid link or expired");
//         const token = await Token.findOne({
//             userId: user._id,
//             token: req.params.token,
//         });
//         if (!token)
//             return res.status(400).send("Invalid link or expired");
//         user.password = req.body.password;
//         await user.save();
//         await token.delete()
//         res.status(200).send("password reset sucessfully.");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("An error occured")
//     }
// }

// export const defineRoute = async (req, res) => {
//     try {
//         const { error } = validate(req.body);
//         if (error)
//             return res.status(400).send(error.details[0].message)
//         const user = await new Admin(req.body).save();
//         res.status(200).send(user)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("An error occured");
//     }
// }

export const sendmail = async (req, res) => {
    // console.log(req.body.email);
    const { email } = req.body;
    try {
        let data = await Admin.findOne({email});
        if (data) {
            let otpCode = Math.floor((Math.random() * 10000) + 1);
            let otpData = new Otp({
                email: email,
                code: otpCode,
                expierIn: new Date().getTime() + 300 * 1000
            })
            let otpRes = await otpData.save();
            mailer(email,otpCode);
            res.status(200).json({ success: true, message: 'lam on check email', otp: otpRes })
        } else {
            res.status(400).json({ success: false, message: 'email ko ton tai' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: "false"})
    }
    //res.status(200).json({success:true, message:"okk"})
}

export const changePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        let data = await Otp.find({ email, code: req.body.otpCode });
        if (data) {
            let currentTime = new Date().getTime();
            let diff = data.expierIn - currentTime;
            if (diff < 0) {
                res.status(400).json({success:false, message:"Token expire"})
            } else {
                let user = await Admin.findOne({ email });
                user.password = await argon2.hash(password);
                user.save()
                res.status(200).json({success: true, message:"Password change successfully"})
            }
        } else {
            res.status(400),json({success: false, message:'false'})
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: "false"})
    }

}

const mailer = (email, otp) => {
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        host: process.env.MAIL_HOST,
        port: 456,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    const mailOptions = {
        from: "smtp.hailhps11105@gmail.com",
        to: email,
        subject: "send mail",
        text: "Hello",
        html: `
        <h2>Nhập mã OTP để lấy lại mật khẩu của bạn</h2>
        <h3>${otp}</h3>
        `,
    }
    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent" + info.message);
        }
    })
}