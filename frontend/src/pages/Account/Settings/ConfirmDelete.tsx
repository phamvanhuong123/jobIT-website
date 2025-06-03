import styles from "./DeleteAccountConfirm.module.css";
import { useState, useEffect } from "react";

function DeleteAccountConfirm() {
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 phút
  useEffect(() => {
  const timer = setInterval(() => {
    setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
  }, 1000);
  return () => clearInterval(timer);
}, []);

  // Gọi API gửi lại mã (nếu cần)
  const handleResend = () => {
    // TODO: Gọi API gửi lại mã
    setSecondsLeft(180);
  };

   const handleSubmit = () => {
    if (code === "123456") {
      alert("✅ Tài khoản đã được xoá thành công.");
    } else {
      alert("❌ Mã xác nhận không đúng. Vui lòng kiểm tra lại.");
    }
  };

  return (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <h2>Xác nhận xoá tài khoản</h2>
      <p>Vui lòng nhập mã đã được gửi qua email để xác nhận xoá tài khoản:</p>
      <input
        type="text"
        placeholder="Nhập mã xác nhận"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={styles.input}
      />
      <p>
        Mã xác nhận sẽ hết hạn sau 3 giờ.{" "}
        {secondsLeft > 0 ? (
          <span className={styles.resend}>Yêu cầu mã mới ({secondsLeft}s)</span>
        ) : (
          <button className={styles.resendButton} onClick={handleResend}>
            Gửi lại mã
          </button>
        )}
      </p>

      <button
        className={styles.button}
        disabled={!code.trim()}
        onClick={handleSubmit}
      >
        Tiếp tục
      </button>
    </div>

  </div>
);
}

export default DeleteAccountConfirm;
