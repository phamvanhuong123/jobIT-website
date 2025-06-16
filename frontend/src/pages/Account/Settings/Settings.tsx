import { useAppSelector } from "~/store";
import styles from "./Settings.module.css";
import { Link, useNavigate } from "react-router";



function Settings(){
    const navigate = useNavigate();
    const user = useAppSelector(state => state.userCandidate.candidate)
    return (
      <>
        <main className={styles.settingsContent}>
          <section className={styles.card}>
            <h4>Thông tin tài khoản</h4>
            <p>Email: <strong>{user?.email}</strong></p>
            <p className={styles.note}>Không thể thay đổi email đăng nhập.</p>
            <p>Họ và Tên: <strong>{user?.fullName}</strong></p>
            <p className={styles.note}>Tên tài khoản được đồng bộ với thông tin hồ sơ.</p>
            <Link  to="/user/ho-so-cv">Cập nhật thông tin hồ sơ</Link>
          </section>

          <section className={styles.card}>
            <h4>Mật khẩu</h4>
            <p className={styles.note}>Không có mật khẩu đối với tài khoản đăng ký bằng Google.</p>
          </section>
          
          <section className={`${styles.card} ${styles.danger}`}>
            <h4>Xoá tài khoản</h4>
            <p>
              Thao tác xoá tài khoản là vĩnh viễn và không thể hoàn tác.
             
            </p>
          <button
            className={styles.deleteButton}
            onClick={() => navigate("/xac-nhan-xoa")}
          >
            Xoá tài khoản
          </button>

          </section>
        </main>
       
      </>
    );
}
export default Settings;
