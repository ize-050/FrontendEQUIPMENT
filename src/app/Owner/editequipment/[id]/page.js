'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import MainHeader from '../../../../components/MainHeader';
import styles from './edit-equipment.module.css';

const EditEquipmentPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Equipment ID from URL

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalEquipment, setOriginalEquipment] = useState(null);

  const equipmentImage = watch('equipmentImg');

  useEffect(() => {
    // If equipmentImage is a FileList (a new file is selected)
    if (equipmentImage && typeof equipmentImage !== 'string' && equipmentImage.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(equipmentImage[0]);
    } 
    // If equipmentImage is a string (initial value from database)
    else if (typeof equipmentImage === 'string') {
      setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${equipmentImage}`);
    }
  }, [equipmentImage]);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem('ownerAuth'))?.token;
        if (!token) {
          // Handle not logged in
          return;
        }
        // NOTE: Backend endpoint GET /api/equipment/{id} needs to be created
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/equipment/get/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const apiData = response.data;
        const formData = {
          equipmentName: apiData.equipmentName,
          category: apiData.equipmentList,
          properties: apiData.equipmentFeature,
          description: apiData.equipmentDetails,
          address: apiData.equipmentAddress,
          price: apiData.price,
          equipmentImg: apiData.equipmentImg
        };
        setOriginalEquipment(apiData);
        reset(formData); // Populate form with mapped data
        setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${apiData.equipmentImg}`);
      } catch (err) {
        setError('ไม่สามารถดึงข้อมูลอุปกรณ์ได้');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipmentData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    if (!originalEquipment) {
      Swal.fire('ข้อผิดพลาด', 'ไม่พบข้อมูลอุปกรณ์เดิม', 'error');
      return;
    }

    const formData = new FormData();

    // Append all form data
    formData.append('equipmentName', data.equipmentName);
    formData.append('equipmentDetails', data.description);
    formData.append('equipmentFeature', data.properties);
    formData.append('equipmentList', data.category);
    formData.append('equipmentAddress', data.address);
    formData.append('price', data.price);
    formData.append('equipmentStatus', originalEquipment.equipmentStatus); // Keep original status

    // Append new image only if it has been changed
    if (data.equipmentImg && data.equipmentImg[0] && typeof data.equipmentImg[0] !== 'string') {
      formData.append('image', data.equipmentImg[0]);
    }

    try {
      const token = JSON.parse(localStorage.getItem('ownerAuth'))?.token;
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/equipment/update/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว',
      }).then(() => {
        router.push('/Owner/listequipment');
      });

    } catch (err) {
      console.error('Update error:', err);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถบันทึกการเปลี่ยนแปลงได้',
      });
    }
  };

  if (isLoading) return <div className={styles.container}><p>กำลังโหลด...</p></div>;
  if (error) return <div className={styles.container}><p>{error}</p></div>;

  return (
    <div className={styles.container}>
      <MainHeader />
      <main className={styles.main} style={{ marginTop: '5rem' }}>
        <h1 className={styles.title}>แก้ไขข้อมูลอุปกรณ์</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <div className={styles.uploadSection}>
            <label htmlFor="equipmentImg" className={styles.uploadCircle}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <span>+ รูปภาพ</span>
              )}
            </label>
            <input
              type="file"
              id="equipmentImg"
              {...register('equipmentImg')}
              style={{ display: 'none' }}
            />
          </div>

          <div className={styles.form}>
            {/* Form fields will be similar to addequipment page */}
            <div className={styles.inputGroup}>
                <label htmlFor="equipmentName">ชื่ออุปกรณ์</label>
                <div className={styles.inputWrapper}>
                    <input id="equipmentName" {...register('equipmentName', { required: 'กรุณากรอกชื่ออุปกรณ์' })} className={`${styles.input} ${errors.equipmentName ? styles.inputError : ''}`} />
                    {errors.equipmentName && <p className={styles.errorText}>{errors.equipmentName.message}</p>}
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="category">หมวดหมู่</label>
                <div className={styles.inputWrapper}>
                    <select id="category" {...register('category', { required: 'กรุณาเลือกหมวดหมู่' })} className={`${styles.input} ${errors.category ? styles.inputError : ''}`}>
                        <option value="">เลือกหมวดหมู่</option>
                        <option value="Tractor">รถไถ</option>
                        <option value="Harvester">รถเกี่ยวข้าว</option>
                    </select>
                    {errors.category && <p className={styles.errorText}>{errors.category.message}</p>}
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="properties">คุณสมบัติ</label>
                <div className={styles.inputWrapper}>
                    <input id="properties" {...register('properties', { required: 'กรุณากรอกคุณสมบัติ' })} className={`${styles.input} ${errors.properties ? styles.inputError : ''}`} />
                    {errors.properties && <p className={styles.errorText}>{errors.properties.message}</p>}
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="description">รายละเอียด</label>
                <div className={styles.inputWrapper}>
                    <textarea id="description" {...register('description', { required: 'กรุณากรอกรายละเอียด' })} className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}></textarea>
                    {errors.description && <p className={styles.errorText}>{errors.description.message}</p>}
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="address">ที่อยู่ของสินค้า</label>
                <div className={styles.inputWrapper}>
                    <textarea id="address" {...register('address', { required: 'กรุณากรอกที่อยู่' })} className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}></textarea>
                    {errors.address && <p className={styles.errorText}>{errors.address.message}</p>}
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="price">ราคาเช่า (ต่อวัน)</label>
                <div className={styles.inputWrapper}>
                    <input id="price" type="number" {...register('price', { required: 'กรุณากรอกราคา', valueAsNumber: true })} className={`${styles.input} ${errors.price ? styles.inputError : ''}`} />
                    {errors.price && <p className={styles.errorText}>{errors.price.message}</p>}
                </div>
            </div>

            <div className={styles.submitButtonWrapper}>
              <button type="button" className={styles.cancelButton} onClick={() => router.push('/Owner/listequipment')}>ยกเลิก</button>
              <button type="submit" className={styles.submitButton}>บันทึกการเปลี่ยนแปลง</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditEquipmentPage;
