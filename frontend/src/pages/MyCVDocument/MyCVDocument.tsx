// ModernCVDocument.tsx - A modern-looking CV inspired by uploaded image

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { useAppSelector } from "~/store";
// Đăng ký font Noto Sans hỗ trợ Unicode tiếng Việt
Font.register({
  family: "Noto Sans",
  fonts: [
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/ofl/notosans/NotoSans-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/ofl/notosans/NotoSans-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f5f5f5",
    fontSize: 11,
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#2d2f3a",
    color: "white",
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  section: {
    marginBottom: 14,
    paddingBottom: 6,
    borderBottom: "1 solid #ccc",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
  },
  tag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    padding: 2,
    marginRight: 4,
    marginBottom: 2,
  },
});

function ModernCVDocument() {
  const user = useAppSelector((state) => state.userCandidate.candidate);

  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toISOString().split("T")[0];
  };

  return (
    <PDFViewer width="100%" height="800">
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{user?.fullName || "Chưa có tên"}</Text>
          <View style={styles.subInfo}>
            <Text>📞 {user?.phoneNumber}</Text>
            <Text>🎂 {formatDate(user?.dateOfBirth)}</Text>
          </View>
          <View style={styles.subInfo}>
            <Text>✉️ {user?.email}</Text>
            <Text>📍 {user?.city}</Text>
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Học vấn</Text>
          <Text>{user?.education?.schoolName || "Chưa có thông tin"}</Text>
          <Text>
            {user?.education?.startDate ? formatDate(user.education.startDate) : ""} - {user?.education?.endDate ? formatDate(user.education.endDate) : ""} |
            {" "}{user?.education?.major}
          </Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kỹ năng</Text>
          <Text style={styles.label}>Core skills</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>
            {user?.skills && user.skills.length > 0 && user.skills[0].technicalSkill?.length > 0 ? (
              user.skills[0].technicalSkill.map((s: any, idx: number) => (
                <Text style={styles.tag} key={idx}>{s.name || s}</Text>
              ))
            ) : (
              <Text>Không có</Text>
            )}
          </View>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kinh nghiệm làm việc</Text>
          <Text>Cập nhật kinh nghiệm làm việc của bạn</Text>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ngoại ngữ</Text>
          {user?.languages?.map((lang: any, idx: number) => (
            <Text key={idx}>
              <Text style={styles.label}>{lang.name}:</Text> {lang.level}
            </Text>
          ))}
        </View>
      </Page>
        
    

    </Document>

      </PDFViewer>
    
  );
}

export default ModernCVDocument;
