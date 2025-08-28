'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import MainHeader from '../../../components/MainHeader';
import styles from './add-equipment.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="60" height="60">
    <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5 5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    <path d="M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
  </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#2a5b3e" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    </svg>
);

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.hamburgerIcon}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export default function AddEquipmentPage() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // เพิ่ม state สำหรับ equipment types
  const [eqType, setEqType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('equipmentName', data.equipmentName);
    formData.append('equipmentTypeId', data.equipmentTypeId); // ส่ง ID แทน category
    formData.append('properties', data.properties);
    formData.append('description', data.description);
    formData.append('address', data.address);
    formData.append('price', parseFloat(data.price));
    formData.append('image', image);

    try {
      const ownerAuth = JSON.parse(localStorage.getItem('ownerAuth'));
      const token = ownerAuth?.token;

      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'ไม่ได้เข้าสู่ระบบ',
          text: 'กรุณาเข้าสู่ระบบก่อนเพิ่มอุปกรณ์',
        });
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/equipment/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มอุปกรณ์สำเร็จ!',
          text: response.data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/Owner/listequipment');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เพิ่มอุปกรณ์ไม่สำเร็จ!',
          text: 'Unknown error',
        });
      }
    } catch (error) {
      console.error('Error adding equipment:', error);
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มอุปกรณ์ไม่สำเร็จ!',
        text: 'An error occurred: ' + (error.response?.data?.message || error.message),
      });
    }
  };

  const fetchEquipmentTypes = async () => {
    try {
      const response = await fetch('http://localhost:8080/equipment-type/all');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched equipment types:', data);
      return data;
    } catch (error) {
      console.error('Error fetching equipment types:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadEquipmentTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEquipmentTypes();
        setEqType(data); // ใช้ setEqType แทน setEquipmentTypes
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลหมวดหมู่ได้');
        console.error('Error fetching equipment types:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEquipmentTypes();
  }, []);

  return (
    <div className={styles.container}>
      <MainHeader/>
      <main className={styles.main} style={{ marginTop: '5rem' }}>
        <h1 className={styles.title}>เพิ่มอุปกรณ์</h1>
        <div className={styles.formContainer}>
            <div className={styles.uploadSection}>
                <label htmlFor="imageUpload" className={styles.uploadCircle} style={{ cursor: 'pointer' }}>
                    {imagePreview ? (
                        <img src={imagePreview} alt="Equipment Preview" className={styles.imagePreview} />
                    ) : (
                        <CameraIcon />
                    )}
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                <p>อัพโหลดภาพสินค้า</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label>ชื่อสินค้า :</label>
                    <div className={styles.inputWrapper}>
                        <input 
                            type="text" 
                            className={`${styles.input} ${errors.equipmentName ? styles.inputError : ''}`}
                            {...register('equipmentName', { required: 'กรุณากรอกชื่อสินค้า' })}
                        />
                        {errors.equipmentName && <span className={styles.errorText}>{errors.equipmentName.message}</span>}
                    </div>
                </div>
                
                <div className={styles.inputGroup}>
                    <label>หมวดหมู่ :</label>
                    <div className={styles.inputWrapper}>
                        <select 
                            className={`${styles.select} ${errors.equipmentTypeId ? styles.inputError : ''}`}
                            {...register('equipmentTypeId', { required: 'กรุณาเลือกหมวดหมู่' })}
                            disabled={loading}
                        >
                            <option value="">
                                {loading ? 'กำลังโหลด...' : 'เลือกหมวดหมู่'}
                            </option>
                            {eqType.map((type) => (
                                <option 
                                    key={type.equipmentTypeId} 
                                    value={type.equipmentTypeId}
                                >
                                    {type.equipmentTypeName}
                                </option>
                            ))}
                        </select>
                        {error && <span className={styles.errorText}>{error}</span>}
                        {errors.equipmentTypeId && <span className={styles.errorText}>{errors.equipmentTypeId.message}</span>}
                    </div>
                </div>
                
                <div className={styles.inputGroup}>
                    <label>คุณสมบัติ :</label>
                    <div className={styles.inputWrapper}>
                        <input 
                            type="text" 
                            className={`${styles.input} ${errors.properties ? styles.inputError : ''}`}
                            {...register('properties', { required: 'กรุณากรอกรายละเอียดคุณสมบัติ' })}
                        />
                        {errors.properties && <span className={styles.errorText}>{errors.properties.message}</span>}
                    </div>
                </div>
                
                <div className={styles.inputGroup}>
                    <label>รายละเอียด :</label>
                    <div className={styles.inputWrapper}>
                        <textarea 
                            className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                            {...register('description', { required: 'กรุณากรอกรายละเอียดสินค้า' })}
                        ></textarea>
                        {errors.description && <span className={styles.errorText}>{errors.description.message}</span>}
                    </div>
                </div>
                
                <div className={styles.inputGroup}>
                    <label>ที่อยู่ของสินค้า :</label>
                    <div className={styles.inputWrapper}>
                        <textarea 
                            className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}
                            {...register('address', { required: 'กรุณากรอกที่อยู่ของสินค้า' })}
                        ></textarea>
                        {errors.address && <span className={styles.errorText}>{errors.address.message}</span>}
                    </div>
                </div>
                
                <div className={styles.inputGroup}>
                    <label>ราคาที่ปล่อยเช่า :</label>
                    <div className={styles.inputWrapper}>
                        <div className={styles.priceInputWrapper}>
                            <input 
                                type="number" 
                                className={`${styles.priceInput} ${errors.price ? styles.inputError : ''}`}
                                {...register('price', { 
                                    required: 'กรุณากรอกราคา', 
                                    min: { value: 1, message: 'ราคาต้องมากกว่า 0' } 
                                })}
                            />
                            <button type="button" className={styles.plusButton}><PlusIcon /></button>
                        </div>
                        {errors.price && <span className={styles.errorText}>{errors.price.message}</span>}
                    </div>
                </div>
                <div className={styles.submitButtonWrapper}>
                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'กำลังโหลด...' : 'บันทึกและเผยแพร่'}
                    </button>
                </div>
            </form>
        </div>
      </main>
    </div>
  );
}