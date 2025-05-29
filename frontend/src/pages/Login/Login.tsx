
import { Link } from "react-router";
import styles from "./Login.module.css";

const Login = () => (
    <>


        <div className={styles.loginContainer}>
            <h2>
                Chào mừng bạn đến với <span className={styles.itviec}>Job<span className={styles.red}>IT</span></span>
            </h2>

            <p>
                Bằng việc đăng nhập, bạn đồng ý với các{" "}
                <a href="#">Điều khoản dịch vụ</a> và{" "}
                <a href="#">Chính sách quyền riêng tư</a> của ITviec.
            </p>

            <button className={styles.googleLogin}>Đăng nhập bằng Google</button>

            <div className={styles.divider}>hoặc</div>

            <form className={styles.loginForm}>
                <label>Email *</label>
                <input type="email" placeholder="Email" />

                <label>Mật khẩu *</label>
                <div className={styles.passwordField}>
                    <input type="password" placeholder="Mật khẩu" />
                    <span className={styles.eyeIcon}></span>
                </div>

                <a href="#" className={styles.forgotPassword}>Quên mật khẩu?</a>
                <button type="submit" className={styles.emailLogin}>Đăng nhập bằng Email</button>
            </form>

            <p className={styles.register}>
                Bạn chưa có tài khoản? <Link to="/dang-ki">Đăng ký ngay</Link>
            </p>
        </div>
        
    </>
);

export default Login;
