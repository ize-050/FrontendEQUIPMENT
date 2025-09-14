"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MainHeader from '../../../../components/MainHeader';
import styles from "./deliveryStatus.module.css";

export default function FarmerDeliveryStatusPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();

  const getStatusInfo = (status) => {
    const statusMap = {
      'pending': {
        text: 'รอดำเนินการ',
        color: '#ffc107',
        icon: 'fas fa-clock',
        description: 'การจองของคุณอยู่ในระหว่างรอการตรวจสอบ'
      },
      'checkpayment': {
        text: 'ชำระเงิน',
        color: '#17a2b8',
        icon: 'fas fa-credit-card',
        description: 'กำลังตรวจสอบหลักฐานการชำระเงินของคุณ'
      },
      'approvepayment': {
        text: 'อนุมัติการชำระเงิน เจ้าของอุปกรณ์',
        color: '#28a745',
        icon: 'fas fa-check-circle',
        description: 'การชำระเงินได้รับการอนุมัติแล้ว กำลังเตรียมอุปกรณ์'
      },
      'waitdelivery': {
        text: 'กำลังจัดส่ง',
        color: '#fd7e14',
        icon: 'fas fa-truck',
        description: 'อุปกรณ์กำลังอยู่ในระหว่างการจัดส่งถึงคุณ'
      },
      'successdelivery': {
        text: 'จัดส่งเรียบร้อย',
        color: '#6c757d',
        icon: 'fas fa-lock',
        description: 'อุปกรณ์ได้ถูกจัดส่งถึงที่อยู่ของคุณแล้ว'
      },
      'completed': {
        text: 'กำลังส่งคืน',
        color: '#28a745',
        icon: 'fas fa-undo',
        description: 'การเช่าอุปกรณ์เสร็จสิ้นสมบูรณ์'
      },
    
      'rejectpayment': {
        text: 'ปฏิเสธการชำระเงิน',
        color: '#dc3545',
        icon: 'fas fa-times-circle',
        description: 'การชำระเงินไม่ถูกต้อง กรุณาติดต่อเจ้าของอุปกรณ์'
      },
      'cancelled': {
        text: 'ยกเลิก',
        color: '#6c757d',
        icon: 'fas fa-ban',
        description: 'การจองถูกยกเลิกแล้ว'
      },
      'confirmed': {
        text: 'ยืนยันการจอง',
        color: '#17a2b8',
        icon: 'fas fa-check',
        description: 'การจองได้รับการยืนยันแล้ว'
      },
      'preparing': {
        text: 'กำลังเตรียมอุปกรณ์',
        color: '#6f42c1',
        icon: 'fas fa-clipboard-list',
        description: 'เจ้าของกำลังเตรียมอุปกรณ์สำหรับการจัดส่ง'
      },
      'return': {
        text: 'ส่งคืนแล้ว',
        color: '#28a745',
        icon: 'fas fa-reply',
        description: 'อุปกรณ์ถูกส่งคืนเรียบร้อยแล้ว'
      },
      'returnsuccess': {
        text: 'ส่งคืนเรียบร้อย',
        color: '#28a745',
        icon: 'fas fa-reply',
        description: 'อุปกรณ์ถูกส่งคืนเรียบร้อยแล้ว'
      }
    };
    return statusMap[status] || {
      text: status,
      color: '#6c757d',
      icon: '❓',
      description: 'สถานะไม่ทราบ'
    };
  };

  const getProgressPercentage = (status) => {
    const progressMap = {
      'pending': 10,
      'checkpayment': 25,
      'approvepayment': 40,
      'rejectpayment': 0,
      'processing': 55,
      'waitdelivery': 75,
      'successdelivery': 90,
      'completed': 100,
      'cancelled': 0,
      'return': 85,
      'returnsuccess': 100
    };
    return progressMap[status] || 0;
  };

  const getStatusSteps = () => {
    // แถวแรก - จากซ้ายไปขวา
    const firstRow = [
      {
        key: 'pending',
        text: 'รอดำเนินการ',
        color: '#e9ecef',
        icon: 'fas fa-calendar-alt'
      },
      {
        key: 'checkpayment', 
        text: 'ชำระเงิน',
        color: '#17a2b8',
        icon: 'fas fa-credit-card'
      },
      {
        key: 'approvepayment',
        text: 'อนุมัติการชำระเงิน จากเจ้าของอุปกรณ์',
        color: '#28a745', 
        icon: 'fas fa-check-circle'
      },
      {
        key: 'waitdelivery',
        text: 'รอการจัดส่ง',
        color: '#fd7e14',
        icon: 'fas fa-truck'
      },
      {
        key: 'successdelivery',
        text: 'จัดส่งเรียบร้อย',
        color: '#6c757d',
        icon: 'fas fa-lock'
      }
    ];

    // แถวที่สอง - จากซ้ายไปขวา
    const secondRow = [
      {
        key: 'returnsuccess',
        text: 'คืนอุปกรณ์สำเร็จ',
        color: '#28a745',
        icon: 'fas fa-check'
      },
      {
        key: 'return',
        text: 'ส่งคืนอุปกรณ์',
        color: '#6f42c1',
        icon: 'fas fa-undo'
      },

    ];

    return { firstRow, secondRow };
  };

  const isStepCompleted = (stepKey, currentStatus) => {
    const steps = ['processing', 'checkpayment', 'approvepayment', 'delivering', 'completed'];
    const currentIndex = steps.indexOf(currentStatus);
    const stepIndex = steps.indexOf(stepKey);
    
    if (currentStatus === 'rejectpayment' || currentStatus === 'cancelled') {
      return stepIndex <= steps.indexOf('checkpayment');
    }
    
    return stepIndex <= currentIndex;
  };

  const isStepActive = (stepKey, currentStatus) => {
    return stepKey === currentStatus;
  };

  useEffect(() => {
    const fetchBookingStatus = async () => {
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
          throw new Error("ไม่สามารถดึงข้อมูลสถานะการจองได้");
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
      fetchBookingStatus();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <MainHeader />
        <main className={styles.mainContent}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>กำลังโหลดข้อมูลสถานะ...</p>
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

  const currentStatusInfo = getStatusInfo(booking.bookingStatus);
  const progressPercentage = getProgressPercentage(booking.bookingStatus);

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
          <h1 className={styles.title}>สถานะการจัดส่ง</h1>
          <p className={styles.subtitle}>การจอง #{booking.bookingId}</p>
        </div>

        {/* Current Status Card */}
        <div className={styles.statusCard}>
          <div className={styles.statusHeader}>
            <div className={styles.statusIcon} style={{ backgroundColor: currentStatusInfo.color }}>
              <i className={currentStatusInfo.icon}></i>
            </div>
            <div className={styles.statusInfo}>
              <h2 className={styles.statusTitle}>{currentStatusInfo.text}</h2>
              <p className={styles.statusDescription}>{currentStatusInfo.description}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${progressPercentage}%`,
                  backgroundColor: currentStatusInfo.color 
                }}
              ></div>
            </div>
            <span className={styles.progressText}>{progressPercentage}%</span>
          </div>
        </div>

        {/* Two-Row Timeline */}
        <div className={styles.timelineCard}>
          <h3 className={styles.timelineTitle}>ขั้นตอนการดำเนินการ</h3>
          
          {/* First Row */}
          <div className={styles.timelineRow}>
            {getStatusSteps().firstRow.map((step, index) => (
              <div key={step.key} className={styles.timelineStepContainer}>
                <div 
                  className={`${styles.horizontalStep} ${
                    step.key === booking.bookingStatus ? styles.active : ''
                  }`}
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderColor: step.key === booking.bookingStatus ? step.color : '#dee2e6',
                    borderWidth: step.key === booking.bookingStatus ? '3px' : '2px'
                  }}
                >
                  <div className={styles.stepIcon}>
                    {step.key === booking.bookingStatus ? 
                      <i className="fas fa-check"></i> : 
                      <i className={step.icon}></i>
                    }
                  </div>
                  <div className={styles.stepLabel}>{step.text}</div>
                </div>
                {index < getStatusSteps().firstRow.length - 1 && (
                  <div className={`${styles.horizontalConnector}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Vertical Connector to Second Row */}
          <div className={styles.verticalConnector}></div>

          {/* Second Row */}
          <div className={styles.timelineRow}>
            {getStatusSteps().secondRow.map((step, index) => (
              <div key={step.key} className={styles.timelineStepContainer}>
                <div 
                  className={`${styles.horizontalStep} ${
                    step.key === booking.bookingStatus ? styles.active : ''
                  }`}
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderColor: step.key === booking.bookingStatus ? step.color : '#dee2e6',
                    borderWidth: step.key === booking.bookingStatus ? '3px' : '2px'
                  }}
                >
                  <div className={styles.stepIcon}>
                    {step.key === booking.bookingStatus ? 
                      <i className="fas fa-check"></i> : 
                      <i className={step.icon}></i>
                    }
                  </div>
                  <div className={styles.stepLabel}>{step.text}</div>
                </div>
                {index < getStatusSteps().secondRow.length - 1 && (
                  <div className={`${styles.horizontalConnector}`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Secondary Timeline Row */}
        
        </div>

        {/* Booking Details */}
        <div className={styles.detailsCard}>
          <h3 className={styles.detailsTitle}>รายละเอียดการจอง</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <label>รหัสการจอง:</label>
              <span>#{booking.bookingId}</span>
            </div>
            <div className={styles.detailItem}>
              <label>วันที่เริ่มเช่า:</label>
              <span>
                {booking.bookingStartDate ? 
                  new Date(booking.bookingStartDate).toLocaleDateString('th-TH') : 
                  'ไม่ระบุ'
                }
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>วันที่คืน:</label>
              <span>
                {booking.bookingEndDate ? 
                  new Date(booking.bookingEndDate).toLocaleDateString('th-TH') : 
                  'ไม่ระบุ'
                }
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>ที่อยู่จัดส่ง:</label>
              <span>{booking.bookingchangeAddress || 'ไม่ระบุ'}</span>
            </div>
            <div className={styles.detailItem}>
              <label>จำนวนอุปกรณ์:</label>
              <span>{booking.equipmentList ? booking.equipmentList.length : 0} รายการ</span>
            </div>
            <div className={styles.detailItem}>
              <label>ราคารวม:</label>
              <span className={styles.totalPrice}>฿{booking.totalPrice?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
