const Candidate = require("../model/candicate.model");

// Danh sách ứng cử viên
module.exports.getAllCandidate = async (req, res) => {
  try {
    const record = await Candidate.find();
    res.json({
      status: 200,
      message: "Successful",
      data: record,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `failed : ${e}`,
    });
  }
};
// Chi tiết
module.exports.detail = async (req, res) => {
  try {
    const idAccount = req.params.idAccount;
    const exsistCandidate = await Candidate.findOne({ idAccount: idAccount });
    if (!exsistCandidate) {
      res.status(400).json({
        status: 400,
        message: "Không tìm thấy",
      });
      return;
    }
    const record = await Candidate.aggregate([
      {
        $match : {idAccount : idAccount}
      },
      {
        $addFields : {
          idObject : {$toObjectId : '$idAccount'}
        }
      },
      {   
        $lookup : {
          from : 'accounts',
          localField : 'idObject',
          foreignField : '_id',
          as :  'account'
        }
      },
      {
        $unwind : {
          path : '$account',
          preserveNullAndEmptyArrays : true
        }
      },
      {
        $addFields : {
          email : '$account.email'
        }
      },
      {
        $project : {
          "account" : 0,
          "idObject" : 0
        }
      }
    ])
    
    res.json({
      status: 200,
      message: "Successful",
      data: record[0],
      
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `failed : ${e}`,
    });
  }
};
// Cật nhật
module.exports.update = async (req, res) => {
  try {
    const idAccount = req.params.idAccount;
    if (!req.body) {
      res.status(400).json({
        status: 400,
        message: "Thất bại không có body",
      });
      return;
    }

    await Candidate.updateOne({ idAccount: idAccount }, req.body);

    res.json({
      status: 200,
      message: "update Successfull",
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: `failed : ${e}`,
    });
  }
};
