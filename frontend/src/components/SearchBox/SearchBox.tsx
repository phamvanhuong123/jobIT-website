import { SearchOutlined } from "@ant-design/icons";
import { Col, Row,Select,Typography,Input,Button } from "antd"
const { Title } = Typography;
const FONT_SIZE = 18;
const HEIGHT = 50
function SearchBox(){
    return <>
     <div style={{background: 'linear-gradient(90deg,#1e272e,#2C5364)'}}>
     <div className="container">
            <Row style={{padding : '64px 0' }} gutter={10}>
                <Col span={24} >
                    <Title style={{color : '#ffffff'}} level={2}>26 Việc Làm IT  Dành Cho Bạn</Title>
                </Col>
                <Col span={6}>
                    <Select style={{
                        width : '100%',
                        height : HEIGHT
                    }}
                    defaultValue={'AllCity'}
                         options={[
                            { value: 'AllCity', label:<div style={{fontSize : FONT_SIZE}}>Tất cả thành phố</div> },
                            { value: 'HaNoi', label: <div style={{fontSize : FONT_SIZE}}>Hà Nội</div> },
                            { value: 'DaNang', label: <div style={{fontSize : FONT_SIZE}}>Đà Nẵng</div> },
                            { value: 'HCM', label: <div style={{fontSize : FONT_SIZE}}>Hồ Chí Minh</div>},
                            { value: 'Khac', label: <div style={{fontSize : FONT_SIZE}}>Khác</div>},
                          ]}
                    />
                </Col>
                <Col span={12}>
                    <Input  style={{
                        width : '100%',
                        height : HEIGHT,
                        fontSize : FONT_SIZE
                    }}/>
                </Col>
                <Col span={6}>
                    <Button style={{
                        width : '100%',
                        height : HEIGHT,
                        fontSize : FONT_SIZE
                    }} type="primary" icon={<SearchOutlined />}> Tìm Kiếm</Button>
                </Col>
            </Row>



        </div>
     </div>
   
    </>
}
export default SearchBox;