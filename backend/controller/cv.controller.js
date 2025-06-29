const Candidate = require("../model/candicate.model");
const Cv = require("../model/cv.model");
const Job = require("../model/job.model");

// Lấy danh sách cv theo người dùng
module.exports.getAllCvByUserId = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const record = await Cv.aggregate([
      {
        $match: { idUser: idUser },
      },
      {
        $addFields: { IdJobObject: { $toObjectId: "$idJob" } },
      },

      {
        $lookup: {
          from: "jobs",
          foreignField: "_id",
          localField: "IdJobObject",
          as: "job",
        },
      },
      {
        $unwind: {
          path: "$job",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: { IdCompanyObject: { $toObjectId: "$job.idCompany" } },
      },
      {
        $lookup: {
          from: "companies",
          foreignField: "_id",
          localField: "IdCompanyObject",
          as: "company",
        },
      },
      {
        $unwind: {
          path: "$company",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields : {
            jobName : "$job.name",
            jobSalary  : "$job.salary",
            companyName : "$company.name"
        }
      },
      {
        $project: {
          _id: 1,
          idUser: 1,
          idJob: 1,
          fullName: 1,
          phone: 1,
          locations: 1,
          cvUrl: 1,
          jobName : 1,
          companyName : 1,
          status : 1,
          jobSalary : 1,
          createdAt : 1.
          
        },
      },
    ]);
    res.json({
      status: 200,
      message: "Succesfull",
      data: record,
    });
  } catch (e) {
    res.json({
      status: 500,
      message: `Lỗi ${e}`,
    });
  }
};

// Thêm mới cv
module.exports.addCv = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const idJob = req.params.idJob;

    const existUser = await Candidate.findOne({ idAccount: idUser });
    const existJob = await Job.findOne({ _id: idJob });

    if (!existJob || !existUser) {
      res.status(400).json({
        status: 400,
        message: "Công việc hoặc người không tồn tại",
      });
      return;
    }
    const newCv = new Cv({
      status: "pending",
      idUser: idUser,
      idJob: idJob,
      ...req.body,
    });
    const response = await newCv.save();
    res.json({
      status: 200,
      message: "Successfull",
      data: response,
    });
  } catch (e) {
    res.json({
      status: 500,
      message: `Lỗi ${e}`,
    });
  }
};
