
const Job = require("../model/job.model");


// Lấy danh sách các job
module.exports.getAllJobs = async (req,res) =>{
    try{
        const find  = {
            deleted : false
        }
        const record = await Job.find(find);
        res.json({
        message: "Thanh cong",
        data : record
    })
    }
    catch(e){
        res.status(500).json({
            status : 500,
            message : `Thất bại : ${e}`
        })
    }
}
// Tạo job mới theo công ty.
module.exports.createJoByCompany =async (req,res) =>{
    
    
    try{
        const idCompany = req.params.idCompany;
        req.body.idCompany = idCompany;
        const job = new Job(req.body);
        await job.save();
        res.json({
            status : 200,
            message : "Create job successful",
            data : req.body
        })
    }
    catch(e){
        res.status(500).json({
            status : 500,
            message : `failed : ${e}`
        })
    }
}
// xoa job
module.exports.deleteJob = async (req,res) =>{
    try{
        const id = req.params.id;
        const result = await Job.deleteOne({_id :id});
        res.json({
            status  : 200,
            message : result.deletedCount
        })
    }
    catch(e){
         res.status(500).json({
            status : 500,
            message : `failed : ${e}`
        })
    }
}