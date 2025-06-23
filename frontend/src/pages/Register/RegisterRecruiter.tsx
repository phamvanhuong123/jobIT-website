import styles from "./RegisterRecruiter.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { registerRecruiter } from "~/services/account.axios";

const RegisterRecruiter = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,}$/;

    if (!passwordRegex.test(password)) {
      setError("Mật khẩu không đáp ứng đủ điều kiện bảo mật!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      await registerRecruiter({ email }); // gọi API thông qua service

      // Lưu vào cookie trong 1 giờ
      const oneHour = 1 / 24; // 1 giờ = 1/24 ngày
      Cookies.set("email", email, { expires: oneHour });
      Cookies.set("password", password, { expires: oneHour });
      Cookies.set("companyName", companyName, { expires: oneHour });
     

      navigate("/xac-thuc-email-nha-tuyen-dung");
    } catch (error) {
      console.error("Lỗi gửi email OTP:", error);
      setError("Không thể gửi email xác thực. Vui lòng thử lại.");
    }
  };

  return (
    <div className={styles.registerContainer}>
       <h2 className={styles.title}>
            Đăng kí{" "}
            <span style={{ color: "#1a2b38" }}>Job</span>
            <span style={{ color: "#6A5AF9" }}>IT</span>{" "}
            <span style={{ color: "red" }}>Recruiter</span>
          </h2>



      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Tên công ty *</label>
        <input
          type="text"
          placeholder="Nhập tên công ty"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <label>Email*</label>
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

      

        <label>Mật khẩu *</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Nhập lại mật khẩu *</label>
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={
            password && confirmPassword && password !== confirmPassword
              ? styles.errorInput
              : ""
          }
          required
        />

        {error && <p className={styles.errorText}>{error}</p>}

        <ul className={styles.requirements}>
          <li>Ít nhất 12 ký tự</li>
          <li>Ít nhất 1 ký tự đặc biệt (! @ # $ ...)</li>
          <li>Ít nhất 1 số</li>
          <li>Ít nhất 1 chữ viết HOA</li>
          <li>Ít nhất 1 chữ viết thường</li>
        </ul>

       <label className={styles.checkbox}>
          <input type="checkbox" required />
          <span>
            Tôi đã đọc và đồng ý với các{" "}
            <a href="#">Điều khoản dịch vụ</a> và{" "}
            <a href="#">Chính sách quyền riêng tư</a>.
          </span>
        </label>

        <button type="submit" className={styles.submitBtn}>
          Đăng ký nhà tuyển dụng
        </button>
      </form>

      <p className={styles.loginRedirect}>
        Đã có tài khoản nhà tuyển dụng?{" "}
        <Link to="/dang-nhap-nha-tuyen-dung">Đăng nhập ngay!</Link>
      </p>
    </div>
  );
};

export default RegisterRecruiter;
