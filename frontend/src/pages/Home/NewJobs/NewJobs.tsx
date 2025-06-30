import { Col, Row, Typography } from "antd";
import "./style.css";
import Job from "./Job/Job";
import { useEffect, useState } from "react";
import { getAllJob } from "../../../services/job.axios";

const { Title } = Typography;

function NewJobs() {
  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJob(""); // Gọi API không truyền query
        if (res?.data?.length) {
          const sortedJobs = res.data
            .filter(job => !job.deleted) // lọc nếu cần
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
            .slice(0, 9); // lấy 9 job mới nhất

          setJobs(sortedJobs);
        }
      } catch (err) {
        console.error("Lỗi lấy job:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container">
      <div className="inner-wrap">
        <Row>
          <Col span={24} style={{ textAlign: "center", marginBottom: 30 }}>
            <Title level={2}>Công việc mới nhất dành cho bạn</Title>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          {jobs.map((job) => (
            <Col span={8} key={job._id}>
              <Job job={job} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default NewJobs;
