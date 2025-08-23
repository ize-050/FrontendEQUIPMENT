'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axios from 'axios';
import styles from './register.module.css';

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="60" height="60">
    <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    <path d="M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
  </svg>
);

const Step1Form = ({ onNext, formData, handleInputChange, handleFileChange, imagePreview, fileInputRef }) => (
  <>
    <div className={styles.formContainer}>
      <div className={styles.uploadSection}>
        <div className={styles.uploadCircle} onClick={() => fileInputRef.current.click()}>
          {imagePreview ? <img src={imagePreview} alt="Preview" className={styles.imagePreview} /> : <CameraIcon />}
        </div>
        <p>อัพโหลดรูป</p>
        <input 
          type="file" 
          style={{ display: 'none' }} 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*"
        />
      </div>
      <div className={styles.formSection}>
        <form className={styles.registerForm}>
          <div className="inputGroup">
            <label htmlFor="farmerUsername">ชื่อบัญชีผู้ใช้งาน</label>
            <input type="text" id="farmerUserName" name="farmerUserName" className={styles.input} value={formData.farmerUsername} onChange={handleInputChange} />
          </div>
          <div className="inputGroup">
            <label htmlFor="farmerPassword">รหัสผ่าน</label>
            <input type="password" id="farmerPassword" name="farmerPassword" className={styles.input} value={formData.farmerPassword} onChange={handleInputChange} />
          </div>
          <div className="inputGroup">
            <label htmlFor="farmerCFPassword">ยืนยันรหัสผ่าน</label>
            <input type="password" id="farmerCFPassword" name="farmerCFPassword" className={styles.input} value={formData.farmerCFPassword} onChange={handleInputChange} />
          </div>
          <div className="inputGroup">
            <label htmlFor="farmerEmail">อีเมล</label>
            <input type="email" id="farmerEmail" name="farmerEmail" className={styles.input} value={formData.farmerEmail} onChange={handleInputChange} />
          </div>
        </form>
      </div>
    </div>
    <button type="button" onClick={onNext} className={styles.submitButton}>ถัดไป</button>
  </>
);

