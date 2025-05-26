const Company = require("../model/company.model");


// Hiển thị danh sách công ty
module.exports.getAllCompany = async (req, res) => {
  try {
    
    const companies = await Company.find({deleted : false});
    res.json({
      status: 200,
      message: "Thành công",
      data: companies
    });
  } catch(error) {
        res.json({
            status : 500,
            message : error
        })
  }
};
// Chi tiet thong cong ty
module.exports.detailCompany = async (req,res) =>{
  const id = req.params.id;
  try{
    const company = await Company.findOne({_id : id});
    res.json({
      status : 200,
      message : "Da tim thay",
      data : company
    })
  }catch(error){
    res.status(500).json({
      status : 500,
      message : "Khoong tim thay"
    })
  }
}
// Thêm thông tin công ty
module.exports.addCompany = async (req,res) =>{
  const company = new Company(req.body)
  
  try{
    await company.save();
  res.json({
    status : 200,
    message : "create Successfull",
    data : company
  });
  }
  catch{
    res.status(500).json({
      status : 500,
      message : "create falied"
    })
  }
}
// Xoá thông tin công ty
module.exports.deleteCompany =async (req,res) =>{
  try{
    const id = req.params.id;
    await Company.updateOne({_id : id},{deleted : true})
    res.json({
      status : 200,
      message : "Deleted successful",

    })
  }
  catch(error){
    res.status(500).json({
      status : 500,
      message : `deleted failed ${error}`
    })
  }
}

// Cap nhat thong tin
module.exports.updateCompany =async (req,res)=>{

  const id = req.params.id
  try{

    await Company.updateOne({_id : id}, req.body)
    res.status(200).json({
      status : 200,
      message : "Update Successful",
      data : req.body
    })
  }
  catch(error){
    res.status(500).json({
      status : 500,
      message : `update failed ${error}`
    })
  }
}