"use client";
import React, { useState } from "react";
import MainHeader from "@/components/MainHeader";
import styles from "./viewreviews.module.css";

const reviews = [
  {
    id: 1,
    customerName: "สมชาย ใจดี",
    rating: 5,
    comment: "ใช้งานง่ายมากครับ บริการดีเยี่ยม",
    date: "15/08/2568",
    avatar: "/user-placeholder.svg",
    equipmentName: "รถไถดินคูโบต้า M5001",
    rentalDuration: "3 วัน",
  },
  {
    id: 2,
    customerName: "สมหญิง จริงใจ",
    rating: 4,
    comment: "อุปกรณ์มีคุณภาพดี แต่การจัดส่งช้าไปหน่อย",
    date: "14/08/2568",
    avatar: "/user-placeholder.svg",
  },
  {
    id: 3,
    customerName: "กฤษฎา พารวย",
    rating: 5,
    comment: "สุดยอดครับ! จะกลับมาใช้บริการอีกแน่นอน",
    date: "12/08/2568",
    avatar: "/user-placeholder.svg",
  },
];

const ViewReviewsPage = () => {
  const [filterRating, setFilterRating] = useState(0);

  const filteredReviews = filterRating
    ? reviews.filter((review) => review.rating === filterRating)
    : reviews;

  return (
    <div className={styles.pageContainer}>
      <MainHeader />
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>รีวิวจากลูกค้า</h1>
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{reviews.length}</span>
              <span className={styles.statLabel}>รีวิวทั้งหมด</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>
                {(
                  reviews.reduce((acc, rev) => acc + rev.rating, 0) /
                  reviews.length
                ).toFixed(1)}
              </span>
              <span className={styles.statLabel}>คะแนนเฉลี่ย</span>
            </div>
          </div>
          <div className={styles.filterSection}>
            <span>กรองตามคะแนน: </span>
            {[0, 5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className={`${styles.filterButton} ${
                  filterRating === rating ? styles.active : ""
                }`}
                onClick={() => setFilterRating(rating)}
              >
                {rating === 0 ? "ทั้งหมด" : `${rating} ดาว`}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.reviewsList}>
          {filteredReviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <img src={review.avatar} alt="" className={styles.avatar} />
                <div className={styles.customerInfo}>
                  <span className={styles.customerName}>
                    {review.customerName}
                  </span>
                  <span className={styles.reviewDate}>{review.date}</span>
                  <div className={styles.equipmentInfo}>
                    <span>เช่า: {review.equipmentName}</span>
                    <span>ระยะเวลา: {review.rentalDuration}</span>
                  </div>
                </div>
              </div>
              <div className={styles.reviewBody}>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < review.rating
                          ? styles.starFilled
                          : styles.starEmpty
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className={styles.comment}>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewReviewsPage;
