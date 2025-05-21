const Company = require("../../model/company.model");

module.exports.getAll = async (req, res) => {
  try {
    const companies = await Company.find();
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
