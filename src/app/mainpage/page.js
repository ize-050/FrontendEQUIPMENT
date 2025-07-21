'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './mainpage.module.css';

export default function MainPage() {
  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false);

  const toggleTenantDropdown = () => {
    setIsTenantDropdownOpen(!isTenantDropdownOpen);
    setIsOwnerDropdownOpen(false); // Close other dropdown
  };

  const toggleOwnerDropdown = () => {
    setIsOwnerDropdownOpen(!isOwnerDropdownOpen);
    setIsTenantDropdownOpen(false); // Close other dropdown
  };

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
          <div className={styles.dropdownContainer}>
            <button className={`${styles.actionButton} ${styles.tenant}`} onClick={toggleTenantDropdown}>
              ผู้เช่า v
            </button>
            {isTenantDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/Farmer/login" className={styles.dropdownItem}>เข้าสู่ระบบ</Link>
                <Link href="/Farmer/register" className={styles.dropdownItem}>สมัครสมาชิก</Link>
              </div>
            )}
          </div>
          <div className={styles.dropdownContainer}>
            <button className={`${styles.actionButton} ${styles.owner}`} onClick={toggleOwnerDropdown}>
              เจ้าของเครื่องมือ v
            </button>
            {isOwnerDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/Owner/loginowner" className={styles.dropdownItem}>เข้าสู่ระบบ</Link>
                <Link href="/Owner/registerowner" className={styles.dropdownItem}>สมัครสมาชิก</Link>
              </div>
            )}
          </div>
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
