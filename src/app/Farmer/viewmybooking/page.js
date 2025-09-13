"use client";

import { useEffect, useState } from "react";
import styles from "./viewmybooking.module.css";

// Component สำหรับแสดง Loading
const LoadingSpinner = () => (
  <div className={styles.loading}>
    <div className={styles.spinner}></div>
    <span>กำลังโหลดข้อมูล...</span>
  </div>
);

// Component สำหรับแสดงวันที่สวยงาม
const DateDisplay = ({ label, date }) => (
  <div className={styles.dateDisplay}>
    <span className={styles.dateLabel}>{label}:</span>
    <span className={styles.dateValue}>
      {new Date(date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  </div>
);

// Component แสดงสถานะการจอง
const BookingStatus = ({ status }) => {
  const statusText = status === "pending" ? "รอดำเนินการ" : "สำเร็จ";
  const className =
    status === "pending" ? styles.statusPending : styles.statusSuccess;

  return <span className={`${styles.status} ${className}`}>{statusText}</span>;
};

// Component แสดงราคา
const PriceDisplay = ({ price }) => (
  <div className={styles.priceTag}>
    <span className={styles.currency}>฿</span>
    <span className={styles.amount}>{price.toLocaleString()}</span>
    <span className={styles.period}>/วัน</span>
  </div>
);

export default function ViewMyBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const farmerToken = JSON.parse(localStorage.getItem("farmerAuth"));
        const token = farmerToken?.token;

        const res = await fetch(
          "http://localhost:8080/booking/bookings-with-equipment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลการจองได้");

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!bookings.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📦</div>
        <h3>ยังไม่มีรายการจอง</h3>
        <p>เมื่อคุณจองเครื่องจักร รายการจองจะแสดงที่นี่</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>
        <span className={styles.titleIcon}>📋</span>
        รายการจองของฉัน
      </h1>

      <div className={styles.bookingList}>
        {bookings.map((booking) => (
          <div key={booking.bookingId} className={styles.bookingCard}>
            <div className={styles.bookingHeader}>
              <div className={styles.bookingId}>
                <span className={styles.idLabel}>รหัสการจอง</span>
                <span className={styles.idNumber}>#{booking.bookingId}</span>
              </div>
              <BookingStatus status={booking.bookingStatus} />
            </div>

            <div className={styles.bookingDates}>
              <DateDisplay
                label="วันที่เริ่มเช่า"
                date={booking.bookingStartDate}
              />
              <DateDisplay label="วันที่คืน" date={booking.bookingEndDate} />
            </div>

            <div className={styles.addressSection}>
              <span className={styles.addressIcon}>📍</span>
              <span className={styles.addressLabel}>ที่อยู่จัดส่ง:</span>
              <span className={styles.addressValue}>
                {booking.bookingchangeAddress}
              </span>
            </div>

            <div className={styles.equipmentSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🚜</span>
                รายการเครื่องจักรที่จอง
              </h3>
              <ul className={styles.equipmentList}>
                {booking.equipmentList.map((eq) => (
                  <li key={eq.equipmentId} className={styles.equipmentItem}>
                    <div className={styles.equipmentImage}>
                      <img
                        src={`http://localhost:8080/uploads/images/${eq.equipmentImg}`}
                        alt={eq.equipmentName}
                        className={styles.equipmentImg}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.equipmentInfo}>
                      <h4 className={styles.equipmentName}>
                        {eq.equipmentName}
                      </h4>
                      <div className={styles.equipmentDetails}>
                        <p>{eq.equipmentDetails}</p>
                        <p className={styles.equipmentFeature}>
                          {eq.equipmentFeature}
                        </p>
                      </div>
                      <PriceDisplay price={eq.price} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
