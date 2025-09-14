'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MainHeader from '../../../../components/MainHeader';
import styles from './bookingDetail.module.css';
import Swal from 'sweetalert2';
import { useRouter, useParams } from 'next/navigation';

const BookingDetailPage = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id;

  const fetchBookingDetail = useCallback(async () => {
    setLoading(true);
    try {
      const ownerAuth = JSON.parse(localStorage.getItem('ownerAuth'));
      const token = ownerAuth?.token;

      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'ไม่ได้เข้าสู่ระบบ',
          text: 'กรุณาเข้าสู่ระบบก่อน',
        }).then(() => {
          router.push('/Owner/loginowner');
        });
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/owner/bookings/detail/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setBooking(response.data);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลการจองได้');
      console.error('Error fetching booking detail:', err);
      
      if (err.response?.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Session หมดอายุ',
          text: 'กรุณาเข้าสู่ระบบใหม่',
        }).then(() => {
          localStorage.removeItem('ownerAuth');
          router.push('/Owner/loginowner');
        });
      } else if (err.response?.status === 404) {
        setError('ไม่พบข้อมูลการจองที่ระบุ');
      }
    } finally {
      setLoading(false);
    }
  }, [bookingId, router]);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetail();
    }
  }, [bookingId, fetchBookingDetail]);

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': '#ffc107',
      'waitpayment': '#17a2b8',
      'checkpayment': '#fd7e14',
      'approvepayment': '#28a745',
      'rejectpayment': '#dc3545',
      'waitdelivery': '#6f42c1',
      'successdelivery': '#20c997',
      'return': '#6c757d',
      'returnsuccess': '#28a745'
    };
    return statusColors[status] || '#6c757d';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'pending': 'รอดำเนินการ',
      'waitpayment': 'รอชำระเงิน',
      'checkpayment': 'ตรวจสอบการชำระเงิน',
      'approvepayment': 'ชำระเงินเรียบร้อย',
      'rejectpayment': 'ปฏิเสธการชำระเงิน',
      'waitdelivery': 'รอจัดส่ง',
      'successdelivery': 'จัดส่งเรียบร้อย',
      'return': 'คืนอุปกรณ์',
      'returnsuccess': 'คืนอุปกรณ์สำเร็จ'
    };
    return statusTexts[status] || status;
  };

  const getAvailableStatuses = (currentStatus) => {
    const statusFlow = {
      'pending': ['waitpayment'],
      'waitpayment': ['checkpayment'],
      'checkpayment': ['approvepayment', 'rejectpayment'],
      'approvepayment': ['waitdelivery'],
      'rejectpayment': ['waitpayment'],
      'waitdelivery': ['successdelivery'],
      'successdelivery': ['return'],
      'return': ['returnsuccess'],
      'returnsuccess': []
    };
    return statusFlow[currentStatus] || [];
  };

  const handleStatusChange = async () => {
    if (!newStatus) return;
    
    const result = await Swal.fire({
      title: 'เปลี่ยนสถานะ?',
      text: `คุณต้องการเปลี่ยนสถานะเป็น "${getStatusText(newStatus)}" หรือไม่?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2a5b3e',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      await updateBookingStatus(newStatus);
      setNewStatus('');
    }
  };

  const updateBookingStatus = async (status) => {
    setIsUpdatingStatus(true);
    try {
      const ownerAuth = JSON.parse(localStorage.getItem('ownerAuth'));
      const token = ownerAuth?.token;

      const response = await axios.put(
        `http://localhost:8080/api/owner/bookings/status/${bookingId}`,
        { status: status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'อัพเดทสำเร็จ',
          text: 'อัพเดทสถานะการจองเรียบร้อยแล้ว',
          timer: 2000,
          showConfirmButton: false,
        });
        fetchBookingDetail(); // Refresh data
      }
    } catch (err) {
      console.error('Error updating status:', err);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถอัพเดทสถานะได้',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleApprovePayment = async () => {
    const result = await Swal.fire({
      title: 'อนุมัติการชำระเงิน?',
      text: 'คุณต้องการอนุมัติการชำระเงินนี้หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'อนุมัติ',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      setUpdating(true);
      try {
        const ownerAuth = JSON.parse(localStorage.getItem('ownerAuth'));
        const token = ownerAuth?.token;

        await axios.put(
          `http://localhost:8080/api/owner/bookings/approve-payment/${bookingId}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          icon: 'success',
          title: 'อนุมัติสำเร็จ',
          text: 'อนุมัติการชำระเงินเรียบร้อยแล้ว',
          timer: 2000,
          showConfirmButton: false,
        });
        fetchBookingDetail();
      } catch (err) {
        console.error('Error approving payment:', err);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถอนุมัติการชำระเงินได้',
        });
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleRejectPayment = async () => {
    const result = await Swal.fire({
      title: 'ปฏิเสธการชำระเงิน?',
      text: 'คุณต้องการปฏิเสธการชำระเงินนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'ปฏิเสธ',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      setUpdating(true);
      try {
        const ownerAuth = JSON.parse(localStorage.getItem('ownerAuth'));
        const token = ownerAuth?.token;

        await axios.put(
          `http://localhost:8080/api/owner/bookings/reject-payment/${bookingId}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          icon: 'success',
          title: 'ปฏิเสธสำเร็จ',
          text: 'ปฏิเสธการชำระเงินเรียบร้อยแล้ว',
          timer: 2000,
          showConfirmButton: false,
        });
        fetchBookingDetail();
      } catch (err) {
        console.error('Error rejecting payment:', err);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถปฏิเสธการชำระเงินได้',
        });
      } finally {
        setUpdating(false);
      }
    }
  };

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
            <button onClick={() => router.back()} className={styles.backButton}>
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
            <button onClick={() => router.back()} className={styles.backButton}>
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
          <button onClick={() => router.back()} className={styles.backButton}>
            ← กลับ
          </button>
          <h1 className={styles.title}>รายละเอียดการจอง #{booking.bookingId}</h1>
        </div>

        <div className={styles.contentGrid}>
          {/* Booking Information */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>ข้อมูลการจอง</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>รหัสการจอง:</label>
                <span className={styles.bookingId}>#{booking.bookingId}</span>
              </div>
              <div className={styles.infoItem}>
                <label>วันที่เริ่ม:</label>
                <span>{booking.bookingstartDate ? new Date(booking.bookingstartDate).toLocaleDateString('th-TH') : 'ไม่ระบุ'}</span>
              </div>
              <div className={styles.infoItem}>
                <label>วันที่สิ้นสุด:</label>
                <span>{booking.bookingendDate ? new Date(booking.bookingendDate).toLocaleDateString('th-TH') : 'ไม่ระบุ'}</span>
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
                  style={{ backgroundColor: getStatusColor(booking.bookingstatus) }}
                >
                  {getStatusText(booking.bookingstatus)}
                </span>
              </div>
            </div>
          </div>

          {/* Farmer Information */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>ข้อมูลเกษตรกร</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>ชื่อ:</label>
                <span>{booking.farmerName}</span>
              </div>
              <div className={styles.infoItem}>
                <label>เบอร์โทร:</label>
                <span>{booking.farmerTel}</span>
              </div>
              <div className={styles.infoItem}>
                <label>อีเมล:</label>
                <span>{booking.farmerEmail}</span>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>จัดการสถานะ</h2>
            <div className={styles.statusManagement}>
              <div className={styles.currentStatus}>
                <label>สถานะปัจจุบัน:</label>
                <span 
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(booking.bookingstatus) }}
                >
                  {getStatusText(booking.bookingstatus)}
                </span>
              </div>

              {booking.bookingstatus === 'checkpayment' && (
                <div className={styles.paymentActions}>
                  <h3>ตรวจสอบการชำระเงิน</h3>
                  {booking.paymentSlipPath && (
                    <div className={styles.paymentSlip}>
                      <label>หลักฐานการชำระเงิน:</label>
                      <img 
                        src={`http://localhost:8080/uploads/payment/${booking.paymentSlipPath}`}
                        alt="Payment Slip"
                        className={styles.slipImage}
                      />
                    </div>
                  )}
                  <div className={styles.actionButtons}>
                    <button 
                      onClick={handleApprovePayment}
                      className={`${styles.actionButton} ${styles.approveButton}`}
                      disabled={isUpdatingStatus}
                    >
                      {isUpdatingStatus ? 'กำลังดำเนินการ...' : 'ตรวจสอบการชำระเงิน'}
                    </button>
                    <button 
                      onClick={handleRejectPayment}
                      className={`${styles.actionButton} ${styles.rejectButton}`}
                      disabled={isUpdatingStatus}
                    >
                      {isUpdatingStatus ? 'กำลังดำเนินการ...' : 'ปฏิเสธการชำระเงิน'}
                    </button>
                  </div>
                </div>
              )}

              {getAvailableStatuses(booking.bookingstatus).length > 0 && (
                <div className={styles.statusUpdate}>
                  <label>เปลี่ยนสถานะเป็น:</label>
                  <div className={styles.dropdownContainer}>
                    <select 
                      value={newStatus} 
                      onChange={(e) => setNewStatus(e.target.value)}
                      className={styles.statusDropdown}
                      disabled={isUpdatingStatus}
                    >
                      <option value="">-- เลือกสถานะใหม่ --</option>
                      {getAvailableStatuses(booking.bookingstatus).map(status => (
                        <option key={status} value={status}>
                          {getStatusText(status)}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleStatusChange}
                      className={styles.updateButton}
                      disabled={!newStatus || isUpdatingStatus}
                    >
                      {isUpdatingStatus ? 'กำลังอัพเดท...' : 'อัพเดทสถานะ'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Equipment List */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>รายการอุปกรณ์</h2>
            <div className={styles.equipmentList}>
              {booking.equipmentList?.map((equipment) => (
                <div key={equipment.equipmentId} className={styles.equipmentItem}>
                  <div className={styles.equipmentImage}>
                    <img 
                      src={`http://localhost:8080/uploads/images/${equipment.equipmentImg}`}
                      alt={equipment.equipmentName}
                    />
                  </div>
                  <div className={styles.equipmentInfo}>
                    <h3>{equipment.equipmentName}</h3>
                    <p className={styles.equipmentType}>{equipment.equipmentTypeName}</p>
                    <p className={styles.equipmentDetails}>{equipment.equipmentDetails}</p>
                    <div className={styles.equipmentPrice}>฿{equipment.price?.toLocaleString()} / วัน</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetailPage;
