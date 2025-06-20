const CompanyReview = require("../model/companyReview.model");
const Company = require("../model/company.model");
const Account = require("../model/account.model");

// Lấy danh sách
module.exports.gellAllByIdcompany = async (req, res) => {
  try {
    const record = await CompanyReview.find({companyId : req.params.companyId});
    const avgRating = await CompanyReview.aggregate([
      {
        $match : {companyId : req.params.companyId}
      },
      {
        $group: {
          _id: null,
      
          averageRating: { $avg: "$rating" },
        },
      },
      {
        $project : {
            averageRating : 1
        }
      }
    ]);
    res.json({
      status: 200,
      message: "successfull",
      data: record,
      avgRating : avgRating[0].averageRating
      
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `Lỗi ${e}`,
    });
  }
};


// THêm review
module.exports.addReviewCompany = async (req, res) => {
  try {
    const existAccount = await Account.findOne({ _id: req.body.accountId });
    const existCompany = await Company.findOne({ _id: req.body.companyId });

    if (!existAccount || !existCompany) {
      console.log(existCompany);
      res.status(400).json({
        status: 400,
        message: "Tài khoản hoặc công ty không tồn tại",
      });
      return;
    }
    const existReview = await CompanyReview.findOne({
      accountId: existAccount._id,
      companyId: existCompany._id,
    });
    if (existReview) {
      res.status(400).json({
        status: 400,
        message: "Đánh giá của bạn đã tồn tại",
      });
      return;
    }

    const reviewCompany = new CompanyReview(req.body);

    const newReviewCompany = await reviewCompany.save();

    res.json({
      status: 200,
      message: "successfull",
      data: newReviewCompany,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `Lỗi ${e}`,
    });
  }
};

// Chỉnh sửa review
module.exports.updateReviewCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const existReview = await CompanyReview.findOne({ _id: id });

    if (!existReview) {
      res.status(400).json({
        status: 400,
        message: `Id không hợp lệ`,
      });
      return;
    }

    const updateRecord = await CompanyReview.updateOne(
      { _id: id },
      { $set: req.body }
    );
    console.log(updateRecord);
    res.json({
      status: 200,
      message: "successfull",
      data: `Có ${updateRecord.modifiedCount} bản ghi đã thay đổi`,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `Lỗi ${e}`,
    });
  }
};

// xoá review
module.exports.deleteReviewCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const existReview = await CompanyReview.findOne({ _id: id });

    if (!existReview) {
      res.status(400).json({
        status: 400,
        message: `Id không hợp lệ`,
      });
      return;
    }

    const deletedRecord = await CompanyReview.deleteOne({ _id: id });

    res.json({
      status: 200,
      message: "successfull",
      data: `Có ${deletedRecord.deletedCount} bản ghi đã xoá`,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `Lỗi ${e}`,
    });
  }
};
