import { useState } from "react";
import { Badge, Image, Rate } from "antd";
import CompanyIntro from "./CompanyIntro";
import CompanyReviews from "./CompanyReviews";
import CompanyPosts from "./CompanyPosts";
import CompanyJobList from "./CompanyJobList";
import "./CompanyPage.css";

const CompanyPage = () => {
  const [activeTab, setActiveTab] = useState("intro");

  const renderTabContent = () => {
    switch (activeTab) {
      case "intro":
        return <CompanyIntro />;
      case "reviews":
        return <CompanyReviews />;
      case "posts":
        return <CompanyPosts />;
      default:
        return null;
    }
  };

  return (
    <div className="company-layout">
      {/* LEFT: Thông tin công ty + tabs + nội dung */}
      {/* --- Company Info Card --- */}
      <div className="company-card-header">
        <div className="company-card-content">
          <div className="left-section">
            <Image
              src="https://itviec.com/employers/nexon-dev-vina/logo_sZkJptTRKkD1cCS9eSU6h5ku"
              alt="NEXON DEV VINA"
              width={80}
              preview={false}
            />
            <div className="info-section">
              <p className="company-name-info">NEXON DEV VINA</p>
              <p className="company-location">📍 Quận 7, TP Hồ Chí Minh</p>
              <a href="#" className="job-link">6 việc làm đang tuyển dụng</a>
              <div className="action-buttons">
                <button className="review-button" onClick={() => alert("Mở form viết đánh giá")}>
                  Viết đánh giá
                </button>
                <button className="follow-button" onClick={() => alert("Bạn đã theo dõi công ty này!")}>
                  Theo dõi
                </button>
              </div>
            </div>
          </div>
          <div className="right-section">
            <div className="rating-box">
              <div className="rating-content">
                <div className="rating-score">
                  4.2
                  <Rate disabled defaultValue={4} className="rating-stars" />
                </div>
                <div className="rating-detail">16 đánh giá</div>
              </div>

              <div className="recommend-rate">
                <span className="recommend-percent">93%</span> Khuyến khích làm việc tại đây
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="company-card-container">
        <div className="left-content">
          {/* --- Tabs Card --- */}
          <div className="company-tabs-card">
            <div
              className={`company-tab ${activeTab === "intro" ? "active" : ""}`}
              onClick={() => setActiveTab("intro")}
            >
              Giới thiệu
            </div>
            <div
              className={`company-tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Đánh giá <Badge count={16} style={{ marginLeft: 6 }} />
            </div>
            <div
              className={`company-tab ${activeTab === "posts" ? "active" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              Bài viết
            </div>
          </div>

          {/* --- Tab Content --- */}
          <div className="tab-content">{renderTabContent()}</div>
        </div>
        {/* RIGHT: Danh sách việc làm */}
        <div className="right-content">
          <CompanyJobList />
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
