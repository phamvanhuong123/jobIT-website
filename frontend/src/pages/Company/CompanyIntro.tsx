import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Divider, Tag, Tooltip } from "antd";

interface CompanyIntroProps {
    company: ICompany | null;
}

function CompanyIntro({ company }: CompanyIntroProps) {
    if (!company) return <div>Đang tải thông tin công ty...</div>;

    return (
        <main className="company-intro-main" style={{ padding: "16px" }}>
            {/* Info Section */}
            <Card className="company-info-card" style={{ marginBottom: 24 }}>
                <section className="section-box info-section">
                    <h2 className="section-title" style={{ fontSize: "22px" }}>Thông tin chung</h2>
                    <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                    <div className="company-info-grid">
                        <div><strong>Mô hình công ty:</strong> {company.infor?.model || "N/A"}</div>
                        <div><strong>Lĩnh vực:</strong> {company.infor?.industry || "N/A"}</div>
                        <div><strong>Quy mô:</strong> {company.infor?.size || "N/A"}</div>
                        <div><strong>Quốc gia:</strong> {company.infor?.country || "N/A"}</div>
                        <div><strong>Thời gian làm việc:</strong> {company.infor?.workingDay || "N/A"}</div>
                    </div>
                </section>
            </Card>

            {/* Introduction Section */}
            <Card className="company-intro-card" style={{ marginBottom: 24, padding: "24px" }}>
                <section className="section-box intro-section">
                    <h2 className="section-title" style={{ fontSize: "22px" }}>Giới thiệu công ty</h2>
                    <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                    <div style={{ whiteSpace: "pre-line", fontSize: "16px" }}>{company.description}</div>
                    <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                    <div style={{ display: "flex", gap: 24, marginTop: 12, fontSize: "16px" }}>
                        {/* Email */}
                        <Tooltip title={company.contactEmail || "Chưa có email"}>
                            <span style={{ color: "#1a0dab", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                                <MailOutlined /> Email liên hệ
                            </span>
                        </Tooltip>

                        {/* Phone */}
                        <Tooltip title={company.contactPhone || "Chưa có số điện thoại"}>
                            <span style={{ color: "#1a0dab", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                                <PhoneOutlined /> Số điện thoại liên hệ
                            </span>
                        </Tooltip>
                    </div>
                </section>
            </Card>

            {/* Expertise Section */}
            {company.keySkills?.length > 0 && (
                <Card className="company-intro-card" style={{ marginBottom: 24, padding: "24px" }}>
                    <section className="section-box intro-section">
                        <h2 className="section-title" style={{ fontSize: "22px" }}>Chuyên môn của chúng tôi</h2>
                        <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                        <div style={{ marginTop: 8 }}>
                            {company.keySkills.map((tag, idx) => (
                                <Tag
                                    key={idx}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '12px',
                                        marginRight: '8px',
                                        marginTop: '4px',
                                        display: 'inline-block',
                                        borderRadius: '16px',
                                    }}
                                >
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    </section>
                </Card>
            )}

            {/* Why Love Section */}
            {company.whyLove?.length > 0 && (
                <Card className="company-love-card" style={{ padding: "24px" }}>
                    <section className="section-box love-section">
                        <h2 className="section-title" style={{ fontSize: "20px" }}>Tại sao bạn sẽ yêu thích làm việc tại đây</h2>
                        <Divider style={{ borderColor: "#dedede", borderTop: "2px dashed rgba(0, 0, 0, 0.1)" }} />
                        <ul className="love-list">
                            {company.whyLove.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>
                </Card>
            )}
        </main>
    );
}

export default CompanyIntro;
