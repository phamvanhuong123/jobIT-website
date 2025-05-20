import HeaderSection from "./HeaderSection/HeaderSection";
import JobInfoSection from "./JobInfoSection/JobInfoSection";
import CompanyInfoCard from "./CompanyInfoCard/CompanyInfoCard";
function DetailJob() {
 

  const jobData = {
    title: "Project Manager (Agile, Japanese)",
    company: {
      name: "NAL Việt Nam",
      rating: 4.5,
      logo: "https://itviec.com/assets/nal-logo.png",
      locations: [
        "Tầng 4, Toà Novo, Kosmo Tây Hồ, số 161 Xuân La, Xuân Tảo, Quận Bắc Từ Liêm, Hà Nội",
        "Toà NAL Building, số 6 ngõ 87 Thiên Hiền, Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội",
      ],
      workingTime: "Linh hoạt",
      posted: "Đăng 3 ngày trước",
      skills: ["Project Manager", "Japanese", "Agile"],
      type: "Thuê ngoài",
      field: "Thuê Ngoài Phát Triển Phần Mềm",
      size: "151-300 nhân viên",
      country: "Japan",
      workTime: "Thứ 2 - Thứ 6",
      ot: "Không có OT",
    },
    reasons: [
      "100% nhân viên được cấp máy Mac để làm việc.",
      "Review lương 6 tháng/lần. Thưởng dự án 2 lần/năm.",
      "Remote working 30% thời gian làm việc.",
    ],
    jobDescription: [
      "Phụ trách giao tiếp, quản lý các công việc liên quan tới Khách hàng nhằm tối ưu giá trị của team sản xuất và mang lại giá trị cho khách hàng thông qua việc:",
      "Tiếp nhận yêu cầu từ khách hàng và chuyển lại team sản xuất.",
      "Mô tả đúng, rõ ràng các hạng mục sản phẩm đủ để nhóm dự án hiểu yêu cầu thông qua việc giao tiếp với khách hàng, làm cầu nối giao tiếp giữa khách hàng và team sản xuất.",
      "Tư vấn cho khách hàng về tính năng sản phẩm, giải pháp thực hiện để tối ưu giá trị mang lại từ sản phẩm.",
      "Cùng khách đặt ưu tiên công việc, lên kế hoạch release sản phẩm.",
      "Nghiệm thu sản phẩm nhận bàn giao từ team và chuyển giao tới khách hàng.",
      "Lập kế hoạch tổng quan cho toàn dự án hướng tới mục đích release sản phẩm.",
      "Quản lý backlog.",
      "Định nghĩa từng hạng mục trong backlog.",
      "Đánh giá và sắp xếp độ ưu tiên cho các hạng mục trong backlog để đảm bảo cho kế hoạch tổng quan, thỏa mãn yêu cầu từ khách hàng.",
      "Đảm bảo team phát triển hiểu rõ về từng hạng mục trong backlog.",
      "Chỉ thị cho team phát triển về các hạng mục mục tiêu cho từng sprint.",
      "Quản lý vận hành đội dự án:",
      "Tham gia vào các event dự án hoạt động theo quy trình phát triển phần mềm Agile/scrum bao gồm: daily, sprint planning, sprint review, sprint retrospective.",
      "Cung cấp, cập nhật thông tin cần thiết (về khách hàng, sản phẩm, kế hoạch...) cho các quyết định của team dự án.",
      "Tham gia cùng kiểm soát về rủi ro, tiến độ chung.",
      "Tham gia vào review sản phẩm, đưa ra feedback về sản phẩm cho team dự án.",
      "Đưa ra các ý kiến đóng góp để cải tiến cho team dự án về cách vận hành team.",
      "Trong những trường hợp cần thiết có thể đưa ra các đề xuất điều chỉnh nguồn lực để đảm bảo mục tiêu cao nhất của dự án.",
    ],
    requirements: {
      degree: [
        "Tốt nghiệp ĐH ngành Công nghệ thông tin, QTKD hoặc các ngành tương đương;",
        "Tiếng Nhật trình độ từ N2, N1: thành thạo 4 kỹ năng nghe, nói, đọc, viết.",
        "Có kiến thức cơ bản về CNTT, phân tích nghiệp vụ và quản lý dự án.",
        "Có ít nhất 5 năm kinh nghiệm ở vị trí IT comtor hoặc 2 năm kinh nghiệm ở vị trí BrSE/ PM tiếng Nhật.",
      ],
      softSkills: [
        "Năng động, giao tiếp tốt, khả năng làm việc đội nhóm.",
        "Kỹ năng đàm phán, thuyết phục, truyền cảm hứng.",
        "Khả năng lập kế hoạch, quản lý rủi ro và phân chia công việc cho bộ phận.",
        "Kinh nghiệm lãnh đạo, khả năng đào tạo, huấn luyện nhân viên cấp dưới.",
        "Khả năng ra quyết định, giải quyết vấn đề.",
      ],
      technicalSkills: [
        "Tư duy logic, linh hoạt, khả năng phản biện và chú ý đến chi tiết.",
        "Khả năng thu thập và phân tích dữ liệu tốt.",
        "Kỹ năng quản lý thời gian, lập kế hoạch, soạn thảo tài liệu tốt.",
        "Kỹ năng giao tiếp tốt và làm việc nhóm.",
        "Có khả năng tự nghiên cứu tài liệu, sáng tạo hoặc tự học các công nghệ/ công cụ mới.",
        "Cởi mở, lắng nghe và sẵn sàng tiếp thu/tiếp nhận những cái mới.",
        "Cam kết, có trách nhiệm, luôn học hỏi những kiến thức mới.",
        "Mục tiêu, định hướng công việc rõ ràng.",
      ],
      advantages: [
        "Có kinh nghiệm về testing hoặc đã từng làm việc với các Agile framework",
        "Có kinh nghiệm sử dụng một trong các ngôn ngữ lập trình PHP, Java, Javascript...",
        "Có kinh nghiệm học hoặc làm việc tại Nhật là lợi thế.",
        "Sử dụng thành thạo các công cụ quản lý dự án (Jira, Redmine, Gitlab, Backlog...) là lợi thế.",
        "Có hiểu biết và yêu thích làm việc trong môi trường Agile/Scrum.",
      ],
    },
    reasonsToLove: {
      development: [
        "Được đào tạo các kỹ năng về quản lý dự án, quản lý con người và định hướng phát triển lên vị trí TTO (Tiểu Thương Owner, tương đương Division Manager), quản lý team 7-20 member.",
        "Được làm việc theo quy trình rõ ràng, bài bản, có tổ chức theo Agile/Scrum và các tiêu chuẩn Quốc tế về chất lượng, an ninh thông tin.",
        "Được làm việc trực tiếp với TTO; cơ hội làm việc với kỹ sư người Nhật tại văn phòng công ty.",
        "Có cơ hội onsite ngắn hạn, dài hạn tại Nhật Bản.",
        "Làm việc trong môi trường trẻ trung, hướng tới đào tạo và phát triển con người.",
      ],
      workingTime: [
        "Thời gian làm việc linh hoạt, bắt đầu từ 7h - 9h, nghỉ trưa 1h (12h-13h), kết thúc công việc trong 8 tiếng làm việc.",
        "Chế độ làm việc remote mỗi tháng tối đa 30% thời gian làm việc.",
        "Nghỉ phép có lương 12 ngày/năm theo Luật Lao Động và lịch nghỉ chung của Nhà Nước.",
        "Cộng thêm 1 ngày nghỉ sinh nhật công ty.",
        "Dành cho nhân viên nữ: Cộng thêm 6 ngày phép/năm, chia đều cho 12 tháng để phục hồi sức khoẻ.",
      ],
      salaryBonus: [
        "Review kết quả công việc và lương 2 lần/năm vào tháng 3 và tháng 9.",
        "Thưởng team dự án, thưởng trách nhiệm 2 lần/năm vào tháng 3 và tháng 9 theo quy định của Công ty.",
        "Thưởng lễ tết.",
        "Thưởng cuối năm theo năng lực và hiệu suất công việc.",
      ],
      training: [
        "Được hỗ trợ 75% - 100% chi phí học, thi lấy chứng chỉ CNTT Quốc tế về Quản trị dự án, Agile/Scrum (PSM, PSPO, PMI, AWS, ISTQB,...) và các kiến thức khác nâng cao năng lực nhân sự.",
        "Được tham gia các lớp đào tạo nội bộ về kỹ năng mềm, kỹ năng chuyên môn liên quan tới các nghiệp vụ: quản trị dự án, phân tích nghiệp vụ và các kỹ năng khác cần thiết trong công việc…các hoạt động đào tạo được thiết kế nhằm nâng cao năng lực nhân sự, hỗ trợ công việc đạt hiệu quả tốt hơn.",
        "Có đánh giá khung năng lực và lộ trình phát triển nghề nghiệp.",
      ],
      welfare: [
        "Trợ cấp onsite.",
        "Quà sinh nhật.",
        "Team building hàng quý.",
        "Khám sức khỏe hàng năm.",
        "Chế độ thăm hỏi với các dịp cưới hỏi, sinh con, ốm bệnh.",
        "Thưởng thâm niên sau mỗi 5 năm làm việc.",
      ],
    },
    images: [
      "https://itviec.com/photo1.jpg",
      "https://itviec.com/photo2.jpg",
      "https://itviec.com/photo3.jpg",
    ],
    similarJobs: [
      {
        title: "Project Manager (Japanese N2) | Up to $3000",
        company: "Hybrid Technologies",
        posted: "Đăng 10 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "Japanese", "Agile"],
      },
      {
        title: "IT Release / Project Manager (English, Agile)",
        company: "CyberQuote Pte Ltd",
        posted: "Đăng 4 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "English", "Agile"],
      },
      {
        title: "Agile Project Manager (Scrum/Kanban)",
        company: "Bolt Tech",
        logo: "https://your-image-url.com/bolt-tech-logo.png",
        posted: "Đăng 12 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "Agile", "Scrum"],
        isHot: true,
      },
      {
        title: "Business Analyst (Project Manager, Agile)",
        company: "MB Bank",
        logo: "https://your-image-url.com/mb-logo.png",
        posted: "Đăng 26 ngày trước",
        location: "Hà Nội",
        skills: ["Business Analyst", "Agile", "Project Manager"],
      },
      {
        title: "Project Manager (Agile/Scrum)",
        company: "Công Ty Cổ Phần Thương Mại Dược Vương",
        logo: "https://your-image-url.com/duoc-vuong-logo.png",
        posted: "Đăng 30 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "Agile", "Scrum"],
      },
      {
        title: "BrSE/ Project Leader (Japanese speaking)",
        company: "Panasonic Vietnam Group – PRDCV",
        logo: "https://your-image-url.com/panasonic-logo.png",
        posted: "Đăng 5 ngày trước",
        location: "Hà Nội",
        skills: ["Bridge Engineer", "Japanese", "Project Manager"],
        isHot: true,
      },
      {
        title: "VTS - Chuyên Viên Quản Trị Dự Án (Agile/Azure)",
        company: "Viettel Group",
        logo: "https://your-image-url.com/viettel-logo.png",
        posted: "Đăng 10 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "Agile", "Azure"],
      },
      {
        title: "Project Manager (English) | Up to $3000",
        company: "Hybrid Technologies",
        logo: "https://your-image-url.com/hybrid-logo.png",
        posted: "Đăng 21 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "English", "Agile"],
      },
    ],
  };


  return (
    <main style={{ paddingTop: "80px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "40px",
          maxWidth: "1200px",
          margin: "auto",
          padding: "20px",
        }}
      >
        {/* CỘT TRÁI */}
        <div style={{ flex: 2 }}>
          <HeaderSection
            title={jobData.title}
            companyName={jobData.company.name}
          />

          <JobInfoSection jobData={jobData} />
        </div>

        {/* CỘT PHẢI */}
        <CompanyInfoCard company={jobData.company} />
      </div>
    </main>
  );
}

export default DetailJob;