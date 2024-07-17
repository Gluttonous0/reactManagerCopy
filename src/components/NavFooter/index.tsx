/**
 *
 * @returns 脚部页面
 */
import styles from "./index.module.less";
export default function NavFooter() {
  return (
    <div className={styles.footer_content}>
      <div className={styles.first_row}>
        <a href='#'>河畔一角</a>
        <span>|</span>
        <a href='#'>React18开发</a>
        <span>|</span>
        <a href='#'>VUE全家桶</a>
        <span>|</span>
        <a href='#'>Vue3全栈</a>
      </div>
      <div>React通用后台管理系统</div>
    </div>
  );
}
