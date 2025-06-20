import { Link, useNavigate, useLocation } from "react-router";
import styles from "./Login.module.css";
import { FormEvent, useEffect, useState } from "react";
import { login, verifitoken } from "~/services/account.axios";
import { fetchCandidateById } from "~/features/candidate.slice";
import { useAppDispatch } from "~/store";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [cheking, setCheking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.redirectTo || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const checkLogin = async () => {
    const response = await verifitoken();
    if (response.data) {
      navigate("/");
    } else {
      setCheking(true);
    }
  };

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
      localStorage.setItem("token", res.data.token);
      dispatch(fetchCandidateById(res.data.user.idAccount));
      toast.success("Đăng nhập thành công");
      navigate(redirectPath); // 👉 quay về trang ban đầu
      return;
    }

    setMessage(res.message.toString());
    setFormData({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (!cheking) return null;

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
          {message && (
            <p style={{ color: "red", fontSize: 12 }}>
              email hoặc mật khẩu không chính xác
            </p>
          )}

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
