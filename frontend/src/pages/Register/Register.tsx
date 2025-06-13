import styles from "./Register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState("");
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
      // Gửi email để tạo OTP
      await axios.post("http://localhost:5000/api/register", { email });

      // Lưu tạm thông tin vào localStorage để dùng bên VerifyCode
      localStorage.setItem(
        "registerInfo",
        JSON.stringify({ email, password, fullName })
      );

      // Điều hướng sang trang xác thực email
      navigate("/xac-thuc-email");
    } catch (error) {
      console.error("Lỗi gửi email OTP:", error);
      setError("Không thể gửi email xác thực. Vui lòng thử lại.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Đăng ký tài khoản</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Họ và Tên *</label>
        <input
          type="text"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Email *</label>
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
          Tôi đã đọc và đồng ý với các{" "}
          <a href="#">Điều khoản dịch vụ</a> và{" "}
          <a href="#">Chính sách quyền riêng tư</a>.
        </label>

        <button type="submit" className={styles.submitBtn}>
          Đăng ký bằng Email
        </button>
      </form>

      <p className={styles.loginRedirect}>
        Bạn đã có tài khoản? <Link to="/dang-nhap">Đăng nhập ngay!</Link>
      </p>
    </div>
  );
};

export default Register;
