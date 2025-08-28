"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./equipment.module.css";

const Header = () => (
  <header>
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <div>SMART/AGRIRENT</div>
          <div className={styles.logoSmallText}>
            AGRICULTURAL EQUIPMENT RENTAL PLATFORM
          </div>
        </Link>
      </div>
      <nav className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          หน้าแรก
        </Link>
        <Link href="/Farmer/equipment" className={styles.navLink}>
          ค้นหาเครื่องจักร
        </Link>
        <Link href="/" className={styles.navLink}>
          นโยบายส่วนตัว
        </Link>
      </nav>
      <div className={styles.userSection}>
        <div className={styles.userProfile}>
          <span>NUT.05</span>
        </div>
        <div className={styles.menuIcon}>☰</div>
      </div>
    </div>
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="คุณกำลังมองหาอะไร?"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>ค้นหา</button>
      </div>
    </div>
  </header>
);

export default function EquipmentPage() {
  const [eqType, setEqType] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchEquipmentTypes = async () => {
    try {
      const response = await fetch("http://localhost:8080/equipment-type/all");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched equipment types:", data);
      return data;
    } catch (error) {
      console.error("Error fetching equipment types:", error);
      throw error;
    }
  };

  const fetchEquipmentByType = async (typeId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:8080/equipment/all-by-type/${typeId}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(`Equipment for type ${typeId}:`, data);
      setEquipment(data);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลอุปกรณ์ได้");
      console.error("Error fetching equipment:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedTypeId !== null) {
      fetchEquipmentByType(selectedTypeId);
    }
  }, [selectedTypeId]);

  useEffect(() => {
    const loadEquipmentTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEquipmentTypes();
        setEqType(data); // ใช้ setEqType แทน setEquipmentTypes
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลหมวดหมู่ได้");
        console.error("Error fetching equipment types:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEquipmentTypes();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <h2 className={styles.categoryTitle}>หมวดหมู่เครื่องจักร</h2>
          <ul className={styles.categoryList}>
            {eqType.map((type) => (
              <li
                key={type.equipmentTypeId}
                className={`${styles.categoryItem} ${
                  selectedTypeId === type.equipmentTypeId ? styles.active : ""
                }`}
                onClick={() => setSelectedTypeId(type.equipmentTypeId)}
              >
                {type.equipmentTypeName}
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.contentSection}>
          <div className={styles.equipmentSection}>
            {loading && <div className={styles.loader}>กำลังโหลด...</div>}
            {error && <div className={styles.error}>{error}</div>}
            {!loading && !error && equipment.length === 0 && (
              <div className={styles.emptyState}>
                <h3>กรุณาเลือกหมวดหมู่เครื่องจักร</h3>
                <p>เลือกหมวดหมู่ทางด้านซ้ายเพื่อดูรายการเครื่องจักร</p>
              </div>
            )}
            <ul className={styles.equipmentList}>
              {equipment.map((eq) => (
                <li key={eq.equipmentId} className={styles.equipmentCard}>
                  <div className={styles.cardImageSection}>
                    <div
                      className={`${styles.statusTag} ${
                        eq.equipmentStatus === "Available"
                          ? styles.available
                          : styles.unavailable
                      }`}
                    >
                      {eq.equipmentStatus === "Available"
                        ? "พร้อมใช้งาน"
                        : "ไม่ว่าง"}
                    </div>
                    <img
                      src={`http://localhost:8080/equipment/images/${eq.equipmentImg}`}
                      alt={eq.equipmentName}
                      className={styles.equipmentImg}
                    />
                  </div>

                  <div className={styles.cardInfoSection}>
                    <div className={styles.mainInfo}>
                      <h3 className={styles.equipmentName}>
                        {eq.equipmentName}
                      </h3>
                      <div className={styles.priceWrapper}>
                        <span className={styles.priceLabel}>ราคาเริ่มต้น</span>
                        <span className={styles.priceValue}>
                          ฿{eq.price.toLocaleString()} /วัน
                        </span>
                      </div>
                    </div>

                    <div className={styles.details}>
                      <h4>รายละเอียด</h4>
                      <p>{eq.equipmentDetails}</p>
                      <h4>คุณสมบัติ</h4>
                      <p>{eq.equipmentFeature}</p>
                      <h4>พื้นที่ให้บริการ</h4>
                      <p>{eq.equipmentAddress}</p>
                    </div>

                    <div className={styles.bottomSection}>
                      <div className={styles.reviews}>
                        <span>รีวิว: {eq.viewsReviews || "ยังไม่มีรีวิว"}</span>
                      </div>
                      <button
                        className={styles.rentButton}
                        onClick={() =>
                          (window.location.href = `#booking-${eq.equipmentId}`)
                        }
                      >
                        จองเครื่องจักร
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {selectedTypeId && equipment.length > 0 && (
            <div
              className={styles.bookingForm}
              id={`booking-${equipment[0].equipmentId}`}
            >
              <h3 className={styles.bookingTitle}>กรอกข้อมูลการจอง</h3>
              <div className={styles.bookingGrid}>
                <div className={styles.dateSection}>
                  <div className={styles.datePicker}>
                    <label>วันที่เริ่มเช่า</label>
                    <input type="date" className={styles.dateInput} />
                  </div>
                  <div className={styles.datePicker}>
                    <label>วันที่คืน</label>
                    <input type="date" className={styles.dateInput} />
                  </div>
                </div>

                <div className={styles.addressSection}>
                  <label>ที่อยู่จัดส่ง</label>
                  <textarea
                    className={styles.addressInput}
                    placeholder="กรุณากรอกที่อยู่จัดส่งโดยละเอียด"
                    rows="4"
                  />
                </div>
              </div>

              <button className={styles.submitButton}>ยืนยันการจอง</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
