'use client';

import { useEffect, useState ,useCallback} from 'react';
import axios from 'axios';
import MainHeader from '../../../components/MainHeader';
import styles from './listequipment.module.css';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const ListEquipmentPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchEquipment = useCallback(async () => {
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

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/equipment/my-equipment`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setEquipment([...response.data]);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลอุปกรณ์ได้');
      console.error('Error fetching equipment:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const handleEdit = (id) => {
    router.push(`/Owner/editequipment/${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const ownerAuth = JSON.parse(localStorage.getItem('ownerAuth'));
          const token = ownerAuth?.token;

          if (!token) {
            Swal.fire('ข้อผิดพลาด', 'ไม่พบ Token, กรุณาเข้าสู่ระบบใหม่', 'error');
            return;
          }

          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/equipment/delete/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          Swal.fire(
            'ลบแล้ว!',
            'อุปกรณ์ของคุณถูกลบเรียบร้อยแล้ว.',
            'success'
          );
          
          fetchEquipment(); // Refresh the list

        } catch (err) {
          console.error('Error deleting equipment:', err);
          Swal.fire(
            'เกิดข้อผิดพลาด!',
            'ไม่สามารถลบอุปกรณ์ได้',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className={styles.pageContainer}>
      <MainHeader />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>รายการอุปกรณ์ของฉัน</h1>
        
        {loading && <p className={styles.loadingText}>กำลังโหลดข้อมูล...</p>}
        {error && <p className={styles.errorText}>{error}</p>}
        
        {!loading && !error && (
          <div className={styles.equipmentGrid}>
            {equipment.length > 0 ? (
              equipment.map((item) => (
                <div key={item.equipmentId} className={styles.equipmentCard}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${item.equipmentImg}`}
                    alt={item.equipmentName} 
                    className={styles.equipmentImage}
                  />
                  <div className={styles.equipmentInfo}>
                    <h2 className={styles.equipmentName}>{item.equipmentName}</h2>
                    <p className={styles.equipmentCategory}>หมวดหมู่ : {item.equipmentList}</p>
                    <p className={styles.equipmentDescription}>คุณสมบัติ : {item.equipmentFeature}</p>
                    <p className={styles.equipmentDescription}>รายละเอียด : {item.equipmentDetails}</p>
                    <p className={styles.equipmentAddress}>ที่อยู่ : {item.equipmentAddress}</p>
                    <p className={styles.equipmentPrice}>฿{item.price.toLocaleString()} / วัน</p>
                    <p className={`${styles.equipmentStatus} ${styles[item.equipmentStatus.toLowerCase()]}`}>
                      สถานะ: {item.equipmentStatus}
                    </p>
                  </div>
                  <div className={styles.cardActions}>
                    <button 
                      className={styles.editButton}
                      onClick={() => handleEdit(item.equipmentId)}
                    >
                      แก้ไข
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(item.equipmentId)}
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>ยังไม่มีอุปกรณ์ในรายการ</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ListEquipmentPage;