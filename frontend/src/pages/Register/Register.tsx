import styles from "./Register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,}$/;

    if (!passwordRegex.test(password)) {
      setError("Mật khẩu không đáp ứng đủ điều kiện bảo mật!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    setError("");

    // ✅ Không dùng alert
    navigate("/xac-thuc-email");
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Đăng ký tài khoản</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Họ và Tên *</label>
        <input type="text" placeholder="Nhập họ và tên" required />

        <label>Email *</label>
        <input type="email" placeholder="Nhập email" required />

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
