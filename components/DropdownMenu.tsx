import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose }) => {
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);

  const handleResize = useCallback(() => {
    setIsMiddleScreen(window.innerWidth < 960);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleMenuItemClick = () => {
    onClose();
  };

  const menuClass = isOpen ? `${styles.menu} ${styles.menuOpen}` : styles.menu;

  return (
    <div className={menuClass}>
      <div className={styles.overlay} onClick={handleOverlayClick}></div>
      <div className={styles['menu-content']}>
        <span onClick={onClose} className={styles.closeButton}>✕</span>
        <ul>
          <li onClick={handleMenuItemClick}>
            <Link href="/o-nas">
              <span>О нас</span>
            </Link>
          </li>
          <li onClick={handleMenuItemClick}>
            <Link href="/arendatoram">
              <span>Арендаторам</span>
            </Link>
          </li>
          <li onClick={handleMenuItemClick}>
            <Link href="/kontakty">
              <span>Контакты</span>
            </Link>
          </li>
          {isMiddleScreen && (
            <>
              <li onClick={handleMenuItemClick}>
                <Link href="/magaziny">
                  <span>Магазины</span>
                </Link>
              </li>
              <li onClick={handleMenuItemClick}>
                <Link href="/eda">
                  <span>Еда</span>
                </Link>
              </li>
              <li onClick={handleMenuItemClick}>
                <Link href="/uslugy">
                  <span>Услуги</span>
                </Link>
              </li>
              <li onClick={handleMenuItemClick}>
                <Link href="/novosti">
                  <span>Новости</span>
                </Link>
              </li>
              <li onClick={handleMenuItemClick}>
                <Link href="/parkovka">
                  <span>Парковка</span>
                </Link>
              </li>
              <li onClick={handleMenuItemClick}>
                <Link href="/">
                  <span>Главная</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.socialIcons}>
          <img src="/telegram.svg" alt="telegram" width={23} height={23} />
          <img src="/whatsapp.svg" alt="whatsapp" width={23} height={23} />
          <img src="/phone.svg" alt="phone" width={26} height={26} />
          <img src="/message.svg" alt="message" width={26} height={26} />
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
