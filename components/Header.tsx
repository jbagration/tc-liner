import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/header.module.css';
import { useRouter } from 'next/router';
import DropdownMenu from './DropdownMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.add(styles.modalOpen);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove(styles.modalOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const secondPartMarginTop = scrollPosition === 0 ? 90 : 0;

  return (
    <header >
    <div className={`${styles.header}`}>
    <div className={styles.firstPartContainer}>
      <div className={styles.firstPart}>
        <div className={styles.left}>
          <p>Нововатутинский проспект, 6</p>
          <p>          <Image src="/clock.svg" alt="Clock" width={20} height={20} />
10:00 - 22:00</p>
        </div>
        <div className={styles.middle}>
          <p className={styles.middleMap}>          <Image src="/map.svg" alt="Map" width={25} height={25} />
          <Link href="/kak-dobratsya">          
Как добраться</Link></p>
<p > <Image src="/book.svg" alt="Book" width={25} height={25} /><Link href="/skhema-trts/1-etazh">          
Схема ТЦ</Link></p>
        </div>
        <div className={styles.right}>
          <Image src="/header-telegram.svg" alt="Telegram" width={38} height={38} />
          <Image src="/header-whatsapp.svg" alt="WhatsApp" width={38} height={38} />
        </div>
      </div>
      </div>
      <div className={styles.secondPartContainer}
      style={{ marginTop: `${secondPartMarginTop}px` }}>
      <div
          className={styles.secondPart}
        >      
        <div className={styles.logoContainer}>
      <img
        src="/header-logo.jpg"
        alt="TCLiner Logo"
        className={styles.logo}
        onClick={handleLogoClick}
        role="button"
      />
    </div>
  <div className={styles.centerContainer}>
    <ul className={styles.centeredList}>
      <Link href="/magaziny">Магазины</Link>
      <Link href="/eda">Еда</Link>
      <Link href="/uslugy">Услуги</Link>
      <Link href="/novosti">Новости</Link>
      <Link href="/parkovka">Парковка</Link>
    </ul>
  </div>
  <div className={styles.menu}>
  <button className={styles.menuButton} onClick={toggleMenu}>
      <Image src="/menu.svg" alt="Menu" width={50} height={50} />
      <span className={styles.menuText}>Меню</span>
    </button></div>
</div>    
</div>
<div className={isMenuOpen ? `${styles.menu} ${styles['menuOpen']}` : styles.menu}>
      <DropdownMenu isOpen={isMenuOpen} onClose={closeMenu} />
    
    </div>
    </div>  
    </header>
  );
};

export default Header;
