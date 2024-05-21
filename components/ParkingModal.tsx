import React from 'react';
import styles from '../styles/shopcard.module.css';
import { ParkingInfo } from '../pages/parkovka';

interface ParkingModalProps {
    show: boolean;
    onClose: () => void;
    selectedCard: ParkingInfo | null;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFormSubmit: (e: React.FormEvent) => void;
    formData: {
      fullName: string;
      carMake: string;
      carNumber: string;
      phoneNumber: string;
      email: string;
    };
  }
  
  const ParkingModal: React.FC<ParkingModalProps> = ({
    show,
    onClose,
    selectedCard,
    onFormChange,
    onFormSubmit,
    formData,
  }) => (
    show && (
        <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent}>
          <form onSubmit={onFormSubmit}>
            <span className={styles.closeButton} onClick={onClose}></span>
  
    <h2>Заявка на абонемент с фиксированным местом тариф «{selectedCard?.name}»</h2>
      
        
        <div>
          <label htmlFor="fullName">ФИО</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onFormChange}
            required
          />
        </div>
        <div>
          <label htmlFor="carMake">Марка машины</label>
          <input
            type="text"
            id="carMake"
            name="carMake"
            value={formData.carMake}
            onChange={onFormChange}
            required
          />
        </div>
        <div>
          <label htmlFor="carNumber">Номер машины</label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            value={formData.carNumber}
            onChange={onFormChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Номер телефона</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onFormChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onFormChange}
            required
          />
        </div>

        <button type="submit">Отправить</button>
      <p>Нажимая на кнопку, вы соглашаетесь на обработку ваших персональных данных.</p>
    
    </form>
    </div>

  </div>
  )
);

export default ParkingModal;
