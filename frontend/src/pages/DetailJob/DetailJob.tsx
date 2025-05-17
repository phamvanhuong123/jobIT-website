import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";



 function DetailJob() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showSubmenuLevel, setShowSubmenuLevel] = useState(false);
  const [showSubmenuCompany, setShowSubmenuCompany] = useState(false);
  const [showSubmenuCity, setShowSubmenuCity] = useState(false);
  const [showSubmenuBestCompany, setShowSubmenuBestCompany] = useState(false);
  const [showSubmenuBlogSalary, setShowSubmenuBlogSalary] = useState(false);
  const [showSalaryReports, setShowSalaryReports] = useState(false);
  const [showTopITList, setShowTopITList] = useState(false);

  const jobData = {
    
    title: "Project Manager (Agile, Japanese)",
    company: {
      name: "NAL Việt Nam",
      rating: 4.5,
      logo: "https://itviec.com/assets/nal-logo.png",
      locations: [
        "Tầng 4, Toà Novo, Kosmo Tây Hồ, số 161 Xuân La, Xuân Tảo, Quận Bắc Từ Liêm, Hà Nội",
        "Toà NAL Building, số 6 ngõ 87 Thiên Hiền, Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội"
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
      "Remote working 30% thời gian làm việc."
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
      "Trong những trường hợp cần thiết có thể đưa ra các đề xuất điều chỉnh nguồn lực để đảm bảo mục tiêu cao nhất của dự án."
    ],
    requirements: {
      degree: [
        "Tốt nghiệp ĐH ngành Công nghệ thông tin, QTKD hoặc các ngành tương đương;",
        "Tiếng Nhật trình độ từ N2, N1: thành thạo 4 kỹ năng nghe, nói, đọc, viết.",
        "Có kiến thức cơ bản về CNTT, phân tích nghiệp vụ và quản lý dự án.",
        "Có ít nhất 5 năm kinh nghiệm ở vị trí IT comtor hoặc 2 năm kinh nghiệm ở vị trí BrSE/ PM tiếng Nhật."
      ],
      softSkills: [
        "Năng động, giao tiếp tốt, khả năng làm việc đội nhóm.",
        "Kỹ năng đàm phán, thuyết phục, truyền cảm hứng.",
        "Khả năng lập kế hoạch, quản lý rủi ro và phân chia công việc cho bộ phận.",
        "Kinh nghiệm lãnh đạo, khả năng đào tạo, huấn luyện nhân viên cấp dưới.",
        "Khả năng ra quyết định, giải quyết vấn đề."
      ],
      technicalSkills: [
        "Tư duy logic, linh hoạt, khả năng phản biện và chú ý đến chi tiết.",
        "Khả năng thu thập và phân tích dữ liệu tốt.",
        "Kỹ năng quản lý thời gian, lập kế hoạch, soạn thảo tài liệu tốt.",
        "Kỹ năng giao tiếp tốt và làm việc nhóm.",
        "Có khả năng tự nghiên cứu tài liệu, sáng tạo hoặc tự học các công nghệ/ công cụ mới.",
        "Cởi mở, lắng nghe và sẵn sàng tiếp thu/tiếp nhận những cái mới.",
        "Cam kết, có trách nhiệm, luôn học hỏi những kiến thức mới.",
        "Mục tiêu, định hướng công việc rõ ràng."
      ],
      advantages: [
        "Có kinh nghiệm về testing hoặc đã từng làm việc với các Agile framework",
        "Có kinh nghiệm sử dụng một trong các ngôn ngữ lập trình PHP, Java, Javascript...",
        "Có kinh nghiệm học hoặc làm việc tại Nhật là lợi thế.",
        "Sử dụng thành thạo các công cụ quản lý dự án (Jira, Redmine, Gitlab, Backlog...) là lợi thế.",
        "Có hiểu biết và yêu thích làm việc trong môi trường Agile/Scrum."
      ]
    },
    reasonsToLove: {
      development: [
        "Được đào tạo các kỹ năng về quản lý dự án, quản lý con người và định hướng phát triển lên vị trí TTO (Tiểu Thương Owner, tương đương Division Manager), quản lý team 7-20 member.",
        "Được làm việc theo quy trình rõ ràng, bài bản, có tổ chức theo Agile/Scrum và các tiêu chuẩn Quốc tế về chất lượng, an ninh thông tin.",
        "Được làm việc trực tiếp với TTO; cơ hội làm việc với kỹ sư người Nhật tại văn phòng công ty.",
        "Có cơ hội onsite ngắn hạn, dài hạn tại Nhật Bản.",
        "Làm việc trong môi trường trẻ trung, hướng tới đào tạo và phát triển con người."
      ],
      workingTime: [
        "Thời gian làm việc linh hoạt, bắt đầu từ 7h - 9h, nghỉ trưa 1h (12h-13h), kết thúc công việc trong 8 tiếng làm việc.",
        "Chế độ làm việc remote mỗi tháng tối đa 30% thời gian làm việc.",
        "Nghỉ phép có lương 12 ngày/năm theo Luật Lao Động và lịch nghỉ chung của Nhà Nước.",
        "Cộng thêm 1 ngày nghỉ sinh nhật công ty.",
        "Dành cho nhân viên nữ: Cộng thêm 6 ngày phép/năm, chia đều cho 12 tháng để phục hồi sức khoẻ."
      ],
      salaryBonus: [
        "Review kết quả công việc và lương 2 lần/năm vào tháng 3 và tháng 9.",
        "Thưởng team dự án, thưởng trách nhiệm 2 lần/năm vào tháng 3 và tháng 9 theo quy định của Công ty.",
        "Thưởng lễ tết.",
        "Thưởng cuối năm theo năng lực và hiệu suất công việc."
      ],
      training: [
        "Được hỗ trợ 75% - 100% chi phí học, thi lấy chứng chỉ CNTT Quốc tế về Quản trị dự án, Agile/Scrum (PSM, PSPO, PMI, AWS, ISTQB,...) và các kiến thức khác nâng cao năng lực nhân sự.",
        "Được tham gia các lớp đào tạo nội bộ về kỹ năng mềm, kỹ năng chuyên môn liên quan tới các nghiệp vụ: quản trị dự án, phân tích nghiệp vụ và các kỹ năng khác cần thiết trong công việc…các hoạt động đào tạo được thiết kế nhằm nâng cao năng lực nhân sự, hỗ trợ công việc đạt hiệu quả tốt hơn.",
        "Có đánh giá khung năng lực và lộ trình phát triển nghề nghiệp."
      ],
      welfare: [
        "Trợ cấp onsite.",
        "Quà sinh nhật.",
        "Team building hàng quý.",
        "Khám sức khỏe hàng năm.",
        "Chế độ thăm hỏi với các dịp cưới hỏi, sinh con, ốm bệnh.",
        "Thưởng thâm niên sau mỗi 5 năm làm việc."
      ]
    },
    images: [
      "https://itviec.com/photo1.jpg",
      "https://itviec.com/photo2.jpg",
      "https://itviec.com/photo3.jpg"
    ],
    similarJobs: [
      {
        title: "Project Manager (Japanese N2) | Up to $3000",
        company: "Hybrid Technologies",
        posted: "Đăng 10 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "Japanese", "Agile"]
      },
      {
        title: "IT Release / Project Manager (English, Agile)",
        company: "CyberQuote Pte Ltd",
        posted: "Đăng 4 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "English", "Agile"]
      },
      {
        title: "Agile Project Manager (Scrum/Kanban)",
        company: "Bolt Tech",
        logo: "https://your-image-url.com/bolt-tech-logo.png",
        posted: "Đăng 12 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "Agile", "Scrum"],
        isHot: true
      },
      {
        title: "Business Analyst (Project Manager, Agile)",
        company: "MB Bank",
        logo: "https://your-image-url.com/mb-logo.png",
        posted: "Đăng 26 ngày trước",
        location: "Hà Nội",
        skills: ["Business Analyst", "Agile", "Project Manager"]
      },
      {
        title: "Project Manager (Agile/Scrum)",
        company: "Công Ty Cổ Phần Thương Mại Dược Vương",
        logo: "https://your-image-url.com/duoc-vuong-logo.png",
        posted: "Đăng 30 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "Agile", "Scrum"]
      },
      {
        title: "BrSE/ Project Leader (Japanese speaking)",
        company: "Panasonic Vietnam Group – PRDCV",
        logo: "https://your-image-url.com/panasonic-logo.png",
        posted: "Đăng 5 ngày trước",
        location: "Hà Nội",
        skills: ["Bridge Engineer", "Japanese", "Project Manager"],
        isHot: true
      },
      {
        title: "VTS - Chuyên Viên Quản Trị Dự Án (Agile/Azure)",
        company: "Viettel Group",
        logo: "https://your-image-url.com/viettel-logo.png",
        posted: "Đăng 10 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "Agile", "Azure"]
      },
      {
        title: "Project Manager (English) | Up to $3000",
        company: "Hybrid Technologies",
        logo: "https://your-image-url.com/hybrid-logo.png",
        posted: "Đăng 21 ngày trước",
        location: "Hà Nội",
        skills: ["Project Manager", "English", "Agile"]
      }


    ]
  };


  const linkStyle = { color: 'inherit', textDecoration: 'none' };
  return (
    <>
    
      {/* HEADER */}
          <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#111',
        padding: '16px 40px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>

        <nav>
    {/* menu nav ở đây */}

        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      {/* Logo */}
      <img
        src="/logo-itviec.png"
        alt="Logo"
        style={{ height: '40px' }}
      />
   
            <nav style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => {
                setShowDropdown(false);
                setShowSubmenu(false);
              }}
            >
              <a href="#" style={{ ...linkStyle, color: 'white' }}>Việc Làm IT ▾</a>
              {showDropdown && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#111',
                  listStyle: 'none',
                  padding: '10px 0',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  zIndex: 1000
                }}>

                  {/* Kỹ năng */}
                  <li
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setShowSubmenu(true)}
                    onMouseLeave={() => setShowSubmenu(false)}
                  >
                    <a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px', display: 'block' }}>
                      Việc làm IT theo kỹ năng ▸
                    </a>
                    {showSubmenu && (
                      <ul style={{
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        backgroundColor: '#111',
                        listStyle: 'none',
                        padding: '10px',
                        margin: 0,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        minWidth: '300px',
                        whiteSpace: 'nowrap',
                        zIndex: 1001
                      }}>
                        {[
                          "Java", "PHP", "JavaScript", "HTML5", "Manager", "SQL", "Android", "iOS",
                          "MySQL", "Tester", "English", "Ruby", "Python", "Mobile Apps", "Ruby on Rails",
                          "QA QC", "Database", ".NET", "Business Analyst", "Linux", "Team Leader",
                          "NodeJS", "System Engineer", "Designer", "UI-UX", "Project Manager", "OOP",
                          "Oracle", "MVC", "ReactJS", "Embedded", "J2EE"
                        ].map(skill => (
                          <li key={skill}><a href="#" style={{ ...linkStyle, color: 'white' }}>{skill}</a></li>
                        ))}
                        <li style={{ width: '100%', marginTop: '10px' }}>
                         <a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px', display: 'block', backgroundColor: '#2b2b2b', textAlign: 'center' }}>
                            Xem tất cả &rsaquo;
                          </a>
                        </li>

                      </ul>
                    )}
                  </li>
                  
                  {/* Cấp bậc */}
                  <li
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setShowSubmenuLevel(true)}
                    onMouseLeave={() => setShowSubmenuLevel(false)}
                  >
                    <a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px', display: 'block' }}>Việc làm IT theo cấp bậc ▸</a>
                    {showSubmenuLevel && (
                      <ul style={{
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        backgroundColor: '#111',
                        listStyle: 'none',
                        padding: '10px',
                        margin: 0,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        minWidth: '700px',
                        whiteSpace: 'nowrap',
                        zIndex: 1001
                      }}>
                        {[
                          "Lập trình viên Java", "Lập trình viên PHP", "Lập trình viên JavaScript", "Lập trình viên HTML5",
                          "Lập trình viên SQL", "Lập trình viên Android", "Lập trình viên iOS", "Tester",
                          "Lập trình viên Ruby", "Lập trình viên Python", "Lập trình viên Ruby on Rails",
                          "Lập trình viên .NET", "Lập trình viên NodeJS", "Lập trình viên Linux", "Lập trình viên OOP",
                          "Lập trình viên Oracle", "Lập trình viên C++", "Lập trình viên Wordpress", "Nhân viên thiết kế",
                          "Quản trị cơ sở dữ liệu", "Lập trình viên ứng dụng di động", "Quản lý dự án",
                          "Quản lý sản phẩm", "Kỹ sư cầu nối"
                        ].map(role => (
                          <li key={role}><a href="#" style={{ ...linkStyle, color: 'white' }}>{role}</a></li>
                        ))}
                        <li style={{ gridColumn: '1 / -1' }}><a href="#" style={{ ...linkStyle, color: 'white', paddingTop: '10px', display: 'block', textAlign: 'center' }}>Xem tất cả ›</a></li>
                      </ul>
                    )}
                  </li>
                  
                  {/* Công ty */}
                  <li
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setShowSubmenuCompany(true)}
                    onMouseLeave={() => setShowSubmenuCompany(false)}
                  >
                    <a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px', display: 'block' }}>Việc làm IT theo công ty ▸</a>
                    {showSubmenuCompany && (
                      <ul style={{
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        backgroundColor: '#111',
                        listStyle: 'none',
                        padding: '10px',
                        margin: 0,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        minWidth: '700px',
                        whiteSpace: 'nowrap',
                        zIndex: 1001
                      }}>
                        {["MB Bank", "HDBank", "Bolt Tech", "TymeX", "ANDPAD VietNam Co., Ltd", "HRS Group",
                          "Crossian", "VNG Corporation", "Nakivo", "NAB Innovation Centre", "Techcombank", "eUp Group",
                          "Vietnam", "MONEY FORWARD", "Digital Unicorn", "Viettel Group", "VIETNAM CO.,LTD", "Topicus Vietnam",
                          "Trusting Social", "SkyLab", "VNGGames", "LG CNS Việt Nam", "Daoukiwoom Innovation", "Coder Trove",
                          "Capgemini Vietnam", "Live Payments"].map(company => (
                          <li key={company}><a href="#" style={{ ...linkStyle, color: 'white' }}>{company}</a></li>
                        ))}
                        <li style={{ gridColumn: '1 / -1' }}><a href="#" style={{ ...linkStyle, color: 'white', paddingTop: '10px', display: 'block', textAlign: 'center' }}>Xem tất cả ›</a></li>
                      </ul>
                    )}
                  </li>
                 
                 {/* Thành phố */}
                  <li
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setShowSubmenuCity(true)}
                    onMouseLeave={() => setShowSubmenuCity(false)}
                  >
                    <a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px', display: 'block' }}>Việc làm IT theo thành phố ▸</a>
                    {showSubmenuCity && (
                      <ul style={{
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        backgroundColor: '#111',
                        listStyle: 'none',
                        padding: '10px',
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        minWidth: '200px',
                        whiteSpace: 'nowrap',
                        zIndex: 1001
                      }}>
                        {["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Khác"].map(city => (
                          <li key={city}><a href="#" style={{ ...linkStyle, color: 'white' }}>{city}</a></li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </div>

            <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowSubmenuBestCompany(true)}
          onMouseLeave={() => setShowSubmenuBestCompany(false)}
        >

       {/* Top Công ty IT */}
      <a href="#" style={{ ...linkStyle, color: 'white' }}>Top Công ty IT ▾</a>
      {showSubmenuBestCompany && (
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: '#111',
            listStyle: 'none',
            padding: '10px 0',
            margin: 0,
            whiteSpace: 'nowrap',
            zIndex: 1000
          }}>

            <li
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setShowTopITList(true)}
                    onMouseLeave={() => setShowTopITList(false)}
                  >
                    <a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px', display: 'block' }}>
                      Công ty IT Tốt Nhất ▸
                    </a>
                    {showTopITList && (
                      <ul style={{
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        backgroundColor: '#111',
                        listStyle: 'none',
                        padding: '10px',
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        minWidth: '250px',
                        whiteSpace: 'nowrap',
                        zIndex: 1001
                      }}>
                        {[2025, 2024, 2023, 2022, 2021, 2020, 2019].map(year => (
                          <li key={year}><a href="#" style={{ ...linkStyle, color: 'white' }}>Công ty IT Tốt Nhất {year}</a></li>
                        ))}
                      </ul>
                    )}
                  </li>
            <li>
              <a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px', display: 'block' }}>Review Công Ty</a>
            </li>
          </ul>
        )}
      </div>

     {/* Blog Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowSubmenuBlogSalary(true)}
              onMouseLeave={() => {
                setShowSubmenuBlogSalary(false);
                setShowSalaryReports(false);
              }}
            >
              <a href="#" style={{ ...linkStyle, color: 'white' }}>Blog ▾</a>
              {showSubmenuBlogSalary && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  backgroundColor: '#111',
                  listStyle: 'none',
                  padding: '10px',
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '250px',
                  whiteSpace: 'nowrap',
                  zIndex: 1000
                }}>
                  <li
                    onMouseEnter={() => setShowSalaryReports(true)}
                    onMouseLeave={() => setShowSalaryReports(false)}
                    style={{ position: 'relative' }}
                  >
                    <a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px', display: 'block' }}>Báo Cáo Lương IT ▸</a>
                    {showSalaryReports && (
                      <ul style={{
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        backgroundColor: '#111',
                        listStyle: 'none',
                        padding: '10px',
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        whiteSpace: 'nowrap',
                        zIndex: 1001
                      }}>
                        {['Báo Cáo Lương IT 2024-2025', 'Báo Cáo Lương IT 2023-2024', 'Báo Cáo Lương IT 2022-2023'].map(year => (
                          <li key={year}><a href="#" style={{ ...linkStyle, color: 'white', padding: '6px 10px' }}>{year}</a></li>
                        ))}
                      </ul>
                    )}
                  </li>
                  <li><a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px' }}>Sự Nghiệp IT</a></li>
                  <li><a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px' }}>Ứng Tuyển & Thăng Tiến</a></li>
                  <li><a href="#" style={{ ...linkStyle, color: 'white', padding: '10px 20px' }}>Chuyên Môn IT</a></li>
                </ul>
              )}
            </div>
            
          </nav>
           </div>
             </nav>

      

        {/* Right */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/nha-tuyen-dung" style={{ ...linkStyle, color: 'white' }}>Nhà Tuyển Dụng</a>
          <a href="/dang-nhap" style={{ ...linkStyle, color: 'white' }}>Đăng Nhập/Đăng Ký</a>
          <select style={{ backgroundColor: '#111', color: 'white', border: 'none' }}>
            <option value="en">EN</option>
            <option value="vi">VI</option>
          </select>
        </div>
   </div>
      </header>

<main style={{ paddingTop: '80px' }}>
  {/* phần tiêu đề, nút ứng tuyển, chi tiết job v.v */}

      
          {/* BODY */}
      <div style={{
        display: 'flex',              // ✅ Đây là container chính để chia 2 cột
        alignItems: 'flex-start',
        gap: '40px',
        maxWidth: '1200px',
        margin: 'auto',
        padding: '20px'
      }}>

      {/* CỘT TRÁI */}
      <div style={{ flex: 2 }}>
        
        {/* Bọc toàn bộ tiêu đề + nút vào 1 ô có sticky */}
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 100,
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{jobData.title}</h1>
          <h2 style={{ fontSize: '18px', marginTop: '5px' }}>{jobData.company.name}</h2>

          <div style={{ margin: '10px 0', fontWeight: 'bold' }}>
            💰 <a href="#" style={{ textDecoration: 'underline', color: 'black' }}>Đăng nhập để xem mức lương</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '14px 20px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              flex: 1,                      // 👉 để nút chiếm toàn bộ chiều ngang còn lại
              fontSize: '16px'
            }}>
              Ứng tuyển
            </button>
            <span style={{ fontSize: '50px', color: 'red', cursor: 'pointer' }}>♡</span>
          </div>
        </div>

              {/* Khối bọc toàn bộ thông tin phụ */}
              <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          padding: '20px',
          marginBottom: '20px'
        }}>
                  {/* Hình ảnh công ty */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {jobData.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Company Image ${idx + 1}`}
                    width="200"
                    height="120"
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                ))}
              </div>

              {/* Địa điểm + thông tin chung */}
            <div style={{ marginBottom: '20px' }}>
                {jobData.company.locations.map((loc, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span>📍</span>
                    <span>{loc}</span>
                  </div>
                ))}

                {/* Canh lề dọc */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  <span>👥</span>
                  <span>{jobData.company.workingTime}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <span>⏰</span>
                  <span>{jobData.company.posted}</span>
                </div>
              </div>

              {/* Kỹ năng */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span><strong>Kỹ năng:</strong></span>
                {jobData.company.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '20px',
                      fontSize: '14px',
                      border: '1px solid #ccc'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>


    {/* Ô bọc toàn bộ nội dung mô tả công việc */}
  <div style={{
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
    padding: '30px',
    lineHeight: '1.7',
    fontSize: '16px',
    color: '#333',
    marginTop: '30px'
  }}>

      {/* THÔNG TIN CHI TIẾT CÔNG VIỆC - TỪ LÝ DO ĐẾN PHÚC LỢI */}
    <div style={{ marginBottom: '40px', lineHeight: '1.7' }}>
      {/* 3 Lý do */}
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', marginTop: '32px' }}>
        3 Lý do để gia nhập công ty
      </h2>
      <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
        {jobData.reasons.map((reason, idx) => (
          <li key={idx} style={{ listStyleType: '"●"', marginBottom: '8px' }}>{reason}</li>
        ))}
      </ul>

      <hr style={{ borderTop: '1px dashed #ccc', margin: '24px 0' }} />

      {/* Mô tả công việc */}
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Mô tả công việc</h2>
      <ul style={{ paddingLeft: '20px' }}>
        {jobData.jobDescription.map((desc, idx) => {
          const isBold =
            desc.startsWith("Phụ trách giao tiếp") ||
            desc.startsWith("Lập kế hoạch tổng quan") ||
            desc.startsWith("Quản lý backlog") ||
            desc.startsWith("Quản lý vận hành đội dự án");

          return (
            <li
              key={idx}
              style={{
                listStyleType: isBold ? '"●"' : '"○"',
                fontWeight: isBold ? '600' : 'normal',
                color: 'black',

                marginBottom: '6px',
                paddingLeft: isBold ? '0' : '12px'
              }}
            >
              {desc}
            </li>
          );
        })}
      </ul>

      <hr style={{ borderTop: '1px dashed #ccc', margin: '24px 0' }} />

      {/* Yêu cầu công việc */}
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Yêu cầu công việc</h2>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>
          (1) Bằng cấp, kinh nghiệm:
        </li>
        {jobData.requirements.degree.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"', color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>
          (2) Kỹ năng mềm:
        </li>
        {jobData.requirements.softSkills.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"', color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>
          Kỹ năng chuyên môn:
        </li>
        {jobData.requirements.technicalSkills.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"', color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>
          (3) Bạn có lợi thế khi:
        </li>
        {jobData.requirements.advantages.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"', color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
      </ul>

      <hr style={{ borderTop: '1px dashed #ccc', margin: '24px 0' }} />

      {/* Tại sao bạn sẽ yêu thích làm việc tại đây */}
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
        Tại sao bạn sẽ yêu thích làm việc tại đây
      </h2>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>Cơ hội phát triển:</li>
        {jobData.reasonsToLove.development.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"', color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>Thời gian làm việc, ngày phép, nghỉ phép:</li>
        {jobData.reasonsToLove.workingTime.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"', color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>Lương thưởng:</li>
        {jobData.reasonsToLove.salaryBonus.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"', color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>Đào tạo và phát triển:</li>
        {jobData.reasonsToLove.training.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"', color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
        <li style={{ fontWeight: '600', listStyleType: '"●"', marginBottom: '8px' }}>Chế độ phúc lợi khác:</li>
        {jobData.reasonsToLove.welfare.map((item, idx) => (
          <li key={idx} style={{ listStyleType: '"○"',color: 'black', paddingLeft: '12px', marginBottom: '6px' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
    </div>



    
          {/* Việc làm tương tự */}
        <div style={{ marginTop: '40px' }}>
          <h3>Việc làm tương tự dành cho bạn</h3>

          {/* Thông báo nhận việc tương tự */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fafafa',
            padding: '15px 20px',
            borderRadius: '10px',
            border: '1px solid #eee',
            margin: '20px 0'
          }}>
            <span>Nhận các việc làm tương tự qua email</span>
            <button style={{
              border: '1px solid red',
              color: 'red',
              background: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              🔔 Nhận thông báo
            </button>
          </div>

          {/* Danh sách việc làm tương tự */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {jobData.similarJobs.map((job, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  padding: '20px',
                  width: 'calc(50% - 10px)',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  position: 'relative'
                }}
              >
                <p style={{ color: '#999', fontSize: '14px' }}>{job.posted}</p>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>{job.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                  <img src={job.logo} alt="logo" style={{ width: '40px', height: '40px', borderRadius: '5px', marginRight: '10px' }} />
                  <span style={{ fontWeight: '500' }}>{job.company}</span>
                </div>
                <p style={{ margin: '8px 0' }}>💰 <a href="#" style={{ color: 'black', fontWeight: 'bold' }}>Đăng nhập để xem mức lương</a></p>
                <p style={{ margin: '4px 0' }}>🏢 Tại văn phòng</p>
                <p style={{ margin: '4px 0' }}>📍 {job.location}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                  {job.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '20px',
                        fontSize: '13px',
                        border: '1px solid #ccc'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Tag HOT nếu có */}
                {job.isHot && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'orange',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    HOT
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        </div>




 
              {/* CỘT PHẢI */}
  <div style={{
    position: 'sticky',           // ✅ Sticky khi cuộn
    top: '20px',                  // ✅ Cách đỉnh 20px
    alignSelf: 'flex-start',      // ✅ Đảm bảo bám vào đỉnh trong flex container
    maxHeight: 'calc(100vh - 40px)', // ✅ Không vượt quá màn hình
    overflow: 'auto',             // ✅ Cuộn nếu nội dung dài
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '400px',
    flex: 1
  }}>
  {/* Phần thông tin công ty giữ nguyên như bạn đang viết */}

        <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
         <img src="/logo-NAL.png" alt="Logo" style={{ width: '100px', marginBottom: '10px', borderRadius: '8px' }} />
          <h3>{jobData.company.name}</h3>
        
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFull = jobData.company.rating >= star;
              const isHalf = jobData.company.rating >= star - 0.5 && jobData.company.rating < star;
              return (
                <span key={star} style={{ color: '#f39c12', fontSize: '18px' }}>
                  {isFull ? <FaStar /> : isHalf ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>
            );
          })}
          <span style={{ fontWeight: '500' }}>{jobData.company.rating}</span>
        </div>


          <p style={{ fontStyle: 'italic', margin: '10px 0' }}>
            Đồng hành cùng {jobData.company.name} trên chặng đường phủ sóng bản đồ số thế giới!
          </p>

          {/* Bảng thông tin công ty */}
            
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', color: '#666' }}>
  <tbody>
    {[
      ['Mô hình công ty', jobData.company.type],
      ['Lĩnh vực công ty', jobData.company.field],
      ['Quy mô công ty', jobData.company.size],
      ['Quốc gia', jobData.company.country],
      ['Thời gian làm việc', jobData.company.workTime],
      ['Làm việc ngoài giờ', jobData.company.ot]
    ].map(([label, value], idx) => (
      <tr key={idx} style={{ borderBottom: '1px dashed #eee' }}>
        <td style={{
          padding: '10px 16px 10px 0',
          color: '#999',
          whiteSpace: 'nowrap',
          width: '160px', // ✅ Tăng độ rộng cột trái
          verticalAlign: 'top'
        }}>
          {label}
        </td>
        <td style={{
          padding: '10px 0',
          color: '#000',
          fontWeight: 500
        }}>
          {value}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
      
      </div>
      </div>

      </main>
    
  
  {/* FOOTER */}
    <footer style={{ backgroundColor: '#111', color: 'white', padding: '40px 0' }}>
      <div style={{ maxWidth: '1400px', margin: 'auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* Về ITviec */}
        <div>
          <h4 style={{ color: 'white' }}>Về ITviec</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><a href="#" style={linkStyle}>Trang Chủ</a></li>
            <li><a href="#" style={linkStyle}>Về ITviec.com</a></li>
            <li><a href="#" style={linkStyle}>Dịch vụ gợi ý ứng viên</a></li>
            <li><a href="#" style={linkStyle}>Liên hệ</a></li>
            <li><a href="#" style={linkStyle}>Việc làm IT</a></li>
            <li><a href="#" style={linkStyle}>Câu hỏi thường gặp</a></li>
          </ul>
        </div>

        {/* Chương trình */}
        <div>
          <h4 style={{ color: 'white' }}>Chương trình</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><a href="#" style={linkStyle}>Chuyện IT</a></li>
            <li><a href="#" style={linkStyle}>Cuộc thi viết</a></li>
            <li><a href="#" style={linkStyle}>Việc làm IT nổi bật</a></li>
            <li><a href="#" style={linkStyle}>Khảo sát thường niên</a></li>
          </ul>
        </div>

        {/* Điều Khoản chung */}
        <div>
          <h4 style={{ color: 'white' }}>Điều khoản chung</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><a href="#" style={linkStyle}>Quy định bảo mật</a></li>
            <li><a href="#" style={linkStyle}>Quy chế hoạt động</a></li>
            <li><a href="#" style={linkStyle}>Giải quyết khiếu nại</a></li>
            <li><a href="#" style={linkStyle}>Thỏa thuận sử dụng</a></li>
            <li><a href="#" style={linkStyle}>Thông cáo báo chí</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h4 style={{ color: 'white' }}>Liên hệ để đăng tin tuyển dụng tại:</h4>
          <p>📞 <a href="#" style={linkStyle}>Hồ Chí Minh: (+84) 977 460 519</a></p>
          <p>📞 <a href="#" style={linkStyle}>Hà Nội: (+84) 983 131 351</a></p>
          <p>📧 <a href="mailto:love@itviec.com" style={linkStyle}>Email: love@itviec.com</a></p>
          <p>📨 <a href="#" style={linkStyle}>Gửi thông tin liên hệ</a></p>
        </div>
        </div>
      </div>
    </footer>
       
   
  </>  
      
  );
}

export default DetailJob;