import { Card, Rate, Progress, Divider, Popover } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ratingData = {
    average: 4.2,
    totalReviews: 16,
    recommendPercent: 93,
    distribution: [
        { star: 5, percent: 44 },
        { star: 4, percent: 38 },
        { star: 3, percent: 13 },
        { star: 2, percent: 5 },
        { star: 1, percent: 0 },
    ],
};

const ratingDetailContent = (
    <div style={{ lineHeight: '24px' }}>
        <div>Lương thưởng & phúc lợi: <Rate disabled defaultValue={5} /></div>
        <div>Đào tạo & học hỏi: <Rate disabled defaultValue={5} /></div>
        <div>Sự quan tâm đến nhân viên: <Rate disabled defaultValue={5} /></div>
        <div>Văn hoá công ty: <Rate disabled defaultValue={5} /></div>
        <div>Văn phòng làm việc: <Rate disabled defaultValue={5} /></div>
    </div>
);

interface CompanyReviewsProps {
    nameCompany: string;
    idCompany: string;
}


const CompanyReviews = ({ nameCompany, idCompany }: CompanyReviewsProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isHoveringRow, setIsHoveringRow] = useState(false);
    const navigate = useNavigate();

    const handleRateClick = (value: number) => {
        if (value > 0) {
            navigate(`/review/${idCompany}`); // hoặc `/company/${id}/review-form` nếu có
        }
    };

    return (
        <div className="review-container">
            {/* Thẻ thống kê đánh giá */}
            <Card className="review-box">
                <h3 className="review-title">Đánh giá chung</h3>
                <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                <div className="review-content">
                    {/* Điểm trung bình */}
                    <div className="score-section">
                        <p className="score">{ratingData.average}</p>
                        <Rate disabled allowHalf defaultValue={ratingData.average} />
                        <p className="review-count">{ratingData.totalReviews} đánh giá</p>
                    </div>

                    {/* Phân phối sao */}
                    <div className="distribution-section">
                        {ratingData.distribution.map((item) => (
                            <div key={item.star} className="distribution-row">
                                <span className="star-label">{item.star}</span>
                                <StarFilled className="star-icon" />
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                                <span className="percent-label">{item.percent}%</span>
                            </div>
                        ))}
                    </div>

                   
                </div>
                <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />

           
                
            </Card >

            {/* Thẻ đánh giá của người dùng */}
            <Card className="review-box-comment">
                <div className="review-header-box">
                    <img
                        src="https://itviec.com/assets/bot-review-1x-2fcdcad46de76c263af1692e30f2ccf3b3de36ce198ae3fcf0e6d4dc0c6c2103.png"
                        alt="Review bot"
                        className="review-img"
                    />
                    <div className="review-content-comment">
                        <p className="review-title" style={{ margin: 0, fontSize: "18px" }}>
                            Hãy dành 1 phút để chia sẻ trải nghiệm làm việc của bạn tại{" "}
                            <span className="company-name">{nameCompany}</span>
                        </p>
                        <div className="review-rating" style={{ margin: 0 }}>
                            <Rate defaultValue={0} onChange={handleRateClick} />
                            <span className="review-hint">Nhấn để bắt đầu đánh giá</span>
                        </div>
                        <div className="review-anonymous" >
                            <span className="warning">⚠</span>
                            Đánh giá của bạn cho{" "}
                            <span className="company-name">{nameCompany}</span> sẽ được gửi ẩn danh.
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="user-review-box">
                <div className="user-review-content">
                    <h2 style={{ fontWeight: "600", fontSize: "22px" }}>
                        {ratingData.totalReviews} đánh giá
                    </h2>
                    <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)", margin: 0, }} />
                    <div className="user-review-header">
                        <span className="review-date">Tháng Hai 2025</span>
                    </div>
                    <h3 className="review-title" style={{ fontSize: "18px", margin: 0 }}>Công ty tốt, chế độ lương thưởng hấp dẫn</h3>
                    <div className="review-rating" style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                        <Popover >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <Rate disabled defaultValue={5} />
                                <span className="review-score">5</span>
                            </div>
                        </Popover>
                        <span className="review-recommend">👍 Khuyến khích</span>
                    </div>
                    <div className="review-section">
                        <p className="review-label">Điều tôi thích:</p>
                        <p style={{ fontSize: "16px" }}>
                            Công ty ngân hàng hàng đầu Việt Nam và tôi tin rằng mình có cơ hội khi làm việc ở nơi đây. Chính sách tốt, phúc lợi xã hội khá tốt. Đây là điều tôi cảm thấy hài lòng.
                        </p>
                    </div>

                    <div className="review-section">
                        <p className="review-label">Đề nghị cải thiện:</p>
                        <p style={{ fontSize: "16px" }}>
                            Cần hỗ trợ phúc lợi, lương hưu cho nhân viên. Tăng lương nhân viên.
                        </p>
                    </div>
                </div>
                <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)", }} />
            </Card>
        </div >
    );
};

export default CompanyReviews;
