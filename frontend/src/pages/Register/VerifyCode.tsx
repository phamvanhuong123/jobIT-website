import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VerifyCode.module.css";




const VerifyCode: React.FC = () => {
console.log("✅ VerifyCode component is rendered!");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(true);
  useEffect(() => {
  let timer: NodeJS.Timeout;

  if (isCounting && countdown > 0) {
    timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  }

  if (countdown === 0) {
    setIsCounting(false); // cho phép gửi lại
  }

  return () => clearTimeout(timer);
}, [countdown, isCounting]);


  const handleVerify = () => {
    if (code === "123456") {
      setStatus("success");
      setMessage("✅ Xác thực thành công!");

      // ✅ Điều hướng sang trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate("/dang-nhap");
      }, 2000);
    } else {
      setStatus("error");
      setMessage("❌ Mã không đúng, vui lòng kiểm tra lại.");
    }
  };

  const handleResendCode = () => {
    alert("📨 Mã xác thực đã được gửi lại vào email của bạn!");
    setCountdown(60);
    setIsCounting(true);
  };

  return (
    <div className={styles.container}>
      <h2>Xác Thực Email</h2>
      <p>Nhập mã đã gửi đến email của bạn:</p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleVerify();
        }}
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
