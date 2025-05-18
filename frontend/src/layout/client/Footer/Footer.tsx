  const linkStyle = { color: "inherit", textDecoration: "none" };

function Footer(){
    return <>
      <footer
        style={{ backgroundColor: "#111", color: "white", padding: "40px 0" }}
      >
        <div style={{ maxWidth: "1400px", margin: "auto", padding: "0 40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            {/* Về ITviec */}
            <div>
              <h4 style={{ color: "white" }}>Về ITviec</h4>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li>
                  <a href="#" style={linkStyle}>
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Về ITviec.com
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Dịch vụ gợi ý ứng viên
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Việc làm IT
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Câu hỏi thường gặp
                  </a>
                </li>
              </ul>
            </div>

            {/* Chương trình */}
            <div>
              <h4 style={{ color: "white" }}>Chương trình</h4>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li>
                  <a href="#" style={linkStyle}>
                    Chuyện IT
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Cuộc thi viết
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Việc làm IT nổi bật
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Khảo sát thường niên
                  </a>
                </li>
              </ul>
            </div>

            {/* Điều Khoản chung */}
            <div>
              <h4 style={{ color: "white" }}>Điều khoản chung</h4>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li>
                  <a href="#" style={linkStyle}>
                    Quy định bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Quy chế hoạt động
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Giải quyết khiếu nại
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Thỏa thuận sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" style={linkStyle}>
                    Thông cáo báo chí
                  </a>
                </li>
              </ul>
            </div>

            {/* Liên hệ */}
            <div>
              <h4 style={{ color: "white" }}>
                Liên hệ để đăng tin tuyển dụng tại:
              </h4>
              <p>
                📞{" "}
                <a href="#" style={linkStyle}>
                  Hồ Chí Minh: (+84) 977 460 519
                </a>
              </p>
              <p>
                📞{" "}
                <a href="#" style={linkStyle}>
                  Hà Nội: (+84) 983 131 351
                </a>
              </p>
              <p>
                📧{" "}
                <a href="mailto:love@itviec.com" style={linkStyle}>
                  Email: love@itviec.com
                </a>
              </p>
              <p>
                📨{" "}
                <a href="#" style={linkStyle}>
                  Gửi thông tin liên hệ
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
}
export default Footer