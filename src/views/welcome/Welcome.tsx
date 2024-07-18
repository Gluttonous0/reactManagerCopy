/**
 * 欢迎页面
 * @returns
 */
import styles from "./index.module.less";

export default function Welcome() {
  return (
    <div className={styles.content}>
      <div>
        <p className={styles.first_row}>欢迎体验</p>
        <p className={styles.second_row}>React18登录后台管理系统</p>
        <p className={styles.third_row}>React18+ReactRouter6.0+</p>
      </div>
      <div className={styles.imgs}></div>
    </div>
  );
}
