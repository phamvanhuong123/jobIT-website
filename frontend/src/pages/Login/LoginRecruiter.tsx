import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginRecruiter.module.css";

console.log("✅ Đã vào LoginRecruiter.tsx");

const LoginRecruiter = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2 className={styles.title}>
            Đăng nhập JobIT <span className={styles.highlight}>Recruiter</span>
          </h2>

          <form>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                className={styles.input}
                placeholder="company@example.com"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Mật khẩu</label>
              <input
                type="password"
                className={styles.input}
                placeholder="********"
                required
              />
            </div>

            <div className={styles.options}>
              <label>
                <input type="checkbox" /> Ghi nhớ đăng nhập
              </label>
              <Link to="#">Quên mật khẩu?</Link>
            </div>

            <button type="submit" className={styles.loginButton}>
              Đăng nhập
            </button>
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              Bạn chưa có tài khoản? <Link to="/dang-ky-nha-tuyen-dung">Đăng ký ngay</Link>
            </p>

          </form>

          <p className={styles.policyText}>
            Bằng việc đăng nhập, bạn đồng ý với các{" "}
            <Link to="#">Điều khoản dịch vụ</Link> và{" "}
            <Link to="#">Chính sách riêng tư</Link> của JobIT.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginRecruiter;
