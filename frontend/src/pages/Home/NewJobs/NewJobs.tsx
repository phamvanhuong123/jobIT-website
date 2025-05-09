import { Col, Row, Typography } from "antd";

import "./style.css";
import Job from "./Job/Job";
const { Title } = Typography;
function NewJobs() {
  return (
    <div className="container">
      <div className="inner-wrap">
        <Row>
          <Col
            span={24}
            style={{
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            <Title level={2}>Công việc mới nhất dành cho bạn</Title>
          </Col>
        </Row>
        <Row gutter={[10,10]}>
          {[...Array(8)].map(() => (
            <Col span={8}>
              <Job />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
export default NewJobs;
