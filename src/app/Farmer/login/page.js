"use client";

import { useState } from "react";
import MainHeader from "@/components/MainHeader";
import styles from "./login.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
  </svg>
);

export default function LoginPage() {
  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleTenantDropdown = () => {
    setIsTenantDropdownOpen(!isTenantDropdownOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูล",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    if (username.length < 6 || username.length > 20) {
      Swal.fire({
        icon: "error",
        title: "ชื่อผู้ใช้ไม่ถูกต้อง",
        text: "ชื่อผู้ใช้ต้องมีความยาวตั้งแต่ 6 ถึง 20 ตัวอักษร",
      });
      return;
    }

    const usernamePattern = /^[A-Za-z0-9]+$/;
    if (!usernamePattern.test(username)) {
      Swal.fire({
        icon: "error",
        title: "ชื่อผู้ใช้ไม่ถูกต้อง",
        text: "ชื่อผู้ใช้ต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น และห้ามมีเว้นวรรค",
      });
      return;
    }

    if (password.length < 8 || password.length > 16) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ถูกต้อง",
        text: "รหัสผ่านต้องมีความยาวตั้งแต่ 8 ถึง 16 ตัวอักษร",
      });
      return;
    }

    const passwordPattern = /^[A-Za-z0-9!#_.]+$/;
    if (!passwordPattern.test(password)) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ถูกต้อง",
        text: "รหัสผ่านต้องเป็นภาษาอังกฤษหรือตัวเลข และใช้อักขระพิเศษเฉพาะ ! # _ . เท่านั้น และห้ามมีเว้นวรรค",
      });
      return;
    }

    const loginData = {
      farmerUserName: username,
      farmerPassword: password,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/farmer/login`,
        loginData
      ); //http proto

      if (response.status === 200) {
        // Store login response in localStorage
        const loginResponse = response.data;
        localStorage.setItem(
          "farmerAuth",
          JSON.stringify({
            token: loginResponse.token,
            type: loginResponse.type,
            farmerId: loginResponse.farmerId,
            username: loginResponse.username,
            message: loginResponse.message,
          })
        );

        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ!",
          text: loginResponse.message,
        }).then(() => {
          // Redirect to home page after successful login
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ!",
          text: "Unknown error",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: "An error occurred: " + error.message,
      });
    }
  };

  return (
    <>
      <MainHeader />
      <div className={styles.container}>
        <div className={styles.loginBanner}>
          <h1>ผู้เช่า : Login/เข้าสู่ระบบ</h1>
        </div>

        <main className={styles.main}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputIcon}>
                <UserIcon />
              </div>
              <input
                type="text"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.inputIcon}>
                <LockIcon />
              </div>
              <input
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="#" className={styles.forgotPassword}>
              Forgot Password?
            </a>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
