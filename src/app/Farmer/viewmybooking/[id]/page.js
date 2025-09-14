"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MainHeader from '../../../../components/MainHeader';
import styles from "./bookingDetail.module.css";

export default function BookingDetailPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();

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

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        setLoading(true);
        const farmerAuth = JSON.parse(localStorage.getItem("farmerAuth"));
        const token = farmerAuth?.token;

        if (!token) {
          setError("กรุณาเข้าสู่ระบบก่อน");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/booking/bookings-with-equipment/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลการจองได้");
        }

        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBookingDetail();
    }
  }, [params.id]);

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
            <button 
              onClick={() => router.back()} 
              className={styles.backButton}
            >
              กลับ
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className={styles.pageContainer}>
        <MainHeader />
        <main className={styles.mainContent}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>ไม่พบข้อมูลการจอง</p>
            <button 
              onClick={() => router.back()} 
              className={styles.backButton}
            >
              กลับ
            </button>
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
          <button 
            onClick={() => router.back()} 
            className={styles.backButton}
          >
            ← กลับ
          </button>
          <h1 className={styles.title}>รายละเอียดการจอง #{booking.bookingId}</h1>
        </div>

        {/* Booking Information */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>ข้อมูลการจอง</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>รหัสการจอง:</label>
              <span className={styles.bookingId}>#{booking.bookingId}</span>
            </div>
            <div className={styles.infoItem}>
              <label>วันที่เริ่มเช่า:</label>
              <span>
                {booking.bookingStartDate ? 
                  new Date(booking.bookingStartDate).toLocaleDateString('th-TH') : 
                  'ไม่ระบุ'
                }
              </span>
            </div>
            <div className={styles.infoItem}>
              <label>วันที่คืน:</label>
              <span>
                {booking.bookingEndDate ? 
                  new Date(booking.bookingEndDate).toLocaleDateString('th-TH') : 
                  'ไม่ระบุ'
                }
              </span>
            </div>
            <div className={styles.infoItem}>
              <label>ที่อยู่จัดส่ง:</label>
              <span>{booking.bookingchangeAddress || 'ไม่ระบุ'}</span>
            </div>
            <div className={styles.infoItem}>
              <label>ราคารวม:</label>
              <span className={styles.totalPrice}>฿{booking.totalPrice?.toLocaleString()}</span>
            </div>
            <div className={styles.infoItem}>
              <label>สถานะ:</label>
              <span 
                className={styles.statusBadge}
                style={{ backgroundColor: getStatusColor(booking.bookingStatus) }}
              >
                {getStatusText(booking.bookingStatus)}
              </span>
            </div>
          </div>
        </div>

        {/* Equipment List */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>รายการอุปกรณ์ที่จอง</h2>
          {booking.equipmentList && booking.equipmentList.length > 0 ? (
            <div className={styles.equipmentGrid}>
              {booking.equipmentList.map((equipment) => (
                <div key={equipment.equipmentId} className={styles.equipmentCard}>
                  <div className={styles.equipmentImage}>
                    <img 
                      src={`http://localhost:8080/uploads/images/${equipment.equipmentImg}`}
                      alt={equipment.equipmentName}
                      className={styles.equipmentImg}
                    />
                  </div>
                  <div className={styles.equipmentInfo}>
                    <h3 className={styles.equipmentName}>{equipment.equipmentName}</h3>
                    <p className={styles.equipmentDetails}>{equipment.equipmentDetails}</p>
                    <p className={styles.equipmentFeature}>{equipment.equipmentFeature}</p>
                    <div className={styles.equipmentPrice}>
                      ฿{equipment.price?.toLocaleString()} / วัน
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noEquipment}>ไม่มีข้อมูลอุปกรณ์</p>
          )}
        </div>

        {/* Payment Information */}
        {booking.paymentSlipPath && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>หลักฐานการชำระเงิน</h2>
            <div className={styles.paymentSlip}>
              <img 
                src={`http://localhost:8080/uploads/payment/${booking.paymentSlipPath}`}
                alt="Payment Slip"
                className={styles.slipImage}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
