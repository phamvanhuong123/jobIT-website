const Job = require("../model/job.model");
const Company = require("../model/company.model");
// Lấy danh sách job theo công ty
module.exports.getJobsbyCompany = async (req, res) => {
  try {
    const idCompany = req.params.idCompany;
    const find = {
      deleted: false,
      idCompany: idCompany,
    };
    const sort = {
      createdAt: -1,
    };
    // const record = await Job.find(find);
    const recordArr = await Job.aggregate([
      {
        $match: find,
      },
      {
        $sort : sort
      },
      {
        $addFields: { IdObject: { $toObjectId: "$idCompany" } },
      },
      {
        $lookup: {
          from: "companies",
          localField: "IdObject",
          foreignField: "_id",
          as: "fromCompany",
        },
      },
      // Chuyển fromCompany thành phần từ
      {
        $unwind: {
          path: "$fromCompany",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Thêm 2 trường
      {
        $addFields: {
          nameCompany: "$fromCompany.name",
          logoCompany: "$fromCompany.logo",
        },
      },
      // Ẩn đi các trường không cần thiết
      {
        $project: {
          IdObject: 0,
          fromCompany: 0,
        },
      },
    ]);
    res.json({
      status: 200,
      message: "Thanh cong",
      data: recordArr,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `Thất bại : ${e}`,
    });
  }
};

// Lấy danh sách các job
module.exports.getAllJobs = async (req, res) => {
  try {
    const find = {
      ...req.query,
      deleted: false,
    };
    if (req.query.name) {
      find.name = { $regex: req.query.name, $options: "i" };
    }
    const sort = {
      createdAt: 1,
    };
    //Lọc lương từ khoảng min => max (CÒn lỗi fix sau)
    

    const recordArr = await Job.aggregate([
      {
        $match: find,
      },
      {
        $sort : sort
      },
      {
        $addFields: { IdObject: { $toObjectId: "$idCompany" } },
      },
      {
        $lookup: {
          from: "companies",
          localField: "IdObject",
          foreignField: "_id",
          as: "fromCompany",
        },
      },
      // Chuyển fromCompany thành phần từ
      {
        $unwind: {
          path: "$fromCompany",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Thêm 2 trường
      {
        $addFields: {
          nameCompany: "$fromCompany.name",
          logoCompany: "$fromCompany.logo",
        },
      },
      // Ẩn đi các trường không cần thiết
      {
        $project: {
          IdObject: 0,
          fromCompany: 0,
        },
      },
    ]);
    res.json({
      status: 200,
      message: "Thanh cong",
      data: recordArr,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `Thất bại : ${e}`,
    });
  }
};
// Tạo job mới theo công ty.
module.exports.createJoByCompany = async (req, res) => {
  try {
    const idCompany = req.params.idCompany;

    // kiểm tra xem công ty có tồn tại hay không
    await Company.findOne({ _id: idCompany });

    req.body.idCompany = idCompany;
    const job = new Job(req.body);
    await job.save();
    res.json({
      status: 200,
      message: "Create job successful",
      data: req.body,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `failed : ${e}`,
    });
  }
};
// xoa job
module.exports.deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Job.deleteOne({ _id: id });
    res.json({
      status: 200,
      message: result.deletedCount,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `failed : ${e}`,
    });
  }
};
// Cật nhật thông tin job
module.exports.updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body) {
      res.status(400).json({
        status: 400,
        message: "Thất bại không có body",
      });
      return;
    }
    const data = await Job.updateOne({ _id: id }, { $set: req.body });
    if (data.modifiedCount === 0){
      res.status.json({
        status : 400,
        message : "update failed"
      })
      return ;
    }
    res.json({
      status: 200,
      message: "update successful",
      data: req.body,
    });
  } catch {
    res.status(500).json({
      status: 500,
      message: "update failed",
    });
  }
};
// Xem chi tiết job
module.exports.detailJob = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Job.findOne({_id : id});
    res.json({
      status: 200,
      message: "successful",
      data: record,
    });
  } catch(e) {
    res.status(500).json({
      status: 500,
      message: `failed ${e}`,
    });
  }
};