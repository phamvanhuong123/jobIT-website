import { DollarOutlined } from "@ant-design/icons"
import { Button, Col, Row } from "antd"
import { FaHeart } from "react-icons/fa"
import { Link } from "react-router"
import { deleteFavoriteJob } from "~/services/favoriteJob.axios"

function SavedJobItem({item, onchangeDelete} : {item : any,onchangeDelete : (id :string) => void}){
     const hanleDele = async() =>{
        try{
            await deleteFavoriteJob(item._id)
            onchangeDelete(item._id)
        }
        catch(e) {
            console.log(e)
        }
      }
    return <>
    <Col span={24}>
            <Row
              gutter={[10, 10]}
              justify={"space-between"}
              className="saved-job-box"
            >
              <Col className="saved__job__box__left">
                <div className="saved__job__box__left__image">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s"
                    alt=""
                  />
                </div>
                <div className="saved__job__box__left__image__title">
                  <p className="saved__job__box__left__image__title__name-job">
                    {item.job?.name}
                  </p>
                  <Link
                    to={""}
                    className="saved__job__box__left__image__title__name-company"
                  >
                    {item.company?.name}
                  </Link>
                  <p className="saved__job__box__left__image__title__location">
                    {item.job.locations.join(", ")}
                  </p>
                  <p className="saved__job__box__left__image__title__salary">
                    <DollarOutlined /> {`${item.job.salary.min} - ${item.job.salary.max} `}
                  </p>
                </div>
              </Col>
              <Col className="saved__job__box__right">
                <p className="saved__job__box__right__posted">
                  Đăng 6 giờ trước
                </p>

                <div className="saved__job__box__right__content">
                  <Link to={"/apply"}>
                    <Button type="primary" danger>
                      Ứng tuyển
                    </Button>
                  </Link>
                  <FaHeart
                    style={{
                        cursor : 'pointer'
                    }}
                    onClick={hanleDele}
                    fontSize={26}
                    color="red"
                    className="saved__job__box__right__icon"
                  />
                </div>
              </Col>
            </Row>
          </Col>
    </>
}
export default SavedJobItem