import { Modal, Button, Form, Input, Rate } from "antd";
import { useEffect } from "react";

interface Review {
    _id: string;
    accountId: string;
    title: string;
    rating: number;
    positiveFeedback: string;
    negativeFeedback: string;
    createdAt?: string;
}

interface EditReviewModalProps {
    open: boolean;
    onClose: () => void;
    review: Review | null;
    onEdit: (review: Review) => void;
}

const EditReviewModal = ({ open, onClose, review, onEdit }: EditReviewModalProps) => {
    const [form] = Form.useForm();

    // Gán giá trị mặc định mỗi khi review thay đổi
    useEffect(() => {
        if (review) {
            form.setFieldsValue({
                title: review.title,
                rating: review.rating,
                positiveFeedback: review.positiveFeedback,
                negativeFeedback: review.negativeFeedback,
            });
        }
    }, [review, form]);

    const handleFinish = (values: any) => {
        if (review) {
            const updatedReview: Review = {
                ...review,
                ...values,
            };
            onEdit(updatedReview);
            onClose(); // Đóng modal sau khi sửa
        }
    };

    return (
        <Modal open={open} onCancel={onClose} footer={null} title="Chỉnh sửa đánh giá">
            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Số sao" name="rating" rules={[{ required: true, message: "Vui lòng đánh giá sao!" }]}>
                    <Rate />
                </Form.Item>

                <Form.Item
                    label="Điều bạn thích"
                    name="positiveFeedback"
                    rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Cần cải thiện"
                    name="negativeFeedback"
                    rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item style={{ textAlign: "right" }}>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Huỷ
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditReviewModal;
