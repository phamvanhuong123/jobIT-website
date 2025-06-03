const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();
const Account = require('../model/account.model')
const Candidate = require('../model/candicate.model')
const JWT_SECRECT = dotenv.parsed.JWT_SECRECT
const moment = require('moment')

// Xác thực token
module.exports.verifyToken = (req,res)=>{
    res.json({
      status : 200,
      message : "verify token successfull",
      data : {
        dateNow : moment(Date.now()).format("DD/MM/YYYY HH-mm"),
        dateExp : moment(req.user.exp *1000).format("DD/MM/YYYY HH-mm"),
        dateIat : moment(req.user.iat *1000).format("DD/MM/YYYY HH-mm")
      }
    })
}

// Đăng kí
module.exports.RegisterCandicate = async (req,res) =>{
    
    try{
        const {username,email,password} = req.body
        const existAccount = await Account.findOne({email : email})
        if (existAccount){
            res.status(400).json({
                status : 400,
                message : "Email đã tồn tại",
                data : existAccount.email
            })
            return
        }
        //1 Them account
        const account = new Account({
            email : email,
            password : password,
            role : "candicate"
        })
        const newAccount = await account.save();

        // 2 them candidate
        const candidate = new Candidate({
            name : username,
            idAccount : newAccount._id
        })
        await candidate.save();
        res.json({
            status : 200,
            message : 'Dang kí thanh cong',
        })
        
    }
    catch(error){
        res.status(500).json({
            status : 500,
            message :  `Dang ki that bai : ${error}`
        })
    }
    
    
}

// Đăng nhập 
module.exports.loginCandidate = async (req,res) =>{
    try{
        const {email,password} = req.body;
        
        const existAccount = await Account.findOne({email : email,password : password,role : "candidate"});
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