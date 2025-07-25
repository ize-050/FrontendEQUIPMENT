'use client';

import MainHeader from '../../components/MainHeader';
import styles from './mainpage.module.css';

export default function MainPage() {
  return (
    <div className={styles.container}>
      <MainHeader />

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
