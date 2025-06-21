import { useEffect, useState } from "react";
import { Card, Divider, Progress, Rate, Modal } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { gellAllByCompanyId } from "~/services/companyReview.axios";
import { useAppSelector } from "~/store";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import { updateCompanyReview } from "~/services/companyReview.axios";
import { deleteCompanyReview } from "~/services/companyReview.axios";


interface CompanyReviewsProps {
    nameCompany: string;
    idCompany: string;
    onStatsUpdate?: (stats: { count: number; average: number; recommendPercent: number }) => void;
}

interface Review {
    _id: string;
    accountId: string;
    title: string;
    rating: number;
    positiveFeedback: string;
    negativeFeedback: string;
    createdAt?: string;
}

const CompanyReviews = ({ nameCompany, idCompany, onStatsUpdate }: CompanyReviewsProps) => {
    const navigate = useNavigate();
    const accountId = useAppSelector(state => state.userCandidate.candidate?.idAccount);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [distributionCount, setDistributionCount] = useState<{ star: number; count: number; percent: number }[]>([]);
    const [recommendPercent, setRecommendPercent] = useState<number>(0);

    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const fetchReviews = async () => {
        try {
            const res = await gellAllByCompanyId(idCompany);

            if (res?.data) {
                const reviewList: Review[] = res.data.sort((a: Review, b: Review) => {
                    return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
                });
                const avg = res.avgRating || 0;

                setReviews(reviewList);
                setAverageRating(avg);

                const recommendCount = reviewList.filter(r => r.rating >= 4).length;
                const recommendPercent = reviewList.length ? Math.round((recommendCount / reviewList.length) * 100) : 0;
                setRecommendPercent(recommendPercent);

                const dist = [5, 4, 3, 2, 1].map(star => {
                    const count = reviewList.filter(r => r.rating === star).length;
                    const percent = reviewList.length ? Math.round((count / reviewList.length) * 100) : 0;
                    return { star, count, percent };
                });
                setDistributionCount(dist);

                if (onStatsUpdate) {
                    onStatsUpdate({ count: reviewList.length, average: avg, recommendPercent });
                }
            }
        } catch (err) {
            console.error("❌ Lỗi khi lấy đánh giá:", err);
        }
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await gellAllByCompanyId(idCompany);

                if (res?.data) {
                    const reviewList: Review[] = res.data.sort((a: Review, b: Review) => {
                        return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
                    });
                    const avg = res.avgRating || 0;

                    setReviews(reviewList);
                    setAverageRating(avg);

                    const recommendCount = reviewList.filter(r => r.rating >= 4).length;
                    const recommendPercent = reviewList.length ? Math.round((recommendCount / reviewList.length) * 100) : 0;
                    setRecommendPercent(recommendPercent);

                    const dist = [5, 4, 3, 2, 1].map(star => {
                        const count = reviewList.filter(r => r.rating === star).length;
                        const percent = reviewList.length ? Math.round((count / reviewList.length) * 100) : 0;
                        return { star, count, percent };
                    });
                    setDistributionCount(dist);

                    if (onStatsUpdate) {
                        onStatsUpdate({ count: reviewList.length, average: avg, recommendPercent });
                    }
                }
            } catch (err) {
                console.error("❌ Lỗi khi lấy đánh giá:", err);
            }
        };

        if (idCompany) fetchReviews();
    }, [idCompany]);
    const handleEdit = async (updatedReview: Review) => {
        try {
            await updateCompanyReview(updatedReview._id, {
                accountId: updatedReview.accountId,
                companyId: idCompany,
                title: updatedReview.title,
                rating: updatedReview.rating,
                positiveFeedback: updatedReview.positiveFeedback,
                negativeFeedback: updatedReview.negativeFeedback,
            });

            setReviews(prev =>
                prev.map(r => (r._id === updatedReview._id ? updatedReview : r))
            );
            setIsEditModalVisible(false);
            await fetchReviews();
        } catch (err) {
            console.error("❌ Cập nhật thất bại:", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCompanyReview(id); // ← GỌI API xoá
            setReviews(prev => prev.filter(r => r._id !== id)); // ← Cập nhật UI
            setSelectedReview(null);
            setIsDeleteModalVisible(false); // ← đóng modal sau khi xoá
            await fetchReviews(); // ✅ cập nhật lại sau khi xoá

        } catch (error) {
            console.error("❌ Lỗi khi xoá đánh giá:", error);
        }
    };;
    const handleRateClick = (value: number) => {
        if (value > 0) navigate(`/review/${idCompany}`);
    };

    return (
        <div className="review-container">
            {/* Phần đánh giá chung */}
            <Card className="review-box">
                <h3 className="review-title">Đánh giá chung</h3>
                <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                <div className="review-content">
                    <div className="score-section">
                        <p className="score">{averageRating.toFixed(1)}</p>
                        <Rate disabled value={Math.floor(averageRating)} style={{ color: "#fadb14" }} />
                        <p className="review-count">{reviews.length} đánh giá</p>
                    </div>

                    <div className="distribution-section" style={{ marginTop: 24 }}>
                        {distributionCount.map(item => (
                            <div key={item.star} className="distribution-row">
                                <span className="star-label">{item.star}</span>
                                <StarFilled className="star-icon" style={{ color: "#faad14" }} />
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${item.percent}%`, backgroundColor: "#1890ff" }} />
                                </div>
                                <span className="percent-label">{item.percent}%</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
                        <Progress
                            type="circle"
                            percent={recommendPercent}
                            size={80}
                            strokeColor="#52c41a"
                            format={percent => <span style={{ fontWeight: 600 }}>{percent}%</span>}
                        />
                        <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>Khuyến khích làm việc</p>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>tại đây</p>
                        </div>
                    </div>
                </div>
                <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
            </Card>

            {/* Mời đánh giá */}
            <Card className="review-box-comment">
                <div className="review-header-box">
                    <img src="https://itviec.com/assets/bot-review-1x-2fcdcad46de76c263af1692e30f2ccf3b3de36ce198ae3fcf0e6d4dc0c6c2103.png" alt="Review bot" className="review-img" />
                    <div className="review-content-comment">
                        <p className="review-title" style={{ margin: 0, fontSize: "18px" }}>
                            Hãy chia sẻ trải nghiệm tại <span className="company-name">{nameCompany}</span>
                        </p>
                        <div className="review-rating">
                            <Rate defaultValue={0} onChange={handleRateClick} />
                            <span className="review-hint">Nhấn để bắt đầu đánh giá</span>
                        </div>
                        <div className="review-anonymous">
                            <span className="warning">⚠</span> Đánh giá sẽ được gửi ẩn danh
                        </div>
                    </div>
                </div>
            </Card>

            {/* Danh sách đánh giá */}
            <Card className="user-review-box">
                <div className="user-review-content">
                    <h2 style={{ fontWeight: "600", fontSize: "22px" }}>{reviews.length} bài đánh giá</h2>
                    <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)", margin: 0 }} />

                    {reviews.map(review => (
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
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                                <h3 className="review-title" style={{ fontSize: "18px", margin: 0 }}>{review.title}</h3>
                                {review.accountId === accountId && (
                                    <button
                                        style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "20px" }}
                                        onClick={() => {
                                            setSelectedReview(review);
                                            setIsOptionModalVisible(true);
                                        }}
                                    >
                                        ...
                                    </button>
                                )}
                            </div>

                            <div className="review-rating" style={{ display: "flex", alignItems: "center", gap: 8, margin: "4px 0" }}>
                                <Rate disabled defaultValue={review.rating} />
                                <span className="review-score">{review.rating}</span>
                                <span className="review-recommend">👍 Khuyến khích</span>
                            </div>

                            <div className="review-section">
                                <p className="review-label">Điều tôi thích:</p>
                                <p style={{ fontSize: "16px" }}>
                                    {review.positiveFeedback.split("\n").map((line, index) => (
                                        <span key={index}>{line}<br /></span>
                                    ))}
                                </p>
                            </div>

                            <div className="review-section">
                                <p className="review-label">Đề nghị cải thiện:</p>
                                <p style={{ fontSize: "16px" }}>
                                    {review.negativeFeedback.split("\n").map((line, index) => (
                                        <span key={index}>{line}<br /></span>
                                    ))}
                                </p>
                            </div>

                            <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                        </div>
                    ))}
                </div>
            </Card>

            {/* Modal lựa chọn */}
            <Modal
                open={isOptionModalVisible}
                onCancel={() => setIsOptionModalVisible(false)}
                footer={null}
                title="Tuỳ chọn đánh giá"
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button onClick={() => {
                        setIsOptionModalVisible(false);
                        setIsEditModalVisible(true);
                    }}>Chỉnh sửa</button>
                    <button onClick={() => {
                        setIsOptionModalVisible(false);
                        setIsDeleteModalVisible(true);
                    }} style={{ color: "red" }}>Xoá</button>
                </div>
            </Modal>

            {/* Modal riêng */}
            {selectedReview && (
                <>
                    <EditReviewModal
                        open={isEditModalVisible}
                        onClose={() => setIsEditModalVisible(false)}
                        onEdit={handleEdit}
                        review={selectedReview}
                    />
                    <DeleteReviewModal
                        open={isDeleteModalVisible}
                        onClose={() => setIsDeleteModalVisible(false)}
                        review={selectedReview}  // <-- PHẢI có dòng này!
                        onDelete={() => handleDelete(selectedReview!._id)} // nếu chắc chắn selectedReview tồn tại
                    />
                </>
            )}
        </div>
    );
};

export default CompanyReviews;
