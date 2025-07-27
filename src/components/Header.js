'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in by reading from localStorage
    const farmerAuth = localStorage.getItem('farmerAuth');
    if (farmerAuth) {
      try {
        const authData = JSON.parse(farmerAuth);
        setUser(authData);
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('farmerAuth');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('farmerAuth');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <Link href="/">SMART/AGRIRENT</Link>
          </div>
          <div className="flex items-center">
            <Link href="/" className="text-gray-800 mx-3 hover:text-blue-500">หน้าแรก</Link>
            <Link href="/booking" className="text-gray-800 mx-3 hover:text-blue-500">ค้นหาเครื่องจักร</Link>
            <Link href="/about" className="text-gray-800 mx-3 hover:text-blue-500">เกี่ยวกับเรา</Link>
            <Link href="/contact" className="text-gray-800 mx-3 hover:text-blue-500">ติดต่อเรา</Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-800 font-medium">
                  สวัสดีคุณ, {user.username}
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <Link href="/Farmer/login">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                  เข้าสู่ระบบ
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
