import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VerifyCode.module.css";
import Cookies from "js-cookie";
import { registerUser, registerOTPUser } from "~/services/account.axios";

const VerifyCode: React.FC = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(true);
  const navigate = useNavigate();

  // Lấy dữ liệu từ cookie
  const email = Cookies.get("email");
  const password = Cookies.get("password");
  const fullName = Cookies.get("fullName");

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
    if (!email || !password || !fullName) {
      setMessage("❌ Thiếu thông tin đăng ký. Vui lòng thử lại từ đầu.");
      setStatus("error");
      return;
    }

    try {
      await registerOTPUser({
        email,
        password,
        username: fullName,
        otp: code,
      });

      setMessage("✅ Xác thực thành công!");
      setStatus("success");

      // Xoá cookies sau khi xác thực xong
      Cookies.remove("email");
      Cookies.remove("password");
      Cookies.remove("fullName");

      setTimeout(() => {
        navigate("/dang-nhap");
      }, 2000);
    } catch (err) {
      console.error("Lỗi xác thực OTP:", err);
      setMessage("❌ Mã không đúng hoặc đã hết hạn.");
      setStatus("error");
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setMessage("❌ Không tìm thấy email để gửi lại mã.");
      setStatus("error");
      return;
    }

    try {
      await registerUser({ email }); // gọi từ service
      setCountdown(60);
      setIsCounting(true);
      setMessage("📨 Mã mới đã được gửi vào email của bạn!");
      setStatus("success");
    } catch (err) {
      console.error("Lỗi gửi lại mã:", err);
      setMessage("❌ Không thể gửi lại mã. Vui lòng thử lại.");
      setStatus("error");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Xác Thực Email</h2>
      <p>Nhập mã đã gửi đến email của bạn:</p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleVerify()}
        placeholder="Nhập mã xác thực"
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

export default VerifyCode;
