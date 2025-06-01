var jwt = require('jsonwebtoken');
const Account = require('../model/account.model')
const Candidate = require('../model/candicate.model')

module.exports.RegisterCandicate = async (req,res) =>{
    const {username,email,password} = req.body
    try{
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