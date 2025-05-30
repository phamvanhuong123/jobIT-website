import { Card, Col, ConfigProvider, Row,Typography } from "antd"
import { Link } from "react-router"

const {Title} = Typography
function MyActive(){
    return <Col span={24}>
          <Card>
            <Title level={3}>Hoạt động của bạn</Title>
            <ConfigProvider
              theme={{
                components: {
                  Card: {
                    bodyPadding: 10,
                  },
                },
              }}
            >
              <Row gutter={12}>
                <Col span={12}>
                  <Link to={""}>
                    <Card className="card-active-1">
                      <Title level={5}>Việc làm đã ứng tuyển</Title>
                      <p>12</p>
                    </Card>
                  </Link>
                </Col>
                <Col span={12}>
                  <Link to={""}>
                    <Card className="card-active-2">
                      <Title level={5}>Việc làm đã ứng tuyển</Title>
                      <p>12</p>
                    </Card>
                  </Link>
                </Col>
              </Row>
            </ConfigProvider>
          </Card>
        </Col>
}
export default MyActive