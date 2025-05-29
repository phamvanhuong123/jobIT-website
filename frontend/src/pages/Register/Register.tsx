
import styles from "./Register.module.css";
import { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    setError("");
    alert("Đăng ký thành công!");
  };
  
  return (
    <>
      
      <div className={styles.registerContainer}>
      <h2 className={styles.title}>Đăng ký tài khoản</h2>
 
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Họ và Tên *</label>
        <input type="text" placeholder="Nhập họ và tên" />

        <label>Email *</label>
        <input type="email" placeholder="Nhập email" />

          <label>Mật khẩu *</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Nhập lại mật khẩu *</label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={password && confirmPassword && password !== confirmPassword ? styles.errorInput : ""}
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
          <input type="checkbox" />
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
    </>
);
};


export default Register;
