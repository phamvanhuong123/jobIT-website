import React from "react";
import styles from "./CompanyInfoCard.module.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface CompanyInfoCardProps {
  company: {
    name: string;
    rating: number;
    type: string;
    field: string;
    size: string;
    country: string;
    workTime: string;
    ot: string;
  };
}

const CompanyInfoCard: React.FC<CompanyInfoCardProps> = ({ company }) => {
  return (
    <div className={styles.stickyWrapper}>
      <div className={styles.card}>
        <img
          src="/logo-NAL.png"
          alt="Logo"
          className={styles.logo}
        />
        <h3>{company.name}</h3>

        <div className={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isFull = company.rating >= star;
            const isHalf = company.rating >= star - 0.5 && company.rating < star;
            return (
              <span key={star} className={styles.star}>
                {isFull ? (
                  <FaStar />
                ) : isHalf ? (
                  <FaStarHalfAlt />
                ) : (
                  <FaRegStar />
                )}
              </span>
            );
          })}
          <span className={styles.ratingText}>{company.rating}</span>
        </div>

        <p className={styles.tagline}>
          Đồng hành cùng {company.name} trên chặng đường phủ sóng bản đồ số thế giới!
        </p>

        <table className={styles.infoTable}>
          <tbody>
            {[
              ["Mô hình công ty", company.type],
              ["Lĩnh vực công ty", company.field],
              ["Quy mô công ty", company.size],
              ["Quốc gia", company.country],
              ["Thời gian làm việc", company.workTime],
              ["Làm việc ngoài giờ", company.ot],
            ].map(([label, value], idx) => (
              <tr key={idx} className={styles.infoRow}>
                <td className={styles.label}>{label}</td>
                <td className={styles.value}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyInfoCard;
