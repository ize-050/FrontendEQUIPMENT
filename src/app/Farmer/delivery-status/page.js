'use client';

import styles from './delivery-status.module.css';

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

// Icons for the timeline
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M19 4h-3V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z"/></svg>);
const WalletIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15H3V6h18v13zm-10-9h-4V7h4v3zm6 0h-4V7h4v3zm-6 4h-4v-3h4v3zm6 0h-4v-3h4v3z"/></svg>);
const CheckCircleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>);
const TruckProcessingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.38 1.12 2.5 2.5 2.5S8 18.38 8 17h8c0 1.38 1.12 2.5 2.5 2.5S21 18.38 21 17h1v-2h-1V8zm-7 1.5c0 .83-.67 1.5-1.5 1.5S10 10.33 10 9.5 10.67 8 11.5 8s1.5.67 1.5 1.5zM19 12h-2V8h2v4z"/></svg>);
const TruckDeliveringIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>);
const ReturnIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/></svg>);
const ClockExpiredIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11V7h1.5V5h-3v4h3V7zm-1 6h-2v2h2v-2z"/></svg>);
const ClockPeriodIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11V7h1.5V5h-3v4h3V7zm-1 6h-2v2h2v-2z"/></svg>);
const TruckDeliveredIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.38 1.12 2.5 2.5 2.5S8 18.38 8 17h8c0 1.38 1.12 2.5 2.5 2.5S21 18.38 21 17h1v-2h-1V8zm-7 1.5c0 .83-.67 1.5-1.5 1.5S10 10.33 10 9.5 10.67 8 11.5 8s1.5.67 1.5 1.5zM19 12h-2V8h2v4z"/></svg>);

export default function DeliveryStatusPage() {
  const topSteps = [
    { icon: <CalendarIcon />, text: "เช่าอุปกรณ์" },
    { icon: <WalletIcon />, text: "ชำระเงิน" },
    { icon: <CheckCircleIcon />, text: "ยืนยันการจองจาก\nเจ้าของอุปกรณ์" },
    { icon: <TruckProcessingIcon />, text: "กำลังดำเนินการ" },
    { icon: <TruckDeliveringIcon />, text: "กำลังจัดส่ง" },
  ];

  const bottomSteps = [
    { icon: <CheckCircleIcon />, text: "ส่งคืนสำเร็จ" },
    { icon: <ReturnIcon />, text: "ส่งคืนอุปกรณ์" },
    { icon: <ClockExpiredIcon />, text: "หมดเวลาเช่า" },
    { icon: <ClockPeriodIcon />, text: "ระยะเวลาเช่า" },
    { icon: <TruckDeliveredIcon />, text: "จัดส่งสำเร็จ" },
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
                <span>Sombat15</span>
            </div>
            <HamburgerIcon />
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>สถานะการเช่า</h1>

        <div className={styles.statusBox}>
          <div className={styles.timelineTop}>
            {topSteps.map((step, index) => (
              <div key={index} className={styles.timelineStep}>
                <div className={styles.iconWrapper}>{step.icon}</div>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.timelineBottom}>
            {bottomSteps.map((step, index) => (
              <div key={index} className={styles.timelineStep}>
                <div className={styles.iconWrapper}>{step.icon}</div>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.timelineLineTop}></div>
          <div className={styles.timelineLineBottom}></div>
          <div className={styles.timelineConnector}></div>
        </div>

        <p className={styles.contactOwner}>ติดต่อเจ้าของอุปกรณ์</p>
      </main>
    </div>
  );
}