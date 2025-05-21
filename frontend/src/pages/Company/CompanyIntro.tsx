import { Card, Tag } from "antd";

function CompanyIntro() {
    const jobData = {
        title: "Project Manager (Agile, Japanese)",
        company: {
            name: "NEXON DEV VINA",
            rating: 4.8,
            logo: "https://company.nexon.com/en/assets/img/logo.png",
            locations: [
                "UOA Tower, 11th Floor, 06 Tan Trao Street, Tan Phu Ward, District 7, Ho Chi Minh",
            ],
            workingTime: "Thứ 2 - Thứ 6",
            posted: "Đăng 3 ngày trước",
            skills: ["Java", "NodeJS", "ReactJS", "JavaScript", "CSS", "Spring"],
            type: "Sản phẩm",
            field: "Phát triển Game",
            ot: "Thêm lương OT",
            size: "51-150 nhân viên",
            country: "South Korea",
            workTime: "Thứ 2 - Thứ 6",
            model: "Startup game development",
            introduction: [
                "NEXON DEV VINA",
                "NEXON DEV VINA is a startup game development company in Vietnam. As a proud member of the Nexon Company Group, we have expertise in online game development on vast different programs to provide the best gaming experience to global users.",
                "The basis and strength behind our rapid growth worldwide derive from our employees. We are expecting passionate, self-challenging and eager individuals to apply and join our journey to success.",
                "NEXON Group currently services nearly 100 titles (MapleStory, Dungeon & Fighter, Sudden Attack, KartRider, FIFA ONLINE 4, V4, AXE …) in more than 190 countries and expanding worldwide team of over 6,500 employees with boasts a diverse global portfolio. ",
                "Nexon is well known as the No.1 game company in Korea and is looking ahead to entering the world's top 10 game companies this year. "
            ],
            website: "https://company.nexon.com/en/",
            linkedIn: "https://www.linkedin.com/company/nexon-dev-vina/",
            blog: "https://labstechblog.oopy.io/",
            irInfo: "https://ir.nexon.co.jp/kr",
            whyLove: [
                "13th Month salary, work 5 days a week",
                "Annual Company Trip, Quarterly team building",
                "Premium health insurance, Support sport clubs",
                "Chance to work on global projects with multicultural teams, world-class games.",
                "Attractive salary and benefits.",
                "Professional work environment.",
                "Open culture where every employee is valued, treated fairly, and trusted.",
                "From 12 days Annual Leave",
                "Government social, health, and unemployment insurance.",
                "Lunch Allowance",
                "Annual salary review based on employee performance and company success",
                "Events during Birthday, Full Moon Festival, other important holidays",
            ],
            location: "TP Hồ Chí Minh",
        },
    };
    const { company } = jobData;

    return (
        <main className="company-intro-main" style={{ padding: "16px" }}>
            {/* Info Section */}
            <Card className="company-info-card" style={{ marginBottom: 24 }}>
                <section className="section-box info-section">
                    <h2 className="section-title">Thông tin chung</h2>
                    <div className="company-info-grid">
                        <div><strong>Mô hình công ty:</strong> {company.type}</div>
                        <div><strong>Lĩnh vực:</strong> {company.field}</div>
                        <div><strong>Quy mô:</strong> {company.size}</div>
                        <div><strong>Quốc gia:</strong> {company.country}</div>
                        <div><strong>Thời gian làm việc:</strong> {company.workTime}</div>
                        <div><strong>Làm việc ngoài giờ:</strong> {company.ot}</div>
                    </div>
                </section>
            </Card>

            {/* Introduction Section */}
            <Card className="company-intro-card" style={{ marginBottom: 24 }}>
                <section className="section-box intro-section">
                    <h2 className="section-title">Giới thiệu công ty</h2>
                    <ul className=" intro-text">
                        {company.introduction.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>
                <section className="section-box links-section">
                    <p>To know more about us, please check:</p>
                    <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a></p>
                    <p><strong>LinkedIn:</strong> <a href={company.linkedIn} target="_blank" rel="noreferrer">{company.linkedIn}</a></p>
                    <p><strong>Blog:</strong> <a href={company.blog} target="_blank" rel="noreferrer">{company.blog}</a></p>
                    <p><strong>IR Info:</strong> <a href={company.irInfo} target="_blank" rel="noreferrer">{company.irInfo}</a></p>
                </section>
            </Card>
            {/* Expertise */}
            <Card className="company-intro-card" style={{ marginBottom: 24 }}>
                <section className="section-box intro-section">
                    <h2 className="section-title">Chuyên môn của chúng tôi</h2>
                    <div style={{ marginTop: 8 }}>
                        <p>Our main skills</p>
                        {company.skills.map((tag, idx) => (
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

            {/* Why Love Section */}
            <Card className="company-love-card">
                <section className="section-box love-section">
                    <h2 className="section-title">Why You Should Love Working Here</h2>
                    <ul className="love-list">
                        {company.whyLove.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>
            </Card>
        </main >
    );
}
export default CompanyIntro;