import { useEffect, useState } from "react";
import { Badge, Image, Rate } from "antd";
import { useParams } from "react-router-dom";

import CompanyIntro from "./CompanyIntro";
import CompanyReviews from "./CompanyReviews";
import CompanyPosts from "./CompanyPosts";
import CompanyJobList from "./CompanyJobList";

import { getAllCompany } from "../../services/company.axios";
import { getAllJob } from "../../services/job.axios";

import "./Company.css";
import { CompassOutlined, SolutionOutlined } from "@ant-design/icons";

type Job = {
  id: string;
  title: string;
  idCompany: string; // <-- thêm dòng này
  nameCompany?: string;
  company: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  tags: string[];
  posted: string;
  jobDescription: string[];
  rawData: IJob;
};


const CompanyPage = () => {
  const { idCompany } = useParams<{ idCompany: string }>();
  const [activeTab, setActiveTab] = useState("intro");

  const [company, setCompany] = useState<ICompany | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showMiniHeader, setShowMiniHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowMiniHeader(scrollTop > 150); // chỉ hiện khi cuộn > 150px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("🚀 [CompanyPage] idCompany param from URL:", idCompany);

        const resCompanies = await getAllCompany();
        const resJobs = await getAllJob();

        const companies = resCompanies?.data || [];
        const jobsList = resJobs?.data || [];

        const selectedCompany = companies.find(c => c._id === idCompany);
        setCompany(selectedCompany || null);

        const filteredJobs: Job[] = jobsList
          .filter((job: any) => job.idCompany === idCompany)
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((job: any) => ({
            id: job._id,
            title: job.name || "Không rõ",
            idCompany: job.idCompany?.toString() || "",
            nameCompany: job.nameCompany?.toString(),
            company: (job.nameCompany || job.idCompany || "Chưa có tên công ty").toString(),
            location: job.locations?.[0] || "Không rõ",
            salary: job.salary,
            tags: job.skills || [],
            posted: new Date(job.updatedAt).toLocaleDateString("vi-VN"),
            jobDescription: job.jobDescription || [],
            rawData: job,
          }));

        // console.log("📌 [CompanyPage] Filtered Jobs for this company:", filteredJobs);

        setJobs(filteredJobs);
      } catch (err) {
        console.error("❌ [CompanyPage] Lỗi khi lấy dữ liệu:", err);
      }
    };

    fetchData();
  }, [idCompany]);



  const renderTabContent = () => {
    switch (activeTab) {
      case "intro":
        return <CompanyIntro company={company} />;
      case "reviews":
        return <CompanyReviews />;
      case "posts":
        return <CompanyPosts />;
      default:
        return null;
    }
  };

  if (!company) return <div>Đang tải thông tin công ty...</div>;

  return (
    <div className="company-layout">
      {showMiniHeader && (
        <div className="company-mini-header">
          <p className="mini-company-name">{company.name}</p>
          <div className="mini-header-actions">
            <button className="review-button" onClick={() => alert("Viết đánh giá")}>Viết đánh giá</button>
            <button className="follow-button" onClick={() => alert("Theo dõi công ty")}>Theo dõi</button>
          </div>
        </div>
      )}
      <div className="company-card-header">
        <div className="company-card-content">
          <div className="left-section">
            <Image src={company.logo} alt={company.name} width={80} preview={false} />
            <div className="info-section">
              <p className="company-name-info">{company.name}</p>
              <p className="company-location"><CompassOutlined /> {company.address}</p>
              <div><SolutionOutlined style={{ marginRight: "4px", marginTop: "2px" }} /><a href="#" className="job-link">{jobs.length} việc làm đang tuyển</a></div>
              <div className="action-buttons">
                <button className="review-button" onClick={() => alert("Viết đánh giá")}>Viết đánh giá</button>
                <button className="follow-button" onClick={() => alert("Theo dõi công ty")}>Theo dõi</button>
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
          <div className="company-tabs-card">
            <div className={`company-tab ${activeTab === "intro" ? "active" : ""}`} onClick={() => setActiveTab("intro")}>
              Giới thiệu
            </div>
            <div className={`company-tab ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
              Đánh giá <Badge count={16} style={{ marginLeft: 6 }} />
            </div>
            <div className={`company-tab ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>
              Bài viết
            </div>
          </div>

          <div className="tab-content">{renderTabContent()}</div>
        </div>

        <div className="right-content">
          <CompanyJobList
            jobs={jobs}
            selectedId={selectedJob?.id || null}
            onSelect={(job) => setSelectedJob(job)}
            company={company}
          />

        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
