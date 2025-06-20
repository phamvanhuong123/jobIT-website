import { useEffect, useState } from "react";
import { Card, Divider, Popover, Progress, Rate } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { gellAllByCompanyId } from "~/services/companyReview.axios";

interface CompanyReviewsProps {
    nameCompany: string;
    idCompany: string;
    onStatsUpdate?: (stats: { count: number; average: number; recommendPercent: number }) => void;
}

interface Review {
    _id: string;
    title: string;
    rating: number;
    positiveFeedback: string;
    negativeFeedback: string;
    createdAt?: string;
}

const CompanyReviews = ({ nameCompany, idCompany, onStatsUpdate }: CompanyReviewsProps) => {
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [distributionCount, setDistributionCount] = useState<
        { star: number; count: number; percent: number }[]
    >([]);
    const [recommendPercent, setRecommendPercent] = useState<number>(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await gellAllByCompanyId(idCompany);

                if (res?.data) {
                    const reviewList: Review[] = res.data;
                    const avg = res.avgRating || 0;

                    setReviews(reviewList);
                    setAverageRating(avg);

                    const recommendCount = reviewList.filter(r => r.rating >= 4).length;
                    const recommendPercent = reviewList.length
                        ? Math.round((recommendCount / reviewList.length) * 100)
                        : 0;
                    setRecommendPercent(recommendPercent);

                    const dist = [5, 4, 3, 2, 1].map((star) => {
                        const count = reviewList.filter((r) => r.rating === star).length;
                        const percent = reviewList.length
                            ? Math.round((count / reviewList.length) * 100)
                            : 0;
                        return { star, count, percent };
                    });
                    setDistributionCount(dist);

                    if (onStatsUpdate) {
                        onStatsUpdate({
                            count: reviewList.length,
                            average: avg,
                            recommendPercent,
                        });
                    }
                }
            } catch (err) {
                console.error("❌ Lỗi khi lấy đánh giá:", err);
            }
        };

        if (idCompany) fetchReviews();
    }, [idCompany]);

    const handleRateClick = (value: number) => {
        if (value > 0) {
            navigate(`/review/${idCompany}`);
        }
    };

    return (
        <div className="review-container">
            {/* Thẻ thống kê đánh giá */}
            <Card className="review-box">
                <h3 className="review-title">Đánh giá chung</h3>
                <Divider
                    style={{
                        borderColor: "#dedede",
                        borderTop: "2px dashed rgba(0, 0, 0, 0.1)",
                    }}
                />
                <div className="review-content">
                    {/* Điểm trung bình và đánh giá sao */}
                    <div className="score-section">
                        <p className="score">{averageRating.toFixed(1)}</p>
                        <Rate
                            disabled
                            value={Math.floor(averageRating)}
                            style={{ color: "#fadb14" }} // vàng đậm hơn mặc định
                        />
                        <p className="review-count">{reviews.length} đánh giá</p>
                    </div>

                    {/* Phân phối sao */}
                    <div className="distribution-section" style={{ marginTop: 24 }}>
                        {distributionCount.map((item) => (
                            <div key={item.star} className="distribution-row">
                                <span className="star-label">{item.star}</span>
                                <StarFilled
                                    className="star-icon"
                                    style={{ color: "#faad14" }} // màu vàng cam
                                />
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${item.percent}%`,
                                            backgroundColor: "#1890ff",
                                        }}
                                    />
                                </div>
                                <span className="percent-label">
                                    {item.percent}%
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Biểu đồ khuyến nghị */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
                        <Progress
                            type="circle"
                            percent={recommendPercent}
                            size={80}
                            strokeColor="#52c41a"
                            format={(percent) => (
                                <span style={{ fontWeight: 600 }}>{percent}%</span>
                            )}
                        />
                        <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>
                                Khuyến khích làm việc
                            </p>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>
                                tại đây
                            </p>
                        </div>
                    </div>

                </div>
                <Divider
                    style={{
                        borderColor: "#dedede",
                        borderTop: "2px dashed rgba(0, 0, 0, 0.1)",
                    }}
                />
            </Card>

            {/* Thẻ mời đánh giá */}
            <Card className="review-box-comment">
                <div className="review-header-box">
                    <img
                        src="https://itviec.com/assets/bot-review-1x-2fcdcad46de76c263af1692e30f2ccf3b3de36ce198ae3fcf0e6d4dc0c6c2103.png"
                        alt="Review bot"
                        className="review-img"
                    />
                    <div className="review-content-comment">
                        <p
                            className="review-title"
                            style={{ margin: 0, fontSize: "18px" }}
                        >
                            Hãy dành 1 phút để chia sẻ trải nghiệm làm việc của bạn tại{" "}
                            <span className="company-name">{nameCompany}</span>
                        </p>
                        <div className="review-rating" style={{ margin: 0 }}>
                            <Rate defaultValue={0} onChange={handleRateClick} />
                            <span className="review-hint">Nhấn để bắt đầu đánh giá</span>
                        </div>
                        <div className="review-anonymous">
                            <span className="warning">⚠</span>
                            Đánh giá của bạn cho{" "}
                            <span className="company-name">{nameCompany}</span> sẽ được gửi
                            ẩn danh.
                        </div>
                    </div>
                </div>
            </Card>

            {/* Danh sách đánh giá người dùng */}
            <Card className="user-review-box">
                <div className="user-review-content">
                    <h2 style={{ fontWeight: "600", fontSize: "22px" }}>
                        {reviews.length} bài đánh giá
                    </h2>
                    <Divider
                        style={{
                            borderColor: "#dedede",
                            borderTop: "2px dashed rgba(0, 0, 0, 0.1)",
                            margin: 0,
                        }}
                    />

                    {reviews.map((review) => (
                        <div key={review._id}>
                            <div className="user-review-header" style={{ marginTop: 16 }}>
                                <span className="review-date">
                                    {review.createdAt
                                        ? new Date(review.createdAt).toLocaleDateString("vi-VN", {
                                            year: "numeric",
                                            month: "long",
                                        })
                                        : "Không rõ thời gian"}
                                </span>
                            </div>
                            <h3
                                className="review-title"
                                style={{ fontSize: "18px", margin: 0 }}
                            >
                                {review.title}
                            </h3>
                            <div
                                className="review-rating"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    margin: "4px 0",
                                }}
                            >
                                <Popover>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Rate disabled defaultValue={review.rating} />
                                        <span className="review-score">{review.rating}</span>
                                    </div>
                                </Popover>
                                <span className="review-recommend">👍 Khuyến khích</span>
                            </div>

                            <div className="review-section">
                                <p className="review-label">Điều tôi thích:</p>
                                <p style={{ fontSize: "16px" }}>
                                    {review.positiveFeedback.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <div className="review-section">
                                <p className="review-label">Đề nghị cải thiện:</p>
                                <p style={{ fontSize: "16px" }}>
                                    {review.negativeFeedback.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <Divider
                                style={{
                                    borderColor: "#dedede",
                                    borderTop: "2px dashed rgba(0, 0, 0, 0.1)",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default CompanyReviews;
