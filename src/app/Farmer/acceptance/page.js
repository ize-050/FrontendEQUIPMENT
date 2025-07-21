'use client';

import styles from './terms.module.css';

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.hamburgerIcon}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export default function TermsPage() {
  const terms = [
    {
      title: "การยืนยันข้อมูลผู้เช่า",
      detail: "ผู้เช่าต้องให้ข้อมูลที่ถูกต้องและครบถ้วนสำหรับการติดต่อและการเช่า การให้ข้อมูลที่ไม่ถูกต้องอาจทำให้การเช่าเป็นโมฆะ"
    },
    {
      title: "การใช้งานอุปกรณ์",
      detail: "ผู้เช่าตกลงที่จะใช้อุปกรณ์ที่เช่าอย่างระมัดระวังและปฏิบัติตามคู่มือการใช้งานของอุปกรณ์ทุกประการ ห้ามนำอุปกรณ์ไปใช้นอกเหนือจากวัตถุประสงค์ที่ระบุไว้"
    },
    {
      title: "การห้ามใช้อุปกรณ์ในทางที่ผิดกฎหมาย",
      detail: "ผู้เช่าห้ามนำอุปกรณ์ไปใช้ในการกระทำที่ผิดกฎหมาย เช่น การตัดไม้ทำลายป่า การล่าสัตว์ การทำลายทรัพย์สินสาธารณะ หรือการกระทำกิจกรรมที่ละเมิดกฎหมายสิ่งแวดล้อม"
    },
    {
      title: "ความรับผิดชอบต่ออุปกรณ์",
      detail: "ผู้เช่าจะต้องรับผิดชอบในการดูแลรักษาอุปกรณ์ในช่วงระยะเวลาการเช่า หากอุปกรณ์เกิดความเสียหาย สูญหาย หรือถูกขโมย ผู้เช่าจะต้องชดใช้ค่าเสียหายตามมูลค่าของอุปกรณ์"
    },
    {
      title: "การคืนอุปกรณ์",
      detail: "ผู้เช่าต้องคืนอุปกรณ์ตามระยะเวลาที่กำหนดในสัญญาเช่า หากคืนล่าช้าหรือไม่คืนตามเงื่อนไข จะต้องชำระค่าปรับหรือค่าเช่าตามที่ตกลงไว้"
    },
    {
      title: "การยกเลิกการเช่า",
      detail: "ผู้เช่าสามารถยกเลิกการเช่าได้ภายใต้เงื่อนไขที่กำหนด เช่น การแจ้งล่วงหน้าภายในเวลาที่ระบุ หากยกเลิกหลังจากเวลาที่กำหนด ผู้เช่าอาจไม่ได้รับเงินคืน"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
            <div className={styles.logo}>SMART/AGRIRENT</div>
            <div className={styles.logoSubtext}>AGRICULTURAL EQUIPMENT RENTAL PLATFORM</div>
        </div>
        <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>หน้าแรก v</a>
            <a href="#" className={styles.navLink}>ค้นหาเครื่องจักร v</a>
            <a href="#" className={styles.navLink}>นโยบายส่วนตัว v</a>
        </nav>
        <div className={styles.userActions}>
            <div className={styles.profile}>
                <UserIcon />
                <span>NUT.05</span>
            </div>
            <HamburgerIcon />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleBanner}>
            <div className={styles.bannerOverlay}></div>
            <h1 className={styles.title}>ข้อกำหนดสำหรับผู้เช่า</h1>
        </div>

        <div className={styles.termsContainer}>
            <ol className={styles.termsList}>
                {terms.map((term, index) => (
                    <li key={index}>
                        <strong>{index + 1}. {term.title}:</strong> {term.detail}
                    </li>
                ))}
            </ol>
        </div>

        <div className={styles.buttonContainer}>
            <button className={styles.acceptButton}>ยอมรับ</button>
        </div>
      </main>
    </div>
  );
}
