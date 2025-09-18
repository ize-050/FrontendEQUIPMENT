'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MainHeader from '../../../components/MainHeader';
import styles from './bookings.module.css';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const OwnerBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const ownerAuth = JSON.parse(localStorage.getItem('ownerAuth'));
      const token = ownerAuth?.token;
      const ownerId = ownerAuth?.ownerId;

      if (!token || !ownerId) {
        Swal.fire({
          icon: 'error',
          title: 'ไม่ได้เข้าสู่ระบบ',
          text: 'กรุณาเข้าสู่ระบบก่อน',
        }).then(() => {
          router.push('/Owner/loginowner');
        });
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/owner/bookings/${ownerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setBookings(response.data);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลการจองได้');
      console.error('Error fetching bookings:', err);
      
      if (err.response?.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Session หมดอายุ',
          text: 'กรุณาเข้าสู่ระบบใหม่',
        }).then(() => {
          localStorage.removeItem('ownerAuth');
          router.push('/Owner/loginowner');
        });
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': '#ffc107',
      'confirmed': '#17a2b8',
      'waitpayment': '#17a2b8',
      'checkpayment': '#fd7e14',
      'approvepayment': '#28a745',
      'rejectpayment': '#dc3545',
      'waitdelivery': '#6f42c1',
      'successdelivery': '#20c997',
      'return': '#6c757d',
      'returnsuccess': '#28a745',
      'cancelled': '#6c757d'
    };
    return statusColors[status] || '#6c757d';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'pending': 'รอดำเนินการ',
      'confirmed': 'ยืนยันการจอง - รอชำระเงิน',
      'waitpayment': 'รอชำระเงิน',
      'checkpayment': 'ตรวจสอบการชำระเงิน',
      'approvepayment': 'ชำระเงินเรียบร้อย',
      'rejectpayment': 'ปฏิเสธการชำระเงิน',
      'waitdelivery': 'รอจัดส่ง',
      'successdelivery': 'จัดส่งเรียบร้อย',
      'return': 'คืนอุปกรณ์',
      'returnsuccess': 'คืนอุปกรณ์สำเร็จ',
      'cancelled': 'ยกเลิกการจอง'
    };
    return statusTexts[status] || status;
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || booking.bookingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (bookingId) => {
    router.push(`/Owner/bookings/${bookingId}`);
  };

  return (
    <div className={styles.pageContainer}>
      <MainHeader />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>รายการจองอุปกรณ์</h1>
          <p className={styles.subtitle}>จัดการการจองอุปกรณ์ของคุณ</p>
        </div>

        {/* Filters */}
        <div className={styles.filtersContainer}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อเกษตรกรหรือรหัสการจอง..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.statusFilter}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.statusSelect}
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="pending">รอดำเนินการ</option>
              <option value="confirmed">ยืนยันการจอง - รอชำระเงิน</option>
              <option value="waitpayment">รอชำระเงิน</option>
              <option value="checkpayment">ตรวจสอบการชำระเงิน</option>
              <option value="approvepayment">ชำระเงินเรียบร้อย</option>
              <option value="rejectpayment">ปฏิเสธการชำระเงิน</option>
              <option value="waitdelivery">รอจัดส่ง</option>
              <option value="successdelivery">จัดส่งเรียบร้อย</option>
              <option value="return">คืนอุปกรณ์</option>
              <option value="returnsuccess">คืนอุปกรณ์สำเร็จ</option>
              <option value="cancelled">ยกเลิกการจอง</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
            <button onClick={fetchBookings} className={styles.retryButton}>
              ลองใหม่
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.tableContainer}>
            {filteredBookings.length > 0 ? (
              <table className={styles.bookingsTable}>
                <thead>
                  <tr>
                    <th>รหัสการจอง</th>
                    <th>เกษตรกร</th>
                    <th>วันที่เริ่ม</th>
                    <th>วันที่สิ้นสุด</th>
                    <th>จำนวนอุปกรณ์</th>
                    <th>ราคารวม</th>
                    <th>สถานะ</th>
                    <th>การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.bookingId} className={styles.bookingRow}>
                      <td className={styles.bookingId}>#{booking.bookingId}</td>
                      <td>
                        <div className={styles.farmerInfo}>
                          <div className={styles.farmerName}>{booking.farmerName}</div>
                          <div className={styles.farmerTel}>{booking.farmerTel}</div>
                        </div>
                      </td>
                      <td>{new Date(booking.bookingStartDate).toLocaleDateString('th-TH')}</td>
                      <td>{new Date(booking.bookingEndDate).toLocaleDateString('th-TH')}</td>
                      <td className={styles.equipmentCount}>{booking.equipmentList?.length || 0} รายการ</td>
                      <td className={styles.totalPrice}>฿{booking.totalPrice?.toLocaleString() || 0}</td>
                      <td>
                        <span 
                          className={styles.statusBadge}
                          style={{ backgroundColor: getStatusColor(booking.bookingStatus) }}
                        >
                          {getStatusText(booking.bookingStatus)}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewDetail(booking.bookingId)}
                          className={styles.viewButton}
                        >
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📋</div>
                <h3>ไม่พบรายการจอง</h3>
                <p>ยังไม่มีใครจองอุปกรณ์ของคุณ หรือลองเปลี่ยนเงื่อนไขการค้นหา</p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && filteredBookings.length > 0 && (
          <div className={styles.summary}>
            <p>แสดง {filteredBookings.length} รายการจาก {bookings.length} รายการทั้งหมด</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerBookingsPage;
