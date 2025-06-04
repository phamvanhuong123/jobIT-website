import { Link, useNavigate } from "react-router";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import { login, verifitoken } from "~/services/account.axios";
import PriveRoutes from "~/components/PriveRoutes/PriveRoutes";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message,setMessage] = useState('')
  const navigate = useNavigate();
  // thay doi data
  const onchangeValue = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await login(formData);
    
    if (res.data) {
      localStorage.setItem("token",res.data.token);
      navigate('/')
      return
    }
    setMessage(res.message.toString());
    setFormData({
        email : '',
        password : ''
    })
  };
  return (
    <>
      <div className={styles.loginContainer}>
        <h2>
          Chào mừng bạn đến với{" "}
          <span className={styles.itviec}>
            Job<span className={styles.red}>IT</span>
          </span>
        </h2>

        <p>
          Bằng việc đăng nhập, bạn đồng ý với các{" "}
          <a href="#">Điều khoản dịch vụ</a> và{" "}
          <a href="#">Chính sách quyền riêng tư</a> của ITviec.
        </p>

        <button className={styles.googleLogin}>Đăng nhập bằng Google</button>

        <div className={styles.divider}>hoặc</div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onchangeValue}
            value={formData.email}
          />

          <label>Mật khẩu *</label>
          <div className={styles.passwordField}>
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              onChange={onchangeValue}
              value={formData.password}
            />
            <span className={styles.eyeIcon}></span>
          </div>
          {message && <p style={{color : 'red',fontSize : 12}}>email hoặc mật khẩu không chính xác</p>}

          <a href="#" className={styles.forgotPassword}>
            Quên mật khẩu?
          </a>
          <button type="submit" className={styles.emailLogin}>
            Đăng nhập bằng Email
          </button>
        </form>

        <p className={styles.register}>
          Bạn chưa có tài khoản? <Link to="/dang-ki">Đăng ký ngay</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
