const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();

const JWT_SECRECT = dotenv.parsed.JWT_SECRECT
module.exports.verifyJWT = (req,res,next) =>{

    const authHeader = req.headers.authorization;
    if (!authHeader){
        res.status(400).json({
            status : 400,
            message : "Khong có token"
        })
        return;
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRECT)
        req.user = decoded;
        next();
    }

    catch(e){
        res.status(400).json({
            status  :400,
            message : `Token không hợp lệ hoặc đã hết hạn ${e}`
        })
    }
    
}
