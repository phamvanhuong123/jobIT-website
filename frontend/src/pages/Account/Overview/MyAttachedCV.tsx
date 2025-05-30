import { ArrowRightOutlined } from "@ant-design/icons"
import { Card, Col, Row,Typography } from "antd"
import { IoDocumentTextSharp } from "react-icons/io5"
import { Link } from "react-router"
const {Title} = Typography
function MyAttachedCV(){
    return <Col span={24}>
          <Card>
            <Title level={3}>Hồ sơ đính kèm của bạn</Title>
            <Card>
              <Row>
                <Col span={2}>
                  <IoDocumentTextSharp color="red" size={50} />
                </Col>
                <Col span={22}>
                  <p>Cật nhật lần cuối: 07/05/2025</p>
                  <Link className="box-update-link" to={"/user/quan-li-cv"}>
                    Quản lí hồ sơ đính kèm <ArrowRightOutlined />
                  </Link>
                </Col>
              </Row>
            </Card>
          </Card>
        </Col>

}
export default MyAttachedCV