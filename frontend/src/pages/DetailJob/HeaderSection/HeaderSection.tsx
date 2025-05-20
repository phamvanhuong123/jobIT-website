// DetailJob/HeaderSection/HeaderSection.tsx
import React from "react";
import styles from "./HeaderSection.module.css";

interface Props {
  title: string;
  companyName: string;
}

const HeaderSection: React.FC<Props> = ({ title, companyName }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.company}>{companyName}</h2>

      <div className={styles.salary}>
        💰{" "}
        <a href="#">Đăng nhập để xem mức lương</a>
      </div>

      <div className={styles.actions}>
        <button className={styles.applyButton}>Ứng tuyển</button>
        <span className={styles.heart}>♡</span>
      </div>
    </div>
  );
};

export default HeaderSection;
