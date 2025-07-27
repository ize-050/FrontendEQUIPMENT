import React from 'react';
import MainHeader from '../../../components/MainHeader';
import styles from './listequipment.module.css';

const ListEquipmentPage = () => {
  return (
    <div className={styles.pageContainer}>
      <MainHeader />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>รายการอุปกรณ์ของฉัน</h1>
        <div className={styles.placeholder}>
          {/* Equipment items will be listed here */}
        </div>
      </main>
    </div>
  );
};

export default ListEquipmentPage;