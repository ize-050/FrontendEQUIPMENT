'use client';

import styles from './add-equipment.module.css';

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="60" height="60">
    <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    <path d="M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
  </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#2a5b3e" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    </svg>
);

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.hamburgerIcon}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export default function AddEquipmentPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
            <div className={styles.logo}>SMART/AGRIRENT</div>
            <div className={styles.logoSubtext}>AGRICULTURAL EQUIPMENT RENTAL PLATFORM</div>
        </div>
        <div className={styles.navWrapper}>
            <nav className={styles.nav}>
                <a href="#" className={styles.navLink}>หน้าแรก v</a>
                <a href="#" className={styles.navLink}>ค้นหาเครื่องจักร v</a>
                <a href="#" className={styles.navLink}>นโยบายส่วนตัว v</a>
            </nav>
        </div>
        <div className={styles.userActions}>
            <div className={styles.profile}>
                <img src="/user-placeholder.svg" alt="Somboy" className={styles.profileImage} />
                <span>Somboy</span>
            </div>
            <HamburgerIcon />
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>เพิ่มอุปกรณ์</h1>
        <div className={styles.formContainer}>
            <div className={styles.uploadSection}>
                <div className={styles.uploadCircle}>
                    <CameraIcon />
                </div>
                <p>อัพโหลดภาพสินค้า</p>
            </div>
            <form className={styles.form}>
                <div className={styles.inputGroup}><label>ชื่อสินค้า :</label><input type="text" className={styles.input} /></div>
                <div className={styles.inputGroup}><label>หมวดหมู่ :</label><select className={styles.select}><option>เลือกหมวดหมู่</option></select></div>
                <div className={styles.inputGroup}><label>คุณสมบัติ :</label><input type="text" className={styles.input} /></div>
                <div className={styles.inputGroup}><label>รายละเอียด :</label><textarea className={styles.textarea}></textarea></div>
                <div className={styles.inputGroup}><label>ที่อยู่ของสินค้า :</label><textarea className={styles.textarea}></textarea></div>
                <div className={styles.inputGroup}>
                    <label>ราคาที่ปล่อยเช่า :</label>
                    <div className={styles.priceInputWrapper}>
                        <input type="text" className={styles.priceInput} />
                        <button type="button" className={styles.plusButton}><PlusIcon /></button>
                    </div>
                </div>
                <div className={styles.submitButtonWrapper}>
                    <button type="submit" className={styles.submitButton}>บันทึกและเผยแพร่</button>
                </div>
            </form>
        </div>
      </main>
    </div>
  );
}