const Step2Form = ({ onBack, handleSubmit, formData, handleInputChange }) => (
    <div className={`${styles.formContainer} ${styles.step2FormContainer}`}>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>ชื่อ</label><input type="text" name="farmerFName" className={styles.input} value={formData.farmerFName} onChange={handleInputChange} required /></div>
                <div className={styles.inputGroup}><label>นามสกุล</label><input type="text" name="farmerLName" className={styles.input} value={formData.farmerLName} onChange={handleInputChange} required /></div>
            </div>
            <div className={styles.inputGroup}>
                <label>เพศ</label>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="farmerGender" value="female" className={styles.radioInput} onChange={handleInputChange} checked={formData.farmerGender === 'female'} /> หญิง</label>
                    <label className={styles.radioLabel}><input type="radio" name="farmerGender" value="male" className={styles.radioInput} onChange={handleInputChange} checked={formData.farmerGender === 'male'} /> ชาย</label>
                    <label className={styles.radioLabel}><input type="radio" name="farmerGender" value="other" className={styles.radioInput} onChange={handleInputChange} checked={formData.farmerGender === 'other'} /> ไม่ระบุ</label>
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label>วันเกิด</label>
                <input type="date" name="farmerDOB" className={styles.input} value={formData.farmerDOB} onChange={handleInputChange} required />
            </div>
            <div className={styles.inputGroup}><label>เบอร์ติดต่อ</label><input type="tel" name="farmerTel" className={styles.input} value={formData.farmerTel} onChange={handleInputChange} required /></div>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>บ้านเลขที่</label><input type="text" name="farmerHouseNumber" className={styles.input} value={formData.farmerHouseNumber} onChange={handleInputChange} /></div>
                <div className={styles.inputGroup}><label>ซอย</label><input type="text" name="farmerAlley" className={styles.input} value={formData.farmerAlley} onChange={handleInputChange} /></div>
                <div className={styles.inputGroup}><label>หมู่</label><input type="text" name="farmerMoo" className={styles.input} value={formData.farmerMoo} onChange={handleInputChange} /></div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>ตำบล/แขวง</label><input type="text" name="farmerSubDistrict" className={styles.input} value={formData.farmerSubDistrict} onChange={handleInputChange} /></div>
                <div className={styles.inputGroup}><label>อำเภอ/เขต</label><input type="text" name="farmerDistrict" className={styles.input} value={formData.farmerDistrict} onChange={handleInputChange} /></div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.inputGroup}><label>จังหวัด</label><input type="text" name="farmerProvince" className={styles.input} value={formData.farmerProvince} onChange={handleInputChange} /></div>
                <div className={styles.inputGroup}><label>รหัสไปรษณีย์</label><input type="text" name="farmerPostalCode" className={styles.input} value={formData.farmerPostalCode} onChange={handleInputChange} /></div>
            </div>
            <div className={styles.buttonGroup}>
                <button type="button" onClick={onBack} className={`${styles.submitButton} ${styles.backButton}`}>ย้อนกลับ</button>
                <button type="submit" className={styles.submitButton}>สมัครสมาชิก</button>
            </div>
        </form>
    </div>
);

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    farmerUserName: '',
    farmerPassword: '',
    farmerCFPassword: '',
    farmerEmail: '',
    farmerFName: '',
    farmerLName: '',
    farmerGender: '',
    farmerDOB: '',
    farmerTel: '',
    farmerHouseNumber: '',
    farmerAlley: '',
    farmerMoo: '',
    farmerSubDistrict: '',
    farmerDistrict: '',
    farmerProvince: '',
    farmerPostalCode: ''
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleNext = () => {
    const { farmerUserName, farmerEmail, farmerPassword, farmerCFPassword } = formData;
    if (!farmerUserName || !farmerEmail || !farmerPassword || !farmerCFPassword) {
        Swal.fire('ข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลในขั้นตอนที่ 1 ให้ครบถ้วน', 'warning');
        return;
    }
    if (farmerPassword !== farmerCFPassword) {
      Swal.fire('รหัสผ่านผิดพลาด', 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน', 'error');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
      setStep(1);
  }

  const toggleTenantDropdown = () => {
    setIsTenantDropdownOpen(!isTenantDropdownOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ใช้ key ให้ตรงกับ formData
    const requiredFields = [
        'farmerFName', 'farmerLName', 'farmerGender', 'farmerTel', 'farmerDOB',
        'farmerHouseNumber', 'farmerSubDistrict', 'farmerDistrict', 'farmerProvince', 'farmerPostalCode'
    ];
    const isStep2Complete = requiredFields.every(field => formData[field]);

    if (!isStep2Complete) {
        Swal.fire('ข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลในขั้นตอนที่ 2 ให้ครบถ้วน', 'warning');
        return;
    }
    if (!file) {
        Swal.fire('ไม่มีรูปภาพ', 'กรุณาอัปโหลดรูปโปรไฟล์', 'warning');
        return;
    }

    // log ข้อมูลก่อนส่ง
    console.log('formData:', formData);
    console.log('file:', file);

    const data = new FormData();
    data.append('farmer', JSON.stringify(formData));
    data.append('file', file);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/farmer/register`, data);

      Swal.fire('สำเร็จ', response.data.message || 'สมัครสมาชิกเรียบร้อยแล้ว', 'success').then(() => {
          router.push('/farmer/register');
      });

    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response && error.response.data && error.response.data.message 
                           ? error.response.data.message 
                           : 'การสมัครสมาชิกผิดพลาด';
      Swal.fire('ผิดพลาด', errorMessage, 'error');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div>
            <div className={styles.logo}>SMART/AGRIRENT</div>
            <div className={styles.logoSubtext}>AGRICULTURAL EQUIPMENT RENTAL PLATFORM</div>
          </div>
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>หน้าแรก v</a>
          <a href="#" className={styles.navLink}>ค้นหาเครื่องจักร v</a>
          <a href="#" className={styles.navLink}>นโยบายส่วนตัว v</a>
        </nav>
        <div className={styles.userActions}>
          <div className={styles.dropdownContainer}>
            <button className={`${styles.actionButton} ${styles.tenant}`} onClick={toggleTenantDropdown}>
              ผู้เช่า v
            </button>
            {isTenantDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/Farmer/login" className={styles.dropdownItem}>เข้าสู่ระบบ</Link>
                <Link href="/Farmer/register" className={styles.dropdownItem}>สมัครสมาชิก</Link>
              </div>
            )}
          </div>
          <button className={`${styles.actionButton} ${styles.owner}`}>เจ้าของเครื่องมือ v</button>
        </div>
      </header>

      <div className={styles.registerBanner}>
        <h1>ผู้เช่า : Register/สมัครสมาชิก</h1>
      </div>

      <main className={styles.main}>
        {step === 1 ? 
            <Step1Form onNext={handleNext} formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} imagePreview={imagePreview} fileInputRef={fileInputRef} /> : 
            <Step2Form onBack={handleBack} handleSubmit={handleSubmit} formData={formData} handleInputChange={handleInputChange} />}
      </main>
    </div>
  );
}
