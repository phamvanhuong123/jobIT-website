import { Card } from "antd";

const CompanyPosts = () => {
    return (
        <div className="company-posts-wrapper">
            {/* Block 1: Nhà tuyển dụng */}
            <Card className="employer-invite-card">
                <div className="employer-content">
                    <img
                        src="https://itviec.com/assets/employer-invite-1x-6f6f05d9d505d2e33a20705510730e58f3be8ebf56f4769f8f7e2634ac2871a0.png"
                        alt="Nhà tuyển dụng"
                        className="employer-image"
                    />
                    <div>
                        <span className="tag">Dành cho Nhà tuyển dụng</span>
                        <h3 className="invite-title">
                            Chia sẻ câu chuyện. Truyền cảm hứng đến những nhân tài IT hàng đầu.
                        </h3>
                        <p>
                            Bạn là nhà tuyển dụng và có những kiến thức, câu chuyện giá trị về NEXON DEV VINA?
                            Hãy gửi bài viết ngay để giúp:
                        </p>
                        <ul>
                            <li>Nâng cao thương hiệu nhà tuyển dụng.</li>
                            <li>Thu hút và gắn kết những nhân tài IT hàng đầu.</li>
                            <li>Mở rộng tầm ảnh hưởng của công ty bạn trong cộng đồng IT.</li>
                        </ul>
                        <p>
                            <a href="#" className="highlight-link">Click vào đây</a> để tìm hiểu cách đăng bài viết và tạo ra sức ảnh hưởng lớn hơn!
                        </p>
                    </div>
                </div>
            </Card>

            {/* Block 2: Giới thiệu tính năng */}
            <Card className="feature-info-card">
                <div className="info-content">
                    <div>
                        <h3 className="info-title">Về Bài Viết Từ Nhà Tuyển Dụng trên Viec làm IT</h3>
                        <p>
                            Tính năng Bài Viết Từ Nhà Tuyển Dụng của Viec làm IT cho phép các công ty chia sẻ
                            những câu chuyện, kiến thức về sản phẩm, chuyên môn và những cập nhật trong tổ chức.
                        </p>
                        <p>
                            Những bài viết này được khuyến khích làm nổi bật văn hóa nơi làm việc, bí quyết phát triển
                            sự nghiệp và các xu hướng trong ngành, mang lại giá trị nguồn tài nguyên hữu ích
                            cho ứng viên IT và cộng đồng IT.
                        </p>
                        <p className="note">
                            <strong>Lưu ý:</strong> Tất cả các bài viết sẽ được Viec làm IT kiểm duyệt cẩn trọng để đảm bảo
                            chất lượng và tính liên quan trước khi xuất bản.
                        </p>
                    </div>
                    <img
                        src="https://itviec.com/assets/employer-feature-1x-b535d0a5e09e5b7db582fa62d702a61eb3e15d7f6b6e47600c67e6bdb5b6fd4c.png"
                        alt="Tính năng nhà tuyển dụng"
                        className="feature-image"
                    />
                </div>
            </Card>
        </div>
    );
};

export default CompanyPosts;
