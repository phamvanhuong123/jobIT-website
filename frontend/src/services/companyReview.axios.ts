import axios from './axios.customize';

export interface ICompanyReviewPayload {
    accountId: string;
    companyId: string;
    title: string;
    rating: number;
    positiveFeedback: string;
    negativeFeedback: string;
}

// Lấy tất cả đánh giá của một công ty + trung bình rating
export const gellAllByCompanyId = (companyId: string) => {
    return axios.get(`/comany-reviews/${companyId}`);
};

// Thêm đánh giá mới
export const createCompanyReview = (data: ICompanyReviewPayload) => {
    return axios.post("/comany-reviews/add", data);
};

// Cập nhật đánh giá
export const updateCompanyReview = (id: string, data: ICompanyReviewPayload) => {
    return axios.patch(`/comany-reviews/update/${id}`, data);
};


// Xoá đánh giá
export const deleteCompanyReview = (id: string) => {
    return axios.delete(`/comany-reviews/delete/${id}`);
};
