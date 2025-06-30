import convertDMYToISO from './dateConverter';

const timeAgo = (dateString: string | undefined): string => {
    if (!dateString || typeof dateString !== "string") return "";

    let isoDateString = dateString;

    // ✅ Chỉ chuyển đổi nếu là định dạng dd/MM/yyyy
    if (dateString.includes("/")) {
        const converted = convertDMYToISO(dateString);
        if (converted) isoDateString = converted;
    }

    const now = new Date();
    const postedDate = new Date(isoDateString);

    if (isNaN(postedDate.getTime())) return dateString;

    const diffInMs = now.getTime() - postedDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) return "1 giờ trước";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
};


export default timeAgo;
