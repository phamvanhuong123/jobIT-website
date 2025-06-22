import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VerifyCode.module.css";
import { registerOTP, register } from "../../services/account.axios";
import Cookies from "js-cookie";

const VerifyRecruiter: React.FC = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(true);
  const navigate = useNavigate();

  // Lấy email và mật khẩu từ cookie
  const email = Cookies.get("email");
  const password = Cookies.get("password");
  const companyName = Cookies.get("companyName");
  const companyPhone = Cookies.get("companyPhone");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }

    if (countdown === 0) {
      setIsCounting(false);
    }

    return () => clearTimeout(timer);
  }, [countdown, isCounting]);

  const handleVerify = async () => {
    if (!email || !password || !companyName || !companyPhone) {
      setMessage("❌ Thiếu thông tin đăng ký. Vui lòng đăng ký lại.");
      setStatus("error");
      return;
    }

    try {
      await registerOTP({
        email,
        password,
        companyName,
        companyPhone,
        otp: code,
      });

      // Xoá cookie sau khi xác thực xong
      Cookies.remove("email");
      Cookies.remove("password");
      Cookies.remove("companyName");
      Cookies.remove("companyPhone");

      setStatus("success");
      setMessage("✅ Xác thực thành công!");
      setTimeout(() => {
        navigate("/dang-nhap-nha-tuyen-dung");
      }, 2000);
    } catch (error) {
      console.error("Lỗi xác thực OTP:", error);
      setStatus("error");
      setMessage("❌ Mã không đúng hoặc đã hết hạn.");
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setMessage("❌ Không tìm thấy email để gửi lại mã.");
      setStatus("error");
      return;
    }

    try {
      await register({ email });
      setCountdown(60);
      setIsCounting(true);
      setMessage("📨 Mã mới đã được gửi vào email!");
      setStatus("success");
    } catch (err) {
      console.error("Lỗi gửi lại mã:", err);
      setStatus("error");
      setMessage("❌ Không thể gửi lại mã. Vui lòng thử lại.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Xác Thực Email Nhà Tuyển Dụng</h2>
      <p>Nhập mã xác thực đã gửi đến email công ty:</p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Nhập mã"
        onKeyDown={(e) => e.key === "Enter" && handleVerify()}
        className={styles.input}
      />
      <button onClick={handleVerify} className={styles.button}>
        Xác Thực
      </button>

      {message && (
        <p className={status === "success" ? styles.success : styles.error}>
          {message}
        </p>
      )}

      <p className={styles.resendText}>
        {!isCounting ? (
          <>
            Không nhận được mã?{" "}
            <button className={styles.resendButton} onClick={handleResendCode}>
              Gửi lại mã
            </button>
          </>
        ) : (
          <>Gửi lại mã sau {countdown}s</>
        )}
      </p>
    </div>
  );
};

export default VerifyRecruiter;
