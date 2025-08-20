'use client';
import React, { useState, useEffect } from 'react';
import './terms.css';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hamburgerIcon">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const TractorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="tractor-icon">
    <circle cx="7" cy="17" r="2"/>
    <circle cx="18" cy="17" r="2"/>
    <path d="M5 17h-2v-6l2-5h9l4 5h2v6h-2"/>
    <path d="M6 4h4l2 3h6"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="check-icon">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shield-icon">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

export default function TermsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState({});
  const [allAccepted, setAllAccepted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Floating animation for background elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  const terms = [
    {
      id: 1,
      title: "การยืนยันข้อมูลผู้เช่า",
      detail: "ผู้เช่าต้องให้ข้อมูลที่ถูกต้องและครบถ้วนสำหรับการติดต่อและการเช่า การให้ข้อมูลที่ไม่ถูกต้องอาจทำให้การเช่าเป็นโมฆะ",
      icon: "📋",
      color: "blue"
    },
    {
      id: 2,
      title: "การใช้งานอุปกรณ์",
      detail: "ผู้เช่าตกลงที่จะใช้อุปกรณ์ที่เช่าอย่างระมัดระวังและปฏิบัติตามคู่มือการใช้งานของอุปกรณ์ทุกประการ ห้ามนำอุปกรณ์ไปใช้นอกเหนือจากวัตถุประสงค์ที่ระบุไว้",
      icon: "⚙️",
      color: "green"
    },
    {
      id: 3,
      title: "การห้ามใช้อุปกรณ์ในทางที่ผิดกฎหมาย",
      detail: "ผู้เช่าห้ามนำอุปกรณ์ไปใช้ในการกระทำที่ผิดกฎหมาย เช่น การตัดไม้ทำลายป่า การล่าสัตว์ การทำลายทรัพย์สินสาธารณะ หรือการกระทำกิจกรรมที่ละเมิดกฎหมายสิ่งแวดล้อม",
      icon: "⚠️",
      color: "red"
    },
    {
      id: 4,
      title: "ความรับผิดชอบต่ออุปกรณ์",
      detail: "ผู้เช่าจะต้องรับผิดชอบในการดูแลรักษาอุปกรณ์ในช่วงระยะเวลาการเช่า หากอุปกรณ์เกิดความเสียหาย สูญหาย หรือถูกขโมย ผู้เช่าจะต้องชดใช้ค่าเสียหายตามมูลค่าของอุปกรณ์",
      icon: "🛡️",
      color: "purple"
    },
    {
      id: 5,
      title: "การคืนอุปกรณ์",
      detail: "ผู้เช่าต้องคืนอุปกรณ์ตามระยะเวลาที่กำหนดในสัญญาเช่า หากคืนล่าช้าหรือไม่คืนตามเงื่อนไข จะต้องชำระค่าปรับหรือค่าเช่าตามที่ตกลงไว้",
      icon: "🔄",
      color: "orange"
    },
    {
      id: 6,
      title: "การยกเลิกการเช่า",
      detail: "ผู้เช่าสามารถยกเลิกการเช่าได้ภายใต้เงื่อนไขที่กำหนด เช่น การแจ้งล่วงหน้าภายในเวลาที่ระบุ หากยกเลิกหลังจากเวลาที่กำหนด ผู้เช่าอาจไม่ได้รับเงินคืน",
      icon: "❌",
      color: "pink"
    }
  ];

  const handleTermAccept = (termId) => {
    const newAccepted = {
      ...acceptedTerms,
      [termId]: !acceptedTerms[termId]
    };
    setAcceptedTerms(newAccepted);
    
    // Check if all terms are accepted
    const allChecked = terms.every(term => newAccepted[term.id]);
    setAllAccepted(allChecked);
  };

  const handleFinalAccept = () => {
    if (allAccepted) {
      alert('ขอบคุณสำหรับการยอมรับข้อกำหนดทั้งหมด! คุณสามารถเริ่มใช้บริการเช่าอุปกรณ์ได้แล้ว');
    } else {
      alert('กรุณายอมรับข้อกำหนดทุกข้อก่อนดำเนินการต่อ');
    }
  };

  return (
    <div className="container">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-element tractor-bg">🚜</div>
        <div className="floating-element plant-bg">🌱</div>
        <div className="floating-element gear-bg">⚙️</div>
        <div className="floating-element leaf-bg">🍃</div>
      </div>

      <header className="header">
        <div className="logoContainer">
          <div className="logo">
            <TractorIcon />
            <span>SMART/AGRIRENT</span>
          </div>
          <div className="logoSubtext">AGRICULTURAL EQUIPMENT RENTAL PLATFORM</div>
        </div>
        <nav className="nav">
          <a href="#" className="navLink">
            หน้าแรก <span className="dropdown-arrow">▼</span>
          </a>
          <a href="#" className="navLink">
            ค้นหาเครื่องจักร <span className="dropdown-arrow">▼</span>
          </a>
          <a href="#" className="navLink">
            นโยบายส่วนตัว <span className="dropdown-arrow">▼</span>
          </a>
        </nav>
        <div className="userActions">
          <div className="profile">
            <UserIcon />
            <span>NUT.05</span>
          </div>
          <HamburgerIcon />
        </div>
      </header>

      <main className="main">
        <div className="titleBanner">
          <div className="bannerOverlay"></div>
          <div className="bannerContent">
            <ShieldIcon />
            <h1 className={`title ${isVisible ? 'animate-in' : ''}`}>
              ข้อกำหนดสำหรับผู้เช่า
            </h1>
            <p className="subtitle">กรุณาอ่านและยอมรับข้อกำหนดทั้งหมดเพื่อใช้บริการ</p>
          </div>
          <div className="wave-decoration"></div>
        </div>

        <div className="termsContainer">
          <div className="terms-intro">
            <h2>📋 ข้อกำหนดการใช้บริการ</h2>
            <p>เพื่อความปลอดภัยและการใช้งานที่มีประสิทธิภาพ กรุณาอ่านข้อกำหนดต่อไปนี้อย่างละเอียด</p>
          </div>

          <div className="termsList">
            {terms.map((term, index) => (
              <div 
                key={term.id} 
                className={`term-card ${acceptedTerms[term.id] ? 'accepted' : ''} ${term.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="term-header">
                  <div className="term-icon">{term.icon}</div>
                  <div className="term-number">{term.id}</div>
                  <h3 className="term-title">{term.title}</h3>
                  <div className="term-status">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox"
                        checked={acceptedTerms[term.id] || false}
                        onChange={() => handleTermAccept(term.id)}
                      />
                      <span className="checkmark">
                        <CheckIcon />
                      </span>
                    </label>
                  </div>
                </div>
                <div className="term-detail">
                  <p>{term.detail}</p>
                </div>
                <div className="term-progress">
                  <div className={`progress-bar ${acceptedTerms[term.id] ? 'complete' : ''}`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="progress-summary">
            <div className="progress-info">
              <span className="progress-text">
                ยอมรับแล้ว: {Object.values(acceptedTerms).filter(Boolean).length}/{terms.length} ข้อ
              </span>
              <div className="overall-progress">
                <div 
                  className="overall-progress-bar"
                  style={{ 
                    width: `${(Object.values(acceptedTerms).filter(Boolean).length / terms.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="buttonContainer">
          <button 
            className={`acceptButton ${allAccepted ? 'ready' : 'disabled'}`}
            onClick={handleFinalAccept}
            disabled={!allAccepted}
          >
            <CheckIcon />
            {allAccepted ? 'ยอมรับข้อกำหนดทั้งหมด' : 'กรุณาอ่านและยอมรับข้อกำหนดทุกข้อ'}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="trust-section">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="badge-icon">🔒</div>
              <span>ข้อมูลปลอดภัย</span>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">✅</div>
              <span>ตรวจสอบแล้ว</span>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🏆</div>
              <span>บริการมาตรฐาน</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}