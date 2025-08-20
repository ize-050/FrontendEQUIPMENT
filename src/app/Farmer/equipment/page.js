'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './equipment.module.css';

const Header = () => (
  <header>
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <div>SMART/AGRIRENT</div>
          <div className={styles.logoSmallText}>AGRICULTURAL EQUIPMENT RENTAL PLATFORM</div>
        </Link>
      </div>
      <nav className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>หน้าแรก</Link>
        <Link href="/Farmer/equipment" className={styles.navLink}>ค้นหาเครื่องจักร</Link>
        <Link href="/" className={styles.navLink}>นโยบายส่วนตัว</Link>
      </nav>
      <div className={styles.userSection}>
        <div className={styles.userProfile}>
          <span>NUT.05</span>
        </div>
        <div className={styles.menuIcon}>☰</div>
      </div>
    </div>
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="คุณกำลังมองหาอะไร?" className={styles.searchInput} />
        <button className={styles.searchButton}>ค้นหา</button>
      </div>
    </div>
  </header>
);

export default function EquipmentPage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <h2 className={styles.categoryTitle}>หมวดหมู่</h2>
          <ul className={styles.categoryList}>
            <li>รถแบคโฮ</li>
            <li>รถบรรทุก</li>
            <li>รถเครน</li>
            <li>รถโฟล์คลิฟ</li>
            <li>รถกระเช้า</li>
            <li>รถแทรกเตอร์</li>
            <li>รถบดถนน</li>
            <li>รถสไลด์ออน</li>
            <li>รถเทรลเลอร์</li>
            <li>รถเกรดเดอร์</li>
            <li>คราวเลอร์เครน</li>
            <li>ทาวเวอร์เครน</li>
            <li>เครื่องปั่นไฟ</li>
          </ul>
        </aside>
        <div className={styles.bookingContainer}>
          <div className={styles.bookingSection}>
            <div className={styles.datePicker}>
              <label>เลือกวันที่</label>
              <input type="date" />
            </div>
            <div className={styles.datePicker}>
              <label>ส่งคืน</label>
              <input type="date" />
            </div>
          </div>
          <div className={styles.addressInputWrapper}>
            <label>ที่อยู่จัดส่ง</label>
            <input type="text" className={styles.addressInput} placeholder="" />
          </div>
          <button className={styles.bookButton}>สั่งจอง</button>
        </div>
      </main>
    </div>
  );
}