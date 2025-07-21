'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
  </svg>
);

export default function LoginPage() {
  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleTenantDropdown = () => {
    setIsTenantDropdownOpen(!isTenantDropdownOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/farmer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!' + JSON.stringify(data));
        // Optionally, redirect user or save token
      } else {
        alert('Login failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
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
          <button className={`${styles.actionButton} ${styles.owner}`}>เจ้าของเครื่องมือ v</button>
        </div>
      </header>

      <div className={styles.loginBanner}>
        <h1>ผู้เช่า : Login/เข้าสู่ระบบ</h1>
      </div>

      <main className={styles.main}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputIcon}>
              <UserIcon />
            </div>
            <input type="text" className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputIcon}>
              <LockIcon />
            </div>
            <input type="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
      </main>
    </div>
  );
}