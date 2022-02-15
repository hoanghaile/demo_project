import { Admin } from "../models/Admin.js";
import argon2 from 'argon2';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
// import router from "../routers/auth.js";

export const register = async (req, res) => {
    const { fullname, username, password, phone, email, gender, address, passport, nationality, nation, position, work } = req.body;
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing username and/or password'})
    try {
        const user = await Admin.findOne({ username })
        if (user)
            return res.status(400).json({ success: false, message: 'Username already taken' });
        const hashedPassword = await argon2.hash(password);
        const newUser = new Admin({ fullname, username, password: hashedPassword, phone, email, gender, address, passport, nationality, nation, position, work});
        await newUser.save()

        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)

        res.json({success: true, message: 'user' , accessToken})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) 
        return res.status(400).json({ success: false, message: 'Missing username and/or password'})
    try {
        const user = await Admin.findOne({ username })

        if (!user)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })
        const passwordValid = await argon2.verify(user.password, password)

        if (!passwordValid)
            return res.status(400).json({ success: false, message: 'Incorrect username 1 or password' })
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
  
            res.json({success: true, message: "login thanh cong",accessToken, })
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const verifyAccount = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) 
        return res.status(400).json({ success: false, message: 'Missing username and/or password'})
    try {
        const user = await Admin.findOne({ username })

        if (!user)
            return res.status(400).json({ success: false, message: 'username không đúng' })
        const passwordValid = await argon2.verify(user.password, password)

        if (!passwordValid)
            return res.status(400).json({ success: false, message: 'pass không đúng ' })
        const accessToken = {
            username: username,
            password:password
        }
  
            res.json({success: true, message: "login thanh cong",accessToken})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
export const show = async (req, res) => {
     const { username, password } = req.body;
    try {
        const user = await Admin.findById(req.userId)
        if (!user) return res.status(400).json({ success: false, message: 'user not found' })
    // console.log(user);
        res.json({ success: true,user })
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


export const getById = async (req, res) => {
    try {
        // const adminId = {_id: req.params.id, admin: req.adminId}
        const admin = await Admin.findById(req.userId).exec()
        
        return res.status(200).json({ success: true,  message: 'successfully', admins: admin })
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find({ admin: req.adminId })
        console.log(admins);
        res.status(200).json({ success: true, admins })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const updateAdmin = async (req, res) => {
    const { fullname, username, image, phone, email, gender, address, passport, nationality, nation, position, work } = req.body;
    try {
        let updateAdmin = {
            fullname,
            username,
            image,
            phone,
            email,
            gender,
            address,
            passport,
            nationality,
            nation,
            position,
            work: work

        }
        const AdminUpdate = { _id: req.params.id, admin: req.adminId }
        updateAdmin = await Admin.findOneAndUpdate(AdminUpdate, updateAdmin, { new: true })
        // return res.status(200).json({ success: true })
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const delateAdmin = { _id: req.params.id }
        const adminDelete = await Admin.deleteOne(delateAdmin);
        return res.status(200).json({success: true, admins: adminDelete})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

export const updateStatus = async (req, res) => {
    const { work } = req.body;
    try {
        let updateStatus = {
            work: work
        }
        const statusUpdate = { _id: req.params.id }
        updateStatus = await Admin.findByIdAndUpdate(statusUpdate, updateStatus, { new: true })
        res.status(200).json({ success: true, message: 'Thanh Cong' })
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const changePass = async (req, res) => {
 
   const {oldPass,newPass}=req.body
   const hashedPassword = await argon2.hash(newPass);
    try {
        let changePass = {
            password:hashedPassword,
        }
        const user = await Admin.findById(req.params.id)
        const passwordVALIDATE = await argon2.verify(user.password,oldPass)

        if (!passwordVALIDATE) {
             return res.status(400).json({ success: false, message: 'mật khẩu không đúng' })
        } else {
           const changePassword = await Admin.findByIdAndUpdate(req.params.id, changePass, { new: true })
            console.log(changePass,77);
            return res.status(200).json({ success: true, message: 'Thanh Cong roi nha', admin: changePassword })
        }

    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}   
// export const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     const user =  await Admin.findOne({ email }, (err, admin) => {
//     if (err ||!email)
//         return res.status(400).json({success: false, message:'Email ko tồn tại'})
//     })
//     const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
//     const transport = nodemailer.createTransport({

//     })
// }

export const mailChange = async (req, res) => {
    const { _id, email } = req.body;
    if (!_id || !email)
        return res.status(400).json({ success: false, message: 'Tài khoản hoặc email không tồn tại' })
    try {
        let user = await Admin.findOne({ _id, email });
        // mailer(email, _id)
        res.status(200).json({success: true, message:"Kiểm tra email của bạn", data: user})
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