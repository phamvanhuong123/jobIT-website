const Company = require("../../model/company.model");


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

// Thêm thông tin công ty
module.exports.addCompany = async (req,res) =>{
  const company = new Company(req.body)
  
  try{
    await company.save();
  res.json({
    status : 200,
    message : "Thêm thành công",
    data : company
  });
  }
  catch{
    res.status(500).json({
      status : 500,
      message : "Thêm thất bại"
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
      message : "Xoa thanh cong",

    })
  }
  catch(error){
    res.status(500).json({
      status : 500,
      message : "Xoa that bai"
    })
  }
}