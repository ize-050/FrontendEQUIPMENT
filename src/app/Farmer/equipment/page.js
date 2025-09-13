"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./equipment.module.css";
import MainHeader from "@/components/MainHeader";

// Header รับ props searchTerm, setSearchTerm
const Header = ({ searchTerm, setSearchTerm }) => (
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={styles.searchButton}
          type="button"
          tabIndex={-1}
          style={{ pointerEvents: "none", opacity: 0.7 }}
        >
          ค้นหา
        </button>
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
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [bookingStartDate, setBookingStartDate] = useState("");
  const [bookingEndDate, setBookingEndDate] = useState("");
  const [changeAddress, setChangeAddress] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // เพิ่ม state สำหรับค้นหา
  const router = useRouter();

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

  // ฟังก์ชันสำหรับ checkbox
  const handleCheckboxChange = (equipmentId) => {
    setSelectedEquipments((prev) =>
      prev.includes(equipmentId)
        ? prev.filter((id) => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // ตรวจสอบข้อมูล
    if (
      !bookingStartDate ||
      !bookingEndDate ||
      !changeAddress ||
      selectedEquipments.length === 0
    ) {
      setSubmitStatus("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const farmerToken = JSON.parse(localStorage.getItem("farmerAuth"));
      const token = farmerToken?.token;
      const res = await fetch(
        "http://localhost:8080/booking/create-with-equipment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingStartDate,
            bookingEndDate,
            bookingStatus: "pending",
            changeAddress,
            equipmentIds: selectedEquipments,
          }),
        }
      );

      if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการจอง");

      setSubmitStatus("จองสำเร็จ!");
      // reset form
      setBookingStartDate("");
      setBookingEndDate("");
      setChangeAddress("");
      setSelectedEquipments([]);

      // ไปหน้า acceptance ทันที (ไม่ต้อง setTimeout)
      router.push("/Farmer/acceptance");
    } catch (err) {
      setSubmitStatus("เกิดข้อผิดพลาดในการจอง");
    }
  };

  // ฟังก์ชันกรองอุปกรณ์ตาม searchTerm
  const filteredEquipment = equipment.filter((eq) =>
    eq.equipmentName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <MainHeader />
      <main className={styles.mainContent}>
        {" "}
        {/* เปลี่ยนชื่อ class */}
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
          <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="คุณกำลังมองหาอะไร?"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.equipmentSection}>
            {loading && <div className={styles.loader}>กำลังโหลด...</div>}
            {error && <div className={styles.error}>{error}</div>}
            {!loading && !error && filteredEquipment.length === 0 && (
              <div className={styles.emptyState}>
                <h3>ไม่พบเครื่องจักรที่ตรงกับ "{searchTerm}"</h3>
              </div>
            )}
            <ul className={styles.equipmentList}>
              {filteredEquipment.map((eq) => (
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
                      src={`http://localhost:8080/uploads/images/${eq.equipmentImg}`}
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
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedEquipments.includes(eq.equipmentId)}
                          onChange={() => handleCheckboxChange(eq.equipmentId)}
                          disabled={eq.equipmentStatus !== "Available"}
                        />
                        <span style={{ marginLeft: 8 }}>
                          เลือกจองเครื่องจักร
                        </span>
                      </label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* แสดงฟอร์มจองเมื่อเลือกเครื่องจักรอย่างน้อย 1 รายการ */}
          {selectedEquipments.length > 0 && (
            <form className={styles.bookingForm} onSubmit={handleBookingSubmit}>
              <h3 className={styles.bookingTitle}>กรอกข้อมูลการจอง</h3>
              <div className={styles.bookingGrid}>
                <div className={styles.dateSection}>
                  <div className={styles.datePicker}>
                    <label>วันที่เริ่มเช่า</label>
                    <input
                      type="date"
                      className={styles.dateInput}
                      value={bookingStartDate}
                      onChange={(e) => setBookingStartDate(e.target.value)}
                    />
                  </div>
                  <div className={styles.datePicker}>
                    <label>วันที่คืน</label>
                    <input
                      type="date"
                      className={styles.dateInput}
                      value={bookingEndDate}
                      onChange={(e) => setBookingEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.addressSection}>
                  <label>ที่อยู่จัดส่ง</label>
                  <textarea
                    className={styles.addressInput}
                    placeholder="กรุณากรอกที่อยู่จัดส่งโดยละเอียด"
                    rows="4"
                    value={changeAddress}
                    onChange={(e) => setChangeAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.selectedList}>
                <b>เครื่องจักรที่เลือก:</b>
                <ul>
                  {equipment
                    .filter((eq) => selectedEquipments.includes(eq.equipmentId))
                    .map((eq) => (
                      <li key={eq.equipmentId}>{eq.equipmentName}</li>
                    ))}
                </ul>
              </div>
              <button className={styles.submitButton} type="submit">
                ยืนยันการจอง
              </button>
              {submitStatus && (
                <div
                  style={{
                    marginTop: 16,
                    color: submitStatus === "จองสำเร็จ!" ? "green" : "red",
                  }}
                >
                  {submitStatus}
                </div>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
