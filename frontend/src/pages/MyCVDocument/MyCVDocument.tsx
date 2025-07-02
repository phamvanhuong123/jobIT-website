import React, { useRef } from "react";
import { useAppSelector } from "~/store";
import { useReactToPrint } from "react-to-print";
const ModernCVPreview = () => {
  const user = useAppSelector((state) => state.userCandidate.candidate);
  const printRef = useRef<HTMLDivElement>(null);
  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  const handlePrint = useReactToPrint({
    contentRef: printRef, // ✅ dùng contentRef thay vì content
    documentTitle: "CV_Profile",
    pageStyle: `
    @page {
      size: auto;
      margin: 20mm;
    }
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  `,
  });
  console.log(user);
  return (
    <>
      <div ref={printRef} style={styles.viewer}>
        <div style={styles.page}>
          {/* Left Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.avatarSection}>
              <h2 style={styles.name}>{user?.fullName || "Chưa có tên"}</h2>
              <p style={styles.role}>{user?.currentLevel} Developer</p>
            </div>
            <div style={styles.infoGroup}>
              <p>📞 {user?.phoneNumber}</p>
              <p>✉️ {user?.email}</p>
              <p>📍 {user?.city}</p>
              <p>🎂 {formatDate(user?.dateOfBirth)}</p>
              <p>👤 {user?.gender}</p>
              <p>
                🎯{" "}
                {user?.experienceYears !== undefined
                  ? String(user.experienceYears)
                  : ""}{" "}
                năm kinh nghiệm
              </p>
            </div>
            {user?.personalLink && (
              <div style={styles.infoGroup}>
                <h4>🔗 Liên kết</h4>
                <a href={user.personalLink} target="_blank" rel="noreferrer">
                  {user.personalLink}
                </a>
              </div>
            )}
            {user?.address && (
              <div style={styles.infoGroup}>
                <h4>🏠 Địa chỉ</h4>
                <p>{user.address}</p>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div style={styles.content}>
            {user?.about && (
              <section style={styles.section}>
                <h3 style={styles.sectionTitle}>👋 Giới thiệu</h3>
                <p>{user.about}</p>
              </section>
            )}

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>🎓 Học vấn</h3>
              <p>
                <strong>{user?.education?.schoolName}</strong>
              </p>
              <p>
                {user?.education?.major} (
                {formatDate(user?.education?.startDate)} -{" "}
                {formatDate(user?.education?.endDate)})
              </p>
            </section>

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>🛠️ Kỹ năng chuyên môn</h3>
              <div style={styles.badgeContainer}>
                {(user as any)?.skills?.technicalSkill?.length > 0 ? (
                  (user as any).skills.technicalSkill.map((s: any, idx: number) => (
                    <span key={idx} style={styles.badge}>
                      {`${s.skill} - ${s.experience} năm`}
                    </span>
                  ))
                ) : (
                  <p>Không có</p>
                )}
              </div>
            </section>

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>💡 Kỹ năng mềm</h3>
              <div style={styles.badgeContainer}>
                {(user as any)?.skills?.softSkills?.length > 0 ? (
                  (user as any).skills.softSkills.map(
                    (s: string, idx: number) => (
                      <span key={idx} style={styles.badge}>
                        {s}
                      </span>
                    )
                  )
                ) : (
                  <p>Không có</p>
                )}
              </div>
            </section>

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>🌐 Ngoại ngữ</h3>
              {user?.languages?.map((lang: any, idx: number) => (
                <p key={idx}>
                  <strong>{lang.name}</strong>: {lang.level}
                </p>
              ))}
            </section>

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>🕒 Hình thức làm việc</h3>
              <p>{user?.workTypes?.join(", ") || "Không có"}</p>
            </section>

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>📍 Địa điểm mong muốn</h3>
              <p>{user?.locations?.join(", ") || "Không có"}</p>
            </section>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={handlePrint}
          style={{
            backgroundColor: "#3498db",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          📄 Tải CV dạng PDF
        </button>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  viewer: {
    backgroundColor: "#e5e7eb",
    padding: "40px 0",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
  },
  page: {
    display: "flex",
    width: "1000px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
    fontSize: 14,
    borderRadius: 8,
    overflow: "hidden",
  },
  sidebar: {
    backgroundColor: "#2c3e50",
    color: "#fff",
    width: "40%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  avatarSection: {
    textAlign: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  role: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#ccc",
  },
  infoGroup: {
    fontSize: 13,
    lineHeight: 1.6,
  },
  content: {
    backgroundColor: "#fff",
    width: "70%",
    padding: "24px 32px",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    borderBottom: "2px solid #3498db",
    paddingBottom: 4,
    marginBottom: 8,
    color: "#2c3e50",
  },
  badgeContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 16,
    fontSize: 13,
  },
};

export default ModernCVPreview;
