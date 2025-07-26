'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './MainHeader.module.css';

export default function MainHeader() {
  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in by reading from localStorage
    const farmerAuth = localStorage.getItem('farmerAuth');
    const ownerAuth = localStorage.getItem('ownerAuth');
    
    if (farmerAuth) {
      try {
        const authData = JSON.parse(farmerAuth);
        setUser({ ...authData, userType: 'farmer' });
      } catch (error) {
        console.error('Error parsing farmer auth data:', error);
        localStorage.removeItem('farmerAuth');
      }
    } else if (ownerAuth) {
      try {
        const authData = JSON.parse(ownerAuth);
        setUser({ ...authData, userType: 'owner' });
      } catch (error) {
        console.error('Error parsing owner auth data:', error);
        localStorage.removeItem('ownerAuth');
      }
    }
  }, []);

  const toggleTenantDropdown = () => {
    setIsTenantDropdownOpen(!isTenantDropdownOpen);
    setIsOwnerDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const toggleOwnerDropdown = () => {
    setIsOwnerDropdownOpen(!isOwnerDropdownOpen);
    setIsTenantDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsTenantDropdownOpen(false);
    setIsOwnerDropdownOpen(false);
  };

  const handleLogout = () => {
    // Remove both farmer and owner auth data
    localStorage.removeItem('farmerAuth');
    localStorage.removeItem('ownerAuth');
    setUser(null);
    setIsUserDropdownOpen(false);
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div>
          <div className={styles.logo}>SMART/AGRIRENT</div>
          <div className={styles.logoSubtext}>AGRICULTURAL EQUIPMENT RENTAL PLATFORM</div>
        </div>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>หน้าแรก</Link>
        <Link href="/search" className={styles.navLink}>ค้นหาเครื่องจักร</Link>
        <Link href="/privacy" className={styles.navLink}>นโยบายส่วนตัว</Link>
      </nav>
      <div className={styles.userActions}>
        {user ? (
          // Show user dropdown when logged in
          <div className={styles.dropdownContainer}>
            <button 
              className={`${styles.actionButton} ${styles.userButton}`} 
              onClick={toggleUserDropdown}
            >
              สวัสดี, {user.username} ▼
            </button>
            {isUserDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {user.userType === 'owner' ? (
                  // Owner menu options
                  <>
                    <Link href="/owner/equipment" className={styles.dropdownItem}>รายการอุปกรณ์ของฉัน</Link>
                    <Link href="/owner/bookings" className={styles.dropdownItem}>รายการจอง</Link>
                    <Link href="/owner/delivery-update" className={styles.dropdownItem}>update การจัดส่งรับสินค้า</Link>
                    <Link href="/owner/delivery-list" className={styles.dropdownItem}>รายการจัดส่งรับสินค้า</Link>
                    <button onClick={handleLogout} className={styles.dropdownItem}>
                      ออกจากระบบ
                    </button>
                  </>
                ) : (
                  // Farmer menu options
                  <>
                    <Link href="/farmer/my-bookings" className={styles.dropdownItem}>รายการจองฉัน</Link>
                    <button onClick={handleLogout} className={styles.dropdownItem}>
                      ออกจากระบบ
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          // Show login/register dropdowns when not logged in
          <>
            <div className={styles.dropdownContainer}>
              <button className={`${styles.actionButton} ${styles.tenant}`} onClick={toggleTenantDropdown}>
                ผู้เช่า ▼
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
                เจ้าของเครื่องมือ ▼
              </button>
              {isOwnerDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/Owner/loginowner" className={styles.dropdownItem}>เข้าสู่ระบบ</Link>
                  <Link href="/Owner/registerowner" className={styles.dropdownItem}>สมัครสมาชิก</Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
