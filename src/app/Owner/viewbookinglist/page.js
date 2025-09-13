"use client";
import React, { useState } from "react";
import MainHeader from "@/components/MainHeader";
import styles from "./viewbookinglist.module.css";

const ViewBookingListPage = () => {
  const [noBookingsMessage, setNoBookingsMessage] = useState("");
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setNoBookingsMessage("ไม่พบอุปกรณ์ที่จอง");
    // เพิ่ม timeout เพื่อซ่อนข้อความหลังจาก 3 วินาที
    setTimeout(() => {
      setNoBookingsMessage("");
    }, 3000);
  };

  return (
    <div className={styles.pageContainer}>
      <MainHeader />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.pageTitle}>
            รายการจองของฉัน
            <div className={styles.titleUnderline} />
          </h1>

          <ul className={styles.bookingOptions}>
            <li
              className={`${styles.bookingOption} ${
                activeOption === "delivery" ? styles.active : ""
              }`}
              onClick={() => handleOptionClick("delivery")}
            >
              <span className={styles.optionIcon}>🚚</span>
              <div className={styles.optionContent}>
                <h3>อัพเดทการจัดส่งและรับสินค้า</h3>
                <p>จัดการข้อมูลการจัดส่งและการรับสินค้าของคุณ</p>
              </div>
            </li>

            <li
              className={`${styles.bookingOption} ${
                activeOption === "list" ? styles.active : ""
              }`}
              onClick={() => handleOptionClick("list")}
            >
              <span className={styles.optionIcon}>📋</span>
              <div className={styles.optionContent}>
                <h3>รายการวันส่งและรับสินค้า</h3>
                <p>ดูรายละเอียดกำหนดการส่งและรับสินค้าทั้งหมด</p>
              </div>
            </li>
          </ul>

          {noBookingsMessage && (
            <div className={styles.noBookingsMessage}>
              <span className={styles.messageIcon}>ℹ️</span>
              {noBookingsMessage}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewBookingListPage;
