'use client';

import styles from './mainpage.module.css';

export default function MainPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div>
            <div className={styles.logo}>SMART/AGRIRENT</div>
            <div className={styles.logoSubtext}>AGRICULTURAL EQUIPMENT RENTAL PLATFORM</div>
          </div>
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>หน้าแรก v</a>
          <a href="#" className={styles.navLink}>ค้นหาเครื่องจักร v</a>
          <a href="#" className={styles.navLink}>นโยบายส่วนตัว v</a>
        </nav>
        <div className={styles.userActions}>
          <button className={`${styles.actionButton} ${styles.tenant}`}>ผู้เช่า v</button>
          <button className={`${styles.actionButton} ${styles.owner}`}>เจ้าของเครื่องมือ v</button>
        </div>
      </header>

      <main className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
                <span>ค้นหา</span> <span>เปรียบเทียบ</span> <span>เช็คราคา</span> <span>ทุกที่ทุกเวลา</span>
            </h1>
            <button className={styles.heroButton}>ค้นหาอุปกรณ์</button>
        </div>
      </main>
    </div>
  );
}
