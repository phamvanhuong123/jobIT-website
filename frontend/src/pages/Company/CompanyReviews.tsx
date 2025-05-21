import { Card, Rate, Progress } from "antd";
import { StarFilled } from "@ant-design/icons";

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

const CompanyReviews = () => {
    return (
        <div className="review-container">
            {/* Thẻ thống kê đánh giá */}
            <Card className="review-box">
                <h3 className="review-title">Đánh giá chung</h3>
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

                    {/* Vòng tròn khuyến nghị */}
                    <div className="recommend-section">
                        <Progress
                            type="circle"
                            percent={ratingData.recommendPercent}
                            strokeColor="#52c41a"
                            format={(percent) => `${percent}%`}
                        />
                        <p className="recommend-label">
                            Khuyến khích làm việc tại đây
                        </p>
                    </div>
                </div>
            </Card >

            {/* Thẻ đánh giá của người dùng */}
            <Card className="review-box-comment">
                <div className="review-header">
                    <img
                        src="https://itviec.com/assets/bot-review-1x-2fcdcad46de76c263af1692e30f2ccf3b3de36ce198ae3fcf0e6d4dc0c6c2103.png"
                        alt="Review bot"
                        className="review-img"
                    />
                    <div className="review-content-comment">
                        <p className="review-title">
                            Hãy dành 1 phút để chia sẻ trải nghiệm làm việc của bạn tại{" "}
                            <span className="company-name">NEXON DEV VINA</span>
                        </p>
                        <div className="review-rating">
                            <Rate defaultValue={0} />
                            <span className="review-hint">Nhấn để bắt đầu đánh giá</span>
                        </div>
                        <div className="review-anonymous">
                            <span className="warning">⚠</span>
                            Đánh giá của bạn cho{" "}
                            <span className="company-name">NEXON DEV VINA</span> sẽ được gửi ẩn danh.
                        </div>
                    </div>
                </div>
            </Card>

            {/* Thẻ hiển thị các bài đánh giá*/}
            <Card className="user-review-box">
                <div className="user-review-content">
                    <div className="user-review-header">
                        <Rate disabled defaultValue={5} />
                        <span className="review-date">15/05/2025</span>
                    </div>
                    <p className="review-subtitle">Môi trường làm việc tuyệt vời</p>
                    <p className="review-description">
                        Công ty có môi trường làm việc năng động, đồng nghiệp thân thiện.
                        Sếp tâm lý và hỗ trợ tốt cho nhân viên. Quy trình rõ ràng và chuyên nghiệp.
                    </p>
                    <div className="review-advantage">
                        <span className="label-green">Ưu điểm:</span>
                        <span>Đồng nghiệp thân thiện, văn phòng đẹp</span>
                    </div>
                    <div className="review-disadvantage">
                        <span className="label-red">Nhược điểm:</span>
                        <span>Thỉnh thoảng OT, quy trình hơi chậm</span>
                    </div>
                </div>
            </Card>

        </div >
    );
};

export default CompanyReviews;
