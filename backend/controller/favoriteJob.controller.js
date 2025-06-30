const Candidate = require("../model/candicate.model");
const FavoriteJob = require("../model/favoriteJob.model");
const Job = require("../model/job.model");
const mongoose = require("mongoose");

module.exports.getAllFavoriteJobsByIdCandidate = async (req, res) => {
  try {
    const idCandidate = req.params.idCandidate;

    if (!idCandidate || !mongoose.Types.ObjectId.isValid(idCandidate)) {
      res.status(400).json({
        status: 400,
        message: "Không có idCandidate hoặc ID không hợp lệ",
      });
      return;
    }

    // const jobIds = await FavoriteJob.find({ idCandidate: idCandidate }).sort({
    //   idJob: "desc",
    // });
    // const ids = jobIds.map((item) => item.idJob);
    // const record = await Job.find({ _id: { $in: ids } });
    const record = await FavoriteJob.aggregate([
      {
        $match: { idCandidate: new mongoose.Types.ObjectId(idCandidate) },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "idJob",
          foreignField: "_id",
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
        $addFields: {
          "job.ObjectIdCompany": { $toObjectId: "$job.idCompany" },
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "job.ObjectIdCompany",
          foreignField: "_id",
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
        $project: {
          idCandidate: 1,
          idJob: 1,
          createdAt: 1,
          updatedAt: 1,
          "job.idCompany": 1,
          "job.name": 1,
          "job.logo": 1,
          "job.locations": 1,
          "job.workplace": 1,
          "job.salary": 1,
          "job.createdAt": 1,
          "job.updatedAt": 1,
          "company.name": 1,
          "company.logo": 1,
        },
      },
    ]);

    res.json({
      status: 200,
      message: "Successful",
      data: record,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: `Lỗi ${e}`,
    });
  }
};

// THeem cong viec yeeu thich
module.exports.addFavoriteJob = async (req, res) => {
  try {
    const { idCandidate, idJob } = req.body;

    // Kiểm tra ObjectId có hợp lệ hay không
    if (
      !mongoose.Types.ObjectId.isValid(idCandidate) ||
      !mongoose.Types.ObjectId.isValid(idJob)
    ) {
      res.status(400).json({
        status: 400,
        message: "IdCandidate hoặc IdJob không hợp lệ",
      });
      return;
    }

    //Kiểm tra xem idCandidate và idJob có tồn tại hayy không
    const existCandidate = await Candidate.findOne({ idAccount: idCandidate });
    const existJob = await Job.findOne({ _id: idJob });
    if (!existCandidate || !existJob) {
      res.status(400).json({
        status: 400,
        message: "Lỗi IdCandidate hoặc IdJob không tồn tại",
      });
      return;
    }

    // Nếu job đã có trong danh sách yêu thích thì không thêm
    const exsistJobFavorite = await FavoriteJob.findOne({ idJob: idJob });
    if (exsistJobFavorite) {
      res.status(400).json({
        status: 400,
        message: "Bạn đã thêm công việc này vào danh sách yêu thích",
      });
      return;
    }

    // Thêm danh sách job yêu thích
    const newFavoriteJob = new FavoriteJob({
      idCandidate: idCandidate,
      idJob: idJob,
    });
    await newFavoriteJob.save();
    res.json({
      status: 200,
      message: "Successful",
      data: newFavoriteJob,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Lỗi ${error}`,
    });
  }
};

// Xoá công việc yêu thích
module.exports.deleteFavoriteJob = async (req, res) => {
  try {
    const { id } = req.params;
    // Kiểm tra ObjectId có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        status: 400,
        message: "Id không hợp lệ",
      });
      return;
    }
    // Xoá bản ghi
    const count = await FavoriteJob.deleteOne({
      _id : id
    });
    if (count.deletedCount == 0) {
      res.status(400).json({
        status: 400,
        message: "Thất bại bại không tìm thấy bản ghi",
      });
      return;
    }
    res.json({
      status: 200,
      message: "Successful",
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: `Lỗi ${e}`,
    });
  }
};
