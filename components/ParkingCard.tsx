import React from 'react';
import styles from '../styles/shopcard.module.css';
import { ParkingInfo } from '../pages/parkovka';

interface ParkingCardProps {
  info: ParkingInfo;
  onLeaveRequest: (selectedInfo: ParkingInfo) => void;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ info, onLeaveRequest }) => (
  <div className={styles.parkingCard}>
    <h3 className={styles.name}>{info.name}</h3>
    <p className={styles.description}>{info.description}</p>
    <p className={styles.participation}>{info.participation}</p>
    <div className={styles.priceContainer}>
      <p className={styles.priceLabel}>Цена:</p>
      <p className={styles.price}>
        {info.price}
        <button className={styles.parkingButton} onClick={() => onLeaveRequest(info)}>
          Оставить заявку
        </button>
      </p>
    </div>
  </div>
);

export default ParkingCard;
