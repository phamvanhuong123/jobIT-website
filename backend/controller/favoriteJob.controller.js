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
    }

    const jobIds = await FavoriteJob.find({ idCandidate: idCandidate })
    const ids = jobIds.map((item)=>{
        return item.idJob
    })
    const record = await Job.find({ _id: { $in: ids } });


    
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
      return res.status(400).json({
        status: 400,
        message: "IdCandidate hoặc IdJob không hợp lệ",
      });
    }

    //Kiểm tra xem idCandidate và idJob có tồn tại hayy không
    const existCandidate = await Candidate.findOne({ _id: idCandidate });
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
