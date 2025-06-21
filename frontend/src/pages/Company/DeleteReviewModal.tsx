import { Modal, Button } from "antd";

interface Review {
    _id: string;
    accountId: string;
    title: string;
    rating: number;
    positiveFeedback: string;
    negativeFeedback: string;
    createdAt?: string;
}

interface DeleteReviewModalProps {
    open: boolean;
    onClose: () => void;
    review: Review | null;
    onDelete: (id: string) => void;
}

const DeleteReviewModal = ({ open, onClose, review, onDelete }: DeleteReviewModalProps) => {
    return (
        <Modal open={open} onCancel={onClose} footer={null} title="Tuỳ chọn đánh giá">
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <Button danger onClick={() => review && onDelete(review._id)}>
                    Xoá
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteReviewModal;
