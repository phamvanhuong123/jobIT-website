import { Button, Card, Col, Row, Typography } from 'antd'
import './style.css'
const { Title } = Typography;
function ApplicationTools(){
    return <div className="container">
      <div className='inner-wrap'>
        <Row>
                <Col span={24} style={{
                    textAlign : 'center',
                    marginBottom : 30
                }}>
                    <Title level={2}>Công cụ tốt nhất cho hành trang ứng tuyển của bạn</Title>
                   
                </Col>
        </Row>
        <Row gutter={10}>
                <Col span={12}>
                <Card title={<h3>Hồ sơ cá nhân</h3>} variant="borderless">
                    <p className='box-content'>Kiến tạo hồ sơ ITviec với cấu trúc chuẩn mực cùng các gợi ý chi tiết.</p>
                    <Button size='large' shape='round'>Cật nhật hồ sơ</Button>
                </Card>
                </Col>
                <Col span={12}>
                    <Card title={<h3>Mẫu CV</h3>} >
                        <p className='box-content'>Nâng cấp CV với các mẫu CV IT chuyên nghiệp - được nhà tuyển dụng đề xuất.</p>
                        <Button size='large' shape='round' type='primary'>Xem mẫu CV</Button>
                    </Card>
                </Col>
        </Row>
      </div>
    </div>
}
export default ApplicationTools