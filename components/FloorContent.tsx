import React from 'react';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import styles from '../styles/shopcard.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic'; 

interface FloorContentProps {
  floorNumber: number;
  routerPathname: string;
}

const isClient = typeof window !== 'undefined';
const L = isClient ? require('leaflet') : null;

const FloorMap = dynamic(() => import('./FloorMap'), {
  ssr: false, 
});

const FloorContent: React.FC<FloorContentProps> = ({ floorNumber }) => {
  let floorButtons: React.ReactNode;

  const isFloorActive = (targetFloor: number) => {
    return floorNumber === targetFloor;
  };

  switch (floorNumber) {
    case 10:
        floorButtons = (
            <div className={styles.filterButtons}>
              <button>
                <Image src="/escalator.svg" alt="Escalator" width={20} height={20} />
                ЭСКАЛАТОРЫ
              </button>
              <button>
                <Image src="/hanger.svg" alt="Wardrobe" width={20} height={20} />
                ГАРДЕРОБ
              </button>
            </div>
          );
      break;
    case 1:
      floorButtons = (
        <div className={styles.filterButtons}>
          <button>
            <Image src="/atm.svg" alt="ATM" width={20} height={20} />
            БАНКОМАТЫ
          </button>
          <button>
            <Image src="/wc.svg" alt="WC toilet" width={20} height={20} />
            ТУАЛЕТЫ
          </button>
          <button>
            <Image src="/escalator.svg" alt="Escalator" width={20} height={20} />
            ЭСКАЛАТОРЫ
          </button>
        </div>
      );
      break;
    case 2:
        floorButtons = (
            <div className={styles.filterButtons}>
              <button>
                <Image src="/atm.svg" alt="ATM" width={20} height={20} />
                БАНКОМАТЫ
              </button>
              <button>
                <Image src="/escalator.svg" alt="Escalator" width={20} height={20} />
                ЭСКАЛАТОРЫ
              </button>
            </div>
          );
      break;
    case 3:
        floorButtons = (
          <div className={styles.filterButtons}>
            <button>
              <Image src="/atm.svg" alt="ATM" width={20} height={20} />
              БАНКОМАТЫ
            </button>
            <button>
              <Image src="/wc.svg" alt="WC toilet" width={20} height={20} />
              ТУАЛЕТЫ
            </button>
            <button>
              <Image src="/escalator.svg" alt="Escalator" width={20} height={20} />
              ЭСКАЛАТОРЫ
            </button>
          </div>
        );
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <div className={styles.borderContainer}>
        <Image src="/book.svg" alt="Directions" width={112} height={112} />
        <h1>Карта ТЦ</h1>
      </div>
      <div className={styles.searchAndFloorContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <Image src="/loop.svg" alt="Search" width={16} height={16} />
          </div>
          <input type="text" placeholder="Поиск" />
        </div>
        <div className={styles.floorContainer}>
          <Image src="/floors.svg" alt="Floor" width={24} height={24} />
          <p>Этажи</p>
          <div className={styles.floorButtons}>
            <Link href="/skhema-trts/10-etazh/" passHref>
            <button className={isFloorActive(10) ? styles.activeFloorButton : ''}>0</button>
            </Link>
            <Link href="/skhema-trts/1-etazh/" passHref>
              <button className={isFloorActive(1) ? styles.activeFloorButton : ''}>1</button>
            </Link>
            <Link href="/skhema-trts/2-etazh/" passHref>
              <button className={isFloorActive(2) ? styles.activeFloorButton : ''}>2</button>
            </Link>
            <Link href="/skhema-trts/3-etazh/" passHref>
              <button className={isFloorActive(3) ? styles.activeFloorButton : ''}>3</button>
            </Link>
          </div>
        </div>
      </div>
      {floorButtons}
      <Image src="/2-etazh.jpg" alt="Slider Image 1" width={1200} height={600} />
    </div>
  );
};

export default FloorContent;