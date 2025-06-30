import { Badge, Card, Divider, Tag, Typography } from "antd";
import { FaDollarSign } from "react-icons/fa6";
import { LuMapPinCheckInside } from "react-icons/lu";
import { RiHomeOfficeLine } from "react-icons/ri";
import timeAgo from '../../../utils/timeAgo'; // chỉnh đường dẫn theo đúng vị trí file
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface JobProps {
    job: IJob; // dùng trực tiếp IJob không cần import
}


function Job({ job }: JobProps) {
    const navigate = useNavigate();

    return (
        <Badge.Ribbon text="New for you">
            <Card className="card__job">
                <div className="card__job__header">
                    <p className="card__job__header__text">
                        Đăng {timeAgo(job.updatedAt)}
                    </p>
                    <Title level={4}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/viec-lam-it/chi-tiet");
                        }}>{job.name}</Title>
                </div>

                <div className="card__job__content">
                    <div className="card__job__content__img"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/viec-lam-it/chi-tiet");
                        }}
                        style={{ cursor: "pointer" }}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvXWOd7X54N_x-Jj6cubRD0iwoY4vfDW27Q&s"
                            alt=""
                        />
                        <div className="card__job__content__name"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/company/${job.idCompany}`);
                            }}
                        >{job.nameCompany}
                        </div>
                    </div>
                    <div className="card__job__content__salary"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/viec-lam-it/chi-tiet");
                        }}>
                        <FaDollarSign />
                        <p>
                            {job.salary.min} - {job.salary.max} {job.salary.currency}
                        </p>
                    </div>
                </div>
                <Divider style={{ borderColor: "rgb(203 201 255)" }} />
                <div className="card__job__footer" onClick={(e) => {
                    e.stopPropagation();
                    navigate("/viec-lam-it/chi-tiet");
                }}
                >
                    <div className="card__job__footer__workplace">
                        <RiHomeOfficeLine />
                        <p>{job.workplace || "Tại văn phòng"}</p>
                    </div>
                    <div className="card__job__footer__address">
                        <LuMapPinCheckInside />
                        <p>{job.locations}</p>
                    </div>
                    <div className="card__job__footer__skills">
                        {job.skills?.slice(0, 3).map((tag) => (
                            <Tag color="processing" key={tag}>
                                {tag}
                            </Tag>
                        ))}
                    </div>
                </div>
            </Card>
        </Badge.Ribbon >
    );
}

export default Job;
