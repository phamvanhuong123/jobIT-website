import React from "react";
import styles from "./JobInfoSection.module.css";

interface JobInfoSectionProps {
  jobData: any;
}

const JobInfoSection: React.FC<JobInfoSectionProps> = ({ jobData }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          {jobData.images.map((src: string, idx: number) => (
            <img
              key={idx}
              src={src}
              alt={`Company Image ${idx + 1}`}
              className={styles.companyImage}
            />
          ))}
        </div>

        <div className={styles.locationContainer}>
          {jobData.company.locations.map((loc: string, idx: number) => (
            <div key={idx} className={styles.locationRow}>
              <span>📍</span>
              <span>{loc}</span>
            </div>
          ))}
          <div className={styles.infoRow}>
            <span>👥</span>
            <span>{jobData.company.workingTime}</span>
          </div>
          <div className={styles.infoRow}>
            <span>⏰</span>
            <span>{jobData.company.posted}</span>
          </div>
        </div>

        <div className={styles.skillsContainer}>
          <span>
            <strong>Kỹ năng:</strong>
          </span>
          {jobData.company.skills.map((skill: string, idx: number) => (
            <span key={idx} className={styles.skillBadge}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.detailContainer}>
        <div className={styles.sectionBlock}>
          <h2 className={styles.sectionTitle}>3 Lý do để gia nhập công ty</h2>
          <ul className={styles.bulletList}>
            {jobData.reasons.map((reason: string, idx: number) => (
              <li key={idx} className={styles.bulletItem}>
                {reason}
              </li>
            ))}
          </ul>
          <hr className={styles.sectionDivider} />

          <h2 className={styles.sectionTitle}>Mô tả công việc</h2>
          <ul className={styles.bulletList}>
            {jobData.jobDescription.map((desc: string, idx: number) => {
              const isBold =
                desc.startsWith("Phụ trách giao tiếp") ||
                desc.startsWith("Lập kế hoạch tổng quan") ||
                desc.startsWith("Quản lý backlog") ||
                desc.startsWith("Quản lý vận hành đội dự án");
              return (
                <li
                  key={idx}
                  className={`${styles.bulletItem} ${
                    isBold ? styles.boldItem : styles.normalItem
                  }`}
                >
                  {desc}
                </li>
              );
            })}
          </ul>
          <hr className={styles.sectionDivider} />

          <h2 className={styles.sectionTitle}>Yêu cầu công việc</h2>
          <ul className={styles.bulletList}>
            <li className={styles.boldItem}>(1) Bằng cấp, kinh nghiệm:</li>
            {jobData.requirements.degree.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
            <li className={styles.boldItem}>(2) Kỹ năng mềm:</li>
            {jobData.requirements.softSkills.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
            <li className={styles.boldItem}>Kỹ năng chuyên môn:</li>
            {jobData.requirements.technicalSkills.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
            <li className={styles.boldItem}>(3) Bạn có lợi thế khi:</li>
            {jobData.requirements.advantages.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
          </ul>
          <hr className={styles.sectionDivider} />

          <h2 className={styles.sectionTitle}>Tại sao bạn sẽ yêu thích làm việc tại đây</h2>
          <ul className={styles.bulletList}>
            <li className={styles.boldItem}>Cơ hội phát triển:</li>
            {jobData.reasonsToLove.development.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
            <li className={styles.boldItem}>Thời gian làm việc, ngày phép, nghỉ phép:</li>
            {jobData.reasonsToLove.workingTime.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
            <li className={styles.boldItem}>Lương thưởng:</li>
            {jobData.reasonsToLove.salaryBonus.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
            <li className={styles.boldItem}>Đào tạo và phát triển:</li>
            {jobData.reasonsToLove.training.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
            <li className={styles.boldItem}>Chế độ phúc lợi khác:</li>
            {jobData.reasonsToLove.welfare.map((item: string, idx: number) => (
              <li key={idx} className={styles.normalItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.similarJobContainer}>
        <h3>Việc làm tương tự dành cho bạn</h3>
        <div className={styles.alertBox}>
          <span>Nhận các việc làm tương tự qua email</span>
          <button className={styles.alertButton}>🔔 Nhận thông báo</button>
        </div>
        <div className={styles.similarList}>
          {jobData.similarJobs.map((job: any, idx: number) => (
            <div key={idx} className={styles.similarCard}>
              <p className={styles.posted}>{job.posted}</p>
              <h4 className={styles.similarTitle}>{job.title}</h4>
              <div className={styles.similarCompany}>
                <img src={job.logo} alt="logo" className={styles.similarLogo} />
                <span>{job.company}</span>
              </div>
              <p className={styles.salary}>💰 <a href="#">Đăng nhập để xem mức lương</a></p>
              <p>🏢 Tại văn phòng</p>
              <p>📍 {job.location}</p>
              <div className={styles.skillList}>
                {job.skills.map((skill: string, sIdx: number) => (
                  <span key={sIdx} className={styles.skillBadge}>{skill}</span>
                ))}
              </div>
              {job.isHot && <div className={styles.hotTag}>HOT</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobInfoSection;
