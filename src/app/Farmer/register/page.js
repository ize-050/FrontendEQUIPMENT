
'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './register.module.css';

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="60" height="60">
    <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    <path d="M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
    <path d="M18 10h-2v-2h-2v2h-2v2h2v2h2v-2h2z"/>
  </svg>
);

const Step1Form = ({ onNext, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, email, setEmail }) => (
  <>
    <div className={styles.formContainer}>
      <div className={styles.uploadSection}>
        <div className={styles.uploadCircle}>
          <CameraIcon />
        </div>
        <p>อัพโหลดรูป</p>
      </div>
      <div className={styles.formSection}>
        <form className={styles.registerForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">ชื่อบัญชีผู้ใช้งาน</label>
            <input type="text" id="username" className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">รหัสผ่าน</label>
            <input type="password" id="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
            <input type="password" id="confirmPassword" className={styles.input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">อีเมล</label>
            <input type="email" id="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </form>
      </div>
    </div>
    <button type="button" onClick={onNext} className={styles.submitButton}>ถัดไป</button>
  </>
);

const Step2Form = ({ handleSubmit }) => (
    <div className={`${styles.formContainer} ${styles.step2FormContainer}`}>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>ชื่อ</label><input type="text" className={styles.input} /></div>
                <div className={styles.inputGroup}><label>นามสกุล</label><input type="text" className={styles.input} /></div>
            </div>
            <div className={styles.inputGroup}>
                <label>เพศ</label>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="gender" value="female" className={styles.radioInput} /> หญิง</label>
                    <label className={styles.radioLabel}><input type="radio" name="gender" value="male" className={styles.radioInput} /> ชาย</label>
                    <label className={styles.radioLabel}><input type="radio" name="gender" value="other" className={styles.radioInput} /> ไม่ระบุ</label>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>วันเกิด</label><input type="text" placeholder="วัน" className={styles.input} /></div>
                <div className={styles.inputGroup}><input type="text" placeholder="เดือน" className={styles.input} /></div>
                <div className={styles.inputGroup}><input type="text" placeholder="ปี" className={styles.input} /></div>
            </div>
            <div className={styles.inputGroup}><label>เบอร์ติดต่อ</label><input type="text" className={styles.input} /></div>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>บ้านเลขที่</label><input type="text" className={styles.input} /></div>
                <div className={styles.inputGroup}><label>ซอย</label><input type="text" className={styles.input} /></div>
                <div className={styles.inputGroup}><label>หมู่</label><input type="text" className={styles.input} /></div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>ตำบล/แขวง</label><select className={styles.selectInput}><option>เลือก...</option></select></div>
                <div className={styles.inputGroup}><label>อำเภอ/เขต</label><select className={styles.selectInput}><option>เลือก...</option></select></div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>จังหวัด</label><select className={styles.selectInput}><option>เลือก...</option></select></div>
                <div className={styles.inputGroup}><label>รหัสไปรษณีย์</label><input type="text" className={styles.input} /></div>
            </div>
            <button type="submit" className={styles.submitButton}>สมัครสมาชิก</button>
        </form>
    </div>
);

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    setStep(2);
  };

  const toggleTenantDropdown = () => {
    setIsTenantDropdownOpen(!isTenantDropdownOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/farmer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }), // Only sending relevant data for now
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!' + JSON.stringify(data));
        // Optionally, redirect user or show success message
      } else {
        alert('Registration failed: ' + (data.message || 'Unknown error'));
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

      <div className={styles.registerBanner}>
        <h1>ผู้เช่า : Register/สมัครสมาชิก</h1>
      </div>

      <main className={styles.main}>
        {step === 1 ? <Step1Form onNext={handleNext} username={username} setUsername={setUsername} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} email={email} setEmail={setEmail} /> : <Step2Form handleSubmit={handleSubmit} />}
      </main>
    </div>
  );
}


