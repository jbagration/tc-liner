import React, { useState, useEffect } from 'react';
import styles from '../styles/shopcard.module.css';
import Layout from '@/components/Layout';
import Image from 'next/image';
import ModalImage from 'react-modal-image';
import ParkingCard from '@/components/ParkingCard';
import ParkingModal from '@/components/ParkingModal';

export interface ParkingInfo {
  name: string;
  description: string;
  participation: string;
  price: string;
}

const ParkingPage: React.FC = () => {
  const [parkingInfo, setParkingInfo] = useState<ParkingInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ParkingInfo | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    carMake: '',
    carNumber: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyData: ParkingInfo[] = [

          {
            name: 'Индивидуальный «A»',
            description: 'Парковка по тарифу «Индивидуальный» с фиксированным местом на 1 автомобиль / мес.',
            participation: 'Участвует в программе привилегий PARKING POINT Лайнер',
            price: '10 500 руб.',
          },
          {
            name: 'Семейный «F»',
            description: 'Парковка по тарифу «Семейный» на 2 автомобиля с фиксированным местом / мес.',
            participation: 'Участвует в программе привилегий PARKING POINT Лайнер',
            price: '18 000 руб.',
          },
          {
            name: 'VIP',
            description: 'Парковка по тарифу “VIP” на 1 автомобиль - парковочные места напротив центрального атриума/мес. И специальные бонусы            ',
            participation: 'Участвует в программе привилегий PARKING POINT Лайнер',
            price: '15 000 руб.',
          },
          {
            name: 'Свободный «С»',
            description: 'Парковка по тарифу «Свободный» на 1 автомобиль / мес.            ',
            participation: '',
            price: '15 000 руб.',
          },
        ];

        setParkingInfo(dummyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLeaveRequest = (selectedInfo: ParkingInfo) => {
    setSelectedCard(selectedInfo);
    setShowModal(true);
    document.body.classList.add(styles.modalOpen);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove(styles.modalOpen);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.borderContainer}>
          <Image src="/parking.svg" alt="parking" width={112} height={112} />
          <h1>Парковка</h1>
        </div>
        <h2 className={styles.pageTitle}>Ежемесячные абонементы на парковку</h2>
        <div className={styles.cardContainer}>
  {parkingInfo.map((info, index) => (
    <ParkingCard key={index} info={info} onLeaveRequest={handleLeaveRequest} />
  ))}
</div>
        <div className={styles.bottomContainer}></div>

      <div className={styles.infoBlock}>
          <div className={styles.leftSection}>
            <h2 className={styles.pageTitle}>Тарифы</h2>
            <div className={styles.tariffInfo}>
              <Image src="/clock.svg" alt="Clock" width={20} height={20} />
              <p>Первые 2 часа – БЕСПЛАТНО<br />15 минут на выезд – БЕСПЛАТНО</p>
            </div>
            <div className={styles.tariffInfo}>
              <Image src="/clock.svg" alt="Clock" width={20} height={20} />
              <p>9:00 - 22:00<br />
            Первые 2 часа бесплатно, далее 100 руб./час<br />
            Электромобили бесплатно</p></div>
            <div className={styles.tariffInfo}>
              <Image src="/clock.svg" alt="Clock" width={20} height={20} />
              <p>22:00 - 09:00<br />(Оставить машину на ночь) - 800 руб.</p>
            </div>
            <button className={styles.parkingButton}>
              Позвонить
            </button>
          </div>
          <div className={styles.rightSection}>
  <h2 className={styles.pageTitle}>Наземная и подземная парковка</h2>

  <div className={styles.blockContainer}>
    <div className={styles.blockContent}>
      <Image src="/clock.svg" alt="Clock" width={30} height={30} />
      <div>
        <h3>Круглосуточный</h3>
      </div>
    </div>
  </div>

  <div className={styles.blockContainer}>
    <div className={styles.blockContent}>
      <Image src="/floors.svg" alt="Floors" width={30} height={30} />
      <div>
        <h3>800 мест</h3>
        <p>В собственной наземной и <br />подземной парковке</p>
      </div>
    </div>
  </div>

  <div className={styles.blockContainer}>
    <div className={styles.blockContent}>
      <Image src="/power-socket.svg" alt="Clock" width={30} height={30} />
      <div>
        <h3>12 станций</h3>
        <p>Для электромобилей</p>
      </div>
    </div>
  </div>
</div>


        </div>
        <div className={styles.mapContainer}>
  <h2 className={styles.pageTitle}>Карта наземной парковки</h2>
  <div className={styles.mapImage}>
            <ModalImage
              small="/tcliner-map.png"
              large="/tcliner-map.png"
            />
<a href="/public/PRАВИЛА_ПОЛЬЗОВАНИЯ_ПАРКОВКОЙ_ТЦ_ЛАЙНЕР.pdf" target="_blank" className={styles.parkingPdfButton}>
  ПОЛНЫЕ ПРАВИЛА И ТАРИФЫ ПАРКОВКИ
</a>

  </div>

  </div>
        </div>
        {showModal && (
          <ParkingModal
  show={showModal}
  onClose={handleCloseModal}
  selectedCard={selectedCard}
  onFormChange={handleFormChange}
  onFormSubmit={handleFormSubmit}
  formData={formData}
/>
)}
    </Layout>
  );
};

export default ParkingPage;
