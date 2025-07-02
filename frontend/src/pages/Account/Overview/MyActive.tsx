import { Card, Col, ConfigProvider, Row,Typography } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { getApplyCvByUser } from "~/services/cv.axios"
import { getAllFavoriteJobByCandidate } from "~/services/favoriteJob.axios"
import { useAppSelector } from "~/store"

const {Title} = Typography
function MyActive(){
  const user = useAppSelector(state => state.userCandidate.candidate)
  const [countAply,setCountAply] = useState(0)
  const [countSavedJob,setCountSavedJob] = useState(0)
    useEffect(()=>{
      const fetchApi = async () => {
            if (user?.idAccount) {
              const resAply = await getApplyCvByUser(user?.idAccount);
              if (resAply.data) setCountAply(resAply.data.length);
              const resSaved = await getAllFavoriteJobByCandidate(user.idAccount);
              if (resSaved.data) setCountSavedJob(resSaved.data.length);

            }
          };
          fetchApi();
    },[user]) 

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
                      <p>{countAply}</p>
                    </Card>
                  </Link>
                </Col>
                <Col span={12}>
                  <Link to={""}>
                    <Card className="card-active-2">
                      <Title level={5}>Việc làm đã lưu</Title>
                      <p>{countSavedJob}</p>
                    </Card>
                  </Link>
                </Col>
              </Row>
            </ConfigProvider>
          </Card>
        </Col>
}
export default MyActive