'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './loginowner.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
  </svg>
);

export default function LoginOwnerPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!username || !password){
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูล',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }

    const loginData = {
      ownerUserName: username,
      ownerPassword: password,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/login`, loginData);

      if (response.status === 200) {
        // Store login response in localStorage
        const loginResponse = response.data;
        localStorage.setItem('ownerAuth', JSON.stringify({
          token: loginResponse.token,
          type: loginResponse.type,
          ownerId: loginResponse.ownerId,
          username: loginResponse.ownerUserName,
          message: loginResponse.message
        }));

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: loginResponse.message,
        }).then(() => {
          // Redirect to home page after successful login
          window.location.href = '/';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed!',
          text: 'Unknown error',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: 'An error occurred: ' + error.message,
      });
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

      <div className={styles.loginBanner}>
        <h1>เจ้าของเครื่องมือ : Login/เข้าสู่ระบบ</h1>
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
