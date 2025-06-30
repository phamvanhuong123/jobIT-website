import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginRecruiter.module.css";
import { loginEmployee } from "~/services/account.axios";
import { toast } from "react-toastify";

console.log(" Đã vào LoginRecruiter.tsx");

const LoginRecruiter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try{
      const response = await loginEmployee({email : email,password : password})
     
      if (response.data){
        localStorage.setItem("token",response.data?.token)
        toast.success("Đăng nhập thành công")
        navigate('/admin')

      }
    }
    catch(e){
      toast.error("Tên đăng nhập hoặc mật khẩu không hợp lệ")
    }
  };
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2 className={styles.title}>
            Đăng nhập{" "}
            <span style={{ color: "#1a2b38" }}>Job</span>
            <span style={{ color: "#6A5AF9" }}>IT</span>{" "}
            <span style={{ color: "red" }}>Recruiter</span>
          </h2>


          <form onSubmit={handleSubmit}> 
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                className={styles.input}
                placeholder="company@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Mật khẩu</label>
              <input
                type="password"
                className={styles.input}
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}

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
              Bạn chưa có tài khoản?{" "}
              <Link to="/dang-ky-nha-tuyen-dung">Đăng ký ngay</Link>
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
