"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainHeader from '../../../components/MainHeader';
import styles from "./viewmybooking.module.css";


export default function ViewMyBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'รอดำเนินการ',
      'checkpayment': 'รอตรวจสอบการชำระเงิน',
      'approvepayment': 'ชำระเงินเรียบร้อย',
      'rejectpayment': 'ปฏิเสธการชำระเงิน',
      'processing': 'กำลังดำเนินการ',
      'delivering': 'กำลังจัดส่ง',
      'delivered': 'จัดส่งเรียบร้อย',
      'completed': 'เสร็จสิ้น',
      'cancelled': 'ยกเลิก'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'pending': '#ffc107',
      'checkpayment': '#17a2b8',
      'approvepayment': '#28a745',
      'rejectpayment': '#dc3545',
      'processing': '#007bff',
      'delivering': '#fd7e14',
      'delivered': '#20c997',
      'completed': '#28a745',
      'cancelled': '#6c757d'
    };
    return colorMap[status] || '#6c757d';
  };

  const handleViewDetails = (bookingId) => {
    router.push(`/Farmer/viewmybooking/${bookingId}`);
  };

  const handleViewStatus = (bookingId) => {
    router.push(`/Farmer/delivery-status/${bookingId}`);
  };

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

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <MainHeader />
        <main className={styles.mainContent}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <MainHeader />
        <main className={styles.mainContent}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <MainHeader />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>รายการจองของฉัน</h1>
          <p className={styles.subtitle}>ติดตามสถานะการจองเครื่องจักรของคุณ</p>
        </div>

        {bookings.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📦</div>
            <h3>ยังไม่มีรายการจอง</h3>
            <p>เมื่อคุณจองเครื่องจักร รายการจองจะแสดงที่นี่</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.bookingsTable}>
              <thead>
                <tr>
                  <th>รหัสการจอง</th>
                  <th>วันที่เริ่มเช่า</th>
                  <th>วันที่คืน</th>
                  <th>ที่อยู่จัดส่ง</th>
                  <th>จำนวนอุปกรณ์</th>
                  <th>ราคารวม</th>
                  <th>สถานะ</th>
                  <th>การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.bookingId} className={styles.bookingRow}>
                    <td className={styles.bookingId}>#{booking.bookingId}</td>
                    <td>
                      {booking.bookingStartDate ? 
                        new Date(booking.bookingStartDate).toLocaleDateString('th-TH') : 
                        'ไม่ระบุ'
                      }
                    </td>
                    <td>
                      {booking.bookingEndDate ? 
                        new Date(booking.bookingEndDate).toLocaleDateString('th-TH') : 
                        'ไม่ระบุ'
                      }
                    </td>
                    <td className={styles.address}>
                      {booking.bookingchangeAddress || 'ไม่ระบุ'}
                    </td>
                    <td className={styles.equipmentCount}>
                      {booking.equipmentList ? booking.equipmentList.length : 0} รายการ
                    </td>
                    <td className={styles.totalPrice}>
                      ฿{booking.totalPrice ? booking.totalPrice.toLocaleString() : '0'}
                    </td>
                    <td>
                      <span 
                        className={styles.statusBadge}
                        style={{ backgroundColor: getStatusColor(booking.bookingStatus) }}
                      >
                        {getStatusText(booking.bookingStatus)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.buttonGroup}>
                        <button
                          onClick={() => handleViewDetails(booking.bookingId)}
                          className={styles.viewButton}
                        >
                          ดูรายละเอียด
                        </button>
                        <button
                          onClick={() => handleViewStatus(booking.bookingId)}
                          className={styles.statusButton}
                        >
                          ดูรายการสถานะ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {bookings.length > 0 && (
          <div className={styles.summary}>
            แสดง {bookings.length} รายการจอง
          </div>
        )}
      </main>
    </div>
  );
}
