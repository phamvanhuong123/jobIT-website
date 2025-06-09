const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();
const Account = require('../model/account.model')
const Candidate = require('../model/candicate.model')
const md5 = require('md5')
const JWT_SECRECT = dotenv.parsed.JWT_SECRECT
const moment = require('moment');
const Otp = require("../model/otp.model");
const randomNumber = require("../utils/randomNumber");
const sendEmail = require("../utils/sendEmail");

// Xác thực token
module.exports.verifyToken = (req,res)=>{
    res.json({
      status : 200,
      message : "verify token successfull",
      data : {
        dateNow : moment(Date.now()).format("DD/MM/YYYY HH-mm"),
        dateExp : moment(req.user.exp *1000).format("DD/MM/YYYY HH-mm"),
        dateIat : moment(req.user.iat *1000).format("DD/MM/YYYY HH-mm"),

      }
    })
}

// Đăng kí
module.exports.RegisterCandicate = async (req,res) =>{
    try{
        const {email} = req.body
        const existAccount = await Account.findOne({email : email})

        if (existAccount){
            res.status(400).json({
                status : 400,
                message : "Email đã tồn tại",
                data : existAccount.email
            })
            return
        }
        // 1 tạo mã otp
        let timeExpire = new Date();
        timeExpire.setTime(timeExpire.getTime() + 2 *60 *1000)
        // Đang fix
        const otp = new Otp(
            {
            email : email,
            codeOtp : randomNumber(6),
            expireAt : timeExpire
        })
        
        const newOtp = await otp.save();

      

        // Gửi otp cho email
        const subject = "Mã xác nhận OTP"
            const text = `Mã xác thực của bạn là <b>${newOtp.codeOtp}<b/>. Mã OTP này có hiệu lực trong 2 phút.Vui lòng không chia sẻ mã cho bất kì ai`
            sendEmail(newOtp.email,subject,text)
        res.json({
            status : 200,
            message : 'Đã gửi email',
        })
        
    }
    catch(error){
        res.status(500).json({
            status : 500,
            message :  `Gửi thất bại : ${error}`
        })
    }
    
    
}
// Đăng nhập 
module.exports.loginCandidate = async (req,res) =>{
    try{
        const {email,password} = req.body;
        
        const existAccount = await Account.findOne({email : email,password : md5(password),role : "candidate"});
        if (!existAccount){
            res.status(500).json({
                status : 500,
                message : "email hoặc mật khẩu không hợp lệ"
            })
            return;
        }

        // dữ liệu trả về
        const token = jwt.sign({id : existAccount._id, role : existAccount.role},JWT_SECRECT,{ expiresIn: '1h' });
        const candidate = await Candidate.findOne({idAccount : existAccount._id})
        res.json({
            status : 200,
            message : "Đăng nhập thành công",
            data : {
                user : candidate,
                token : token
            },
            
        })
    } 
    catch(e){
        res.status(400).json({
            status : 400,
            message  :`failed : ${e}`
        })
    }
}
// Nhập otp
module.exports.RegisterOtp =async (req,res) =>{
    try{
        const {username,email,otp,password} = req.body;
        const existOtp = await Otp.findOne({email : email,codeOtp : otp});
        if (!existOtp){
            res.status(400).json({
                status : 400,
                message : "Bạn đã nhập sai otp vui lòng thử lại"
            })
            return
        }

        //1 Them account
        const account = new Account({
            email : email,
            password : md5(password),
            role : "candidate"
        })
        const newAccount = await account.save();

        // 2 them candidate
        const candidate = new Candidate({
            fullName : username,
            idAccount : newAccount._id
        })
        await candidate.save();
        res.json({
            status : 200,
            message : "Đăng kí thành công"
        })

    }
    catch(e){
        res.status(500).json({
            status : 500,
            message : "Thất bại"
        })
    }
}

// Hiện thị danh sách account (dùng để test)
module.exports.getAllAccount = async (req,res) =>{
    const recordAccount = await Account.find();
    res.json({
        data : recordAccount
    })
}
// Xoá account 
module.exports.deleteAccount = async (req,res) =>{
    try{
        const {email} = req.params;

        const existAccount = await Account.findOne({email : email});
        if (!existAccount){
            res.json({
                status : 400,
                message : `Email : ${email} không tồn tại`
            })
            return
        }
        const result1 = await Candidate.deleteOne({idAccount : existAccount._id})
        const result2 = await Account.deleteOne({email : email});
        res.json({
            status : 200,
            message : "Xoá tài khoản thành công",
           data1 : result1,
           data2 : result2
        })

    }
    catch(e){
        res.json({
            message : `Xoá thất bại ${e}`
        })
    }
}