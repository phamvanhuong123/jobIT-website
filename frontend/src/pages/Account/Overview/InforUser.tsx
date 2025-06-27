import { ArrowRightOutlined, MailOutlined, SafetyOutlined } from "@ant-design/icons"
import { Avatar, Card, Col, Row, Typography } from "antd"
import { Link } from "react-router"
import { useAppSelector } from "~/store";
const { Title } = Typography;
function InforUser(){
  const user = useAppSelector(state => state.userCandidate.candidate)

 
    return <>
    <Col span={24}>
          <Card>
            <Row gutter={5}>
              <Col span={3}>
                <Avatar
                  size={64}
                  style={{
                    fontSize: 40,
                    backgroundColor: "green",
                  }}
                >
                  {user?.fullName.split(" ")[0].at(0)}
                </Avatar>
              </Col>
              <Col span={21}>
                <Title level={2}>{user?.fullName}</Title>
                <div className="box-title">
                  <SafetyOutlined />
                  <p>Cật nhật chức danh</p>
                </div>
                <div className="box-title">
                  <MailOutlined />
                  <p>{user?.email}</p>
                </div>
                <Link className="box-update-link" to={"/user/ho-so-cv"}>
                  Cật nhật hồ sơ <ArrowRightOutlined />{" "}
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
    </>
}
export default InforUser