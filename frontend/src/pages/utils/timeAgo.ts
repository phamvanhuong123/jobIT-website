import convertDMYToISO from './dateConverter';

const timeAgo = (dateString: string): string => {
    const isoDateString = convertDMYToISO(dateString);
    if (!isoDateString) return dateString;

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