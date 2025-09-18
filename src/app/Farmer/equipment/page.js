"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./equipment.module.css";
import MainHeader from "@/components/MainHeader";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [lockedEqIds, setLockedEqIds] = useState([]); // eqId ที่ถูกล็อกจากสถานะจอง (ไม่ใช่ CONFIRMED)

  const router = useRouter();

  const fetchEquipmentTypes = async () => {
    const res = await fetch("http://localhost:8080/equipment-type/all");
    if (!res.ok) throw new Error("load types failed");
    return res.json();
  };

  const fetchLockedEquipment = async (equipmentList) => {
    const ids = equipmentList.map((e) => e.equipmentId);
    if (!ids.length) {
      setLockedEqIds([]);
      return;
    }

    let token = null;
    try {
      const farmerToken = JSON.parse(
        localStorage.getItem("farmerAuth") || "null"
      );
      token = farmerToken?.token || null;
    } catch {}

    const params = new URLSearchParams();
    ids.forEach((id) => params.append("equipmentIds", String(id)));

    const res = await fetch(
      `http://localhost:8080/booking/equipment-locked?${params.toString()}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    if (!res.ok) {
      setLockedEqIds([]);
      return;
    }
    const data = await res.json();
    setLockedEqIds(data.lockedEquipmentIds || []);
  };

  const fetchEquipmentByType = async (typeId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `http://localhost:8080/equipment/all-by-type/${typeId}`
      );
      if (!res.ok) throw new Error("load equipment failed");
      const data = await res.json();
      setEquipment(data);
      await fetchLockedEquipment(data);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลอุปกรณ์ได้");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ถอดรายการที่ถูกล็อกออกจาก selection อัตโนมัติ
  useEffect(() => {
    setSelectedEquipments((prev) =>
      prev.filter((id) => !lockedEqIds.includes(id))
    );
  }, [lockedEqIds]);

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

    if (
      !bookingStartDate ||
      !bookingEndDate ||
      !changeAddress ||
      selectedEquipments.length === 0
    ) {
      setSubmitStatus("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const conflicted = selectedEquipments.filter((id) =>
      lockedEqIds.includes(id)
    );
    if (conflicted.length) {
      setSubmitStatus("มีบางรายการไม่ว่าง");
      return;
    }

    try {
      let token = null;
      try {
        const farmerToken = JSON.parse(
          localStorage.getItem("farmerAuth") || "null"
        );
        token = farmerToken?.token || null;
      } catch {}

      const res = await fetch(
        "http://localhost:8080/booking/create-with-equipment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

      if (!res.ok) throw new Error("booking failed");

      setSubmitStatus("จองสำเร็จ!");
      setBookingStartDate("");
      setBookingEndDate("");
      setChangeAddress("");
      setSelectedEquipments([]);
      router.push("/Farmer/acceptance");
    } catch (err) {
      setSubmitStatus("เกิดข้อผิดพลาดในการจอง");
    }
  };

  const filteredEquipment = equipment.filter((eq) =>
    (eq.equipmentName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedTypeId !== null) fetchEquipmentByType(selectedTypeId);
  }, [selectedTypeId]);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);
        const types = await fetchEquipmentTypes();
        setEqType(types);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลหมวดหมู่ได้");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <div className={styles.container}>
      <MainHeader />
      <main className={styles.mainContent}>
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
              {filteredEquipment.map((eq) => {
                // ไม่ว่าง ถ้า: ไม่ใช่ Available หรือ ถูกล็อกจากการจองที่ยังไม่ CONFIRMED
                const isUnavailable =
                  eq.equipmentStatus !== "Available" ||
                  lockedEqIds.includes(eq.equipmentId);
                const isAvailable = !isUnavailable;

                return (
                  <li key={eq.equipmentId} className={styles.equipmentCard}>
                    <div className={styles.cardImageSection}>
                      <div
                        className={`${styles.statusTag} ${
                          isAvailable ? styles.available : styles.unavailable
                        }`}
                      >
                        {isAvailable ? "ว่าง" : "ไม่ว่าง"}
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
                          <span className={styles.priceLabel}>
                            ราคาเริ่มต้น
                          </span>
                          <span className={styles.priceValue}>
                            ฿{Number(eq.price || 0).toLocaleString()} /วัน
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
                          <span>
                            รีวิว: {eq.viewsReviews || "ยังไม่มีรีวิว"}
                          </span>
                        </div>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={selectedEquipments.includes(
                              eq.equipmentId
                            )}
                            onChange={() =>
                              handleCheckboxChange(eq.equipmentId)
                            }
                            disabled={!isAvailable}
                          />
                          <span style={{ marginLeft: 8 }}>
                            เลือกจองเครื่องจักร
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

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
                    rows={4}
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
