import styles from "./Settings.module.css";
import { useNavigate } from "react-router";



function Settings(){
    const navigate = useNavigate();

    return (
      <>
        <main className={styles.settingsContent}>
          <section className={styles.card}>
            <h4>Thông tin tài khoản</h4>
            <p>Email: <strong>dohonglinh0811@gmail.com</strong></p>
            <p className={styles.note}>Không thể thay đổi email đăng nhập.</p>
            <p>Họ và Tên: <strong>Đỗ Hồng Linh</strong></p>
            <p className={styles.note}>Tên tài khoản được đồng bộ với thông tin hồ sơ.</p>
            <a href="#">Cập nhật thông tin hồ sơ</a>
          </section>

          <section className={styles.card}>
            <h4>Mật khẩu</h4>
            <p className={styles.note}>Không có mật khẩu đối với tài khoản đăng ký bằng Google.</p>
          </section>

          <section className={styles.card}>
            <h4>Thông báo lời mời công việc</h4>
            <p>Cho phép nhận lời mời bằng email và SMS</p>
            <label>
              <input type="checkbox" checked readOnly /> Có
            </label>
            <div>
              <p>Không nhận lời mời công việc từ:</p>
              <input type="text" placeholder="Tìm kiếm công ty" />
              <p className={styles.note}>Chưa chọn công ty nào</p>
            </div>
          </section>

          <section className={`${styles.card} ${styles.danger}`}>
            <h4>Xoá tài khoản</h4>
            <p>
              Thao tác xoá tài khoản là vĩnh viễn và không thể hoàn tác.
              Nếu bạn xoá vì nhận quá nhiều email, bạn có thể huỷ đăng ký email <a href="#">tại đây</a>.
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
