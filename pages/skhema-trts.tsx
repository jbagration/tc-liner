import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/shopcard.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'leaflet/dist/leaflet.css';

const SchemePage: React.FC = () => {
  const router = useRouter();
  const floorNumber = parseInt(router.query.etazh as string) || 1;

  let floorButtons: React.ReactNode;

  switch (floorNumber) {
    case 1:
      floorButtons = (
        <div className={styles.filterButtons}>
          <button>
          <Image src="/atm.svg" alt="ATM" width={20} height={20} />
            БАНКОМАТЫ</button>
          <button>          
            <Image src="/wc.svg" alt="WC toilet" width={20} height={20} />
            ТУАЛЕТЫ</button>
          <button>
          <Image src="/escalator.svg" alt="Escalator" width={20} height={20} />
            ЭСКАЛАТОРЫ</button>
        </div>
      );
      break;
  }
  
  
  return (
    <Layout>
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
            <button className={router.pathname === '/skhema-trts/10-etazh/' ? styles.active : ''}>0</button>
          </Link>
          <Link href="/skhema-trts/1-etazh/" passHref>
            <button className={router.pathname === '/skhema-trts' ? styles.activeFloorButton : ''}>1</button>
          </Link>
          <Link href="/skhema-trts/2-etazh/" passHref>
            <button className={router.pathname === '/skhema-trts/2-etazh/' ? styles.active : ''}>2</button>
          </Link>
          <Link href="/skhema-trts/3-etazh/" passHref>
            <button className={router.pathname === '/skhema-trts/3-etazh/' ? styles.active : ''}>3</button>
          </Link>
            </div>
          </div>
        </div>
        {floorButtons}
      </div>
    </Layout>
  );
};

export default SchemePage;
