import {
  AuditOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  DollarOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";
import { useAppSelector } from "~/store";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {
  addFavoriteJob,
  deleteFavoriteJob,
  getAllFavoriteJobByCandidate,
} from "~/services/favoriteJob.axios";
import { abort } from "process";

const { Text } = Typography;

interface Job {
  id: string;
  title: string;
  idCompany: string;
  company: string;
  nameCompany?: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  tags: string[];
  posted: string;
  jobDescription: string[];
  rawData: IJob; // dùng kiểu đầy đủ từ global
}

function JobIT({ job }: { job: Job }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [idFavorite, setIdfavorite] = useState("");
  const [isHoverCompany, setIsHoverCompany] = useState(false);
  const isLogin = useAppSelector((state) => state.userCandidate.isLogin);
  const user = useAppSelector((state) => state.userCandidate.candidate);
  const handleApplyClick = () => {
    navigate("/apply", { state: { job } });
  };

  const toggleLike = async () => {
    setLiked((prev) => !prev);
    try {
      if (liked) {
       
        console.log("Thao tác xoá")
        await deleteFavoriteJob(idFavorite)
      } else {
        console.log("Thao tác thêm");
        const res =  await addFavoriteJob({
          idCandidate: user?.idAccount,
          idJob: job.id,
        });
        setIdfavorite(res.data._id)
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      if (user?.idAccount) {
        const res = await getAllFavoriteJobByCandidate(user?.idAccount);

        const idFavorite = res.data?.find((item) => item.idJob === job.id)?._id;
        if (idFavorite) {
            setIdfavorite(idFavorite)
          setLiked(true);
        } else {
            setIdfavorite("")
           setLiked(false)
        }
      }
    };
    fetchApi();
  }, [job.id]);
 
  return (
    <div className="detail-column">
      {/* Header Section */}
      <div className="job-header-sticky">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 16,
            flexDirection: "column",
            padding: "24px",
            borderRadius: " 12px",
          }}
        >
          <div style={{ flex: 5, minWidth: 200 }}>
            <Title
              level={4}
              style={{
                color: hover ? "#ff4500" : "", // đỏ cam khi hover, xanh khi bình thường
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => navigate("/viec-lam-it/chi-tiet")}
            >
              {job.title}
            </Title>
            <Text
              strong
              style={{
                fontSize: "16px",
                cursor: "pointer",
                textDecoration: isHoverCompany ? "underline" : "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/company/${job.rawData.idCompany}`);
              }}
              onMouseEnter={() => setIsHoverCompany(true)}
              onMouseLeave={() => setIsHoverCompany(false)}
            >
              {job.nameCompany || job.company}{" "}
              {/* Ưu tiên hiển thị nameCompany nếu có */}
            </Text>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                minWidth: 160,
                marginTop: 4,
                fontSize: "16px",
              }}
            >
              {isLogin && job.rawData.salary?.min && job.rawData.salary?.max ? (
                <>
                  <DollarOutlined
                    style={{
                      fontSize: "18px",
                      border: "2px solid green",
                      borderRadius: "50%",
                      padding: "2px",
                      color: "green",
                    }}
                  />
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {job.rawData.salary.min.toLocaleString()} -{" "}
                    {job.rawData.salary.max.toLocaleString()}{" "}
                    {job.rawData.salary.currency ?? "USD"}
                  </span>
                </>
              ) : (
                <>
                  <DollarOutlined style={{ fontSize: "16px" }} />
                  <a
                    className="job-salary-link"
                    style={{
                      color: "#1677ff",
                      cursor: "pointer",
                      marginTop: "5px",
                    }}
                    onClick={() => navigate("/dang-nhap")}
                  >
                    Đăng nhập để xem mức lương
                  </a>
                </>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Button
                type="primary"
                className="apply-button"
                style={{
                  backgroundColor: "#ed1b2f",
                  borderColor: "#ed1b2f",
                  minWidth: "660px",
                  padding: "20px 20px",
                }}
                onClick={handleApplyClick}
              >
                Ứng tuyển
              </Button>

              <div
                style={{ marginTop: 4, cursor: "pointer" }}
                onClick={toggleLike}
              >
                {!liked ? (
                  <CiHeart fontSize={40} color="red" />
                ) : (
                  <FaHeart fontSize={30} color="red" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-card-scroll">
        <Card>
          {/* Location & Posted & Level & Workplace  */}
          <p style={{ fontSize: "14px" }}>
            <CompassOutlined /> {job.location}
          </p>
          <div>
            <ClockCircleOutlined />{" "}
            <span className="job-posted">Đăng {timeAgo(job.posted)}</span>
          </div>
          <p style={{ fontSize: "14px" }}>
            <strong>Cấp bậc:</strong> {job.rawData.level}
          </p>
          <div>
            <AuditOutlined />
            <span className="job-workplace"> {job.rawData.workplace}</span>
          </div>

          <Divider
            style={{
              borderColor: "#dedede",
              borderTopWidth: 3,
              margin: "24px 0",
            }}
          />

          {/* Tags & Metadata */}
          <div
            className="job-tags"
            style={{
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <Text strong style={{ fontSize: "16px", marginRight: 8 }}>
              Kỹ năng:
            </Text>
            {job.tags.map((skill, idx) => (
              <Tag key={idx} color="blue">
                {skill}
              </Tag>
            ))}
          </div>
          <p>
            <strong>Chuyên môn công việc:</strong> {job.title}
          </p>
          <Divider
            style={{
              borderColor: "#dedede",
              borderTopWidth: 3,
              margin: "24px 0",
            }}
          />

          {/* Job Description */}
          <Title level={5}>Mô tả công việc</Title>
          <ul>
            {(job.jobDescription ?? []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <Divider
            style={{
              borderColor: "#dedede",
              borderTopWidth: 3,
              margin: "24px 0",
            }}
          />

          {/* Skills and Experience */}
          <Title level={5}>Yêu cầu công việc</Title>
          {job.rawData.requirements.degree?.length > 0 && (
            <p>
              <strong>Trình độ học vấn:</strong>{" "}
              {job.rawData.requirements.degree.join(", ")}
            </p>
          )}
          {job.rawData.requirements.technicalSkills?.length > 0 && (
            <p>
              <strong>Kỹ năng chuyên môn:</strong>{" "}
              {job.rawData.requirements.technicalSkills.join(", ")}
            </p>
          )}
          {job.rawData.requirements.softSkills?.length > 0 && (
            <p>
              <strong>Kỹ năng mềm:</strong>{" "}
              {job.rawData.requirements.softSkills.join(", ")}
            </p>
          )}

          <Divider
            style={{
              borderColor: "#dedede",
              borderTopWidth: 3,
              margin: "24px 0",
            }}
          />

          {/* Benefits */}
          {job.rawData.requirements.advantages?.length > 0 && (
            <>
              <Title level={5}>Kỹ năng bổ sung:</Title>
              <ul style={{ fontSize: "16px", lineHeight: 1.5 }}>
                {job.rawData.requirements.advantages.map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default JobIT;
