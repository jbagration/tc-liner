import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MiddleFooter from './MiddleFooter';
import SmallFooter from './SmallFooter';
import styles from '../styles/footer.module.css';

const Footer: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSmallScreen(screenWidth < 478);
      setIsMiddleScreen(screenWidth >= 478 && screenWidth < 960);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
<>
      {isSmallScreen && <SmallFooter />}
      {isMiddleScreen && <MiddleFooter />}
      {!isSmallScreen && !isMiddleScreen && (
        <footer className={styles.footer}>
          <div className={styles.leftSection}>
        <img src="/footerlogo.svg" alt="TCLiner Logo" className={styles.logo} onClick={scrollToTop}/>
        <div className={styles.icons}>
        <Image src="/telegram.svg" alt="telegram" width={23} height={23} />
          <Image src="/whatsapp.svg" alt="whatsapp" width={23} height={23} />
          <Image src="/phone.svg" alt="phone" width={26} height={26} />
          <Image src="/message.svg" alt="message" width={26} height={26} />
        </div>
        <p>&copy; 2023 tcliner.ru.</p>
        <p>Все права защищены.</p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.columns}>
          <div className={styles.column1}>
            <ul>
              <li><Link href="/magaziny">Магазины</Link></li>
              <li><Link href="/eda">Еда</Link></li>
              <li><Link href="/uslugy">Услуги</Link></li>
              <div className={styles.privacyItem}>
        <Link href="/privacy-policy">Политика конфиденциальности</Link>
      </div></ul>
          </div>

          <div className={styles.column2}>
            <ul>
              <li><Link href="/novosti">Новости</Link></li>
              <li><Link href="/parkovka">Парковка</Link></li>
              <li><Link href="/o-nas">О нас</Link></li>
              <div className={styles.processingItem}>
        <Link href="/personal-data-processing-policy">
            <div className={styles.processingItem}>
              <span className={styles.firstPart}>Положение об обработке</span>
              <span className={styles.secondPart}>персональных данных</span>
            </div>
        </Link>
      </div>
            </ul>
          </div>

          <div className={styles.column3}>
            <ul>
              <li><Link href="/arendatoram">Арендаторам</Link></li>
              <li><Link href="/kontakty">Контакты</Link></li>
              <div className={styles.consentItem}>
        <Link href="/consent-to-process-personal-data">
            <div>
              <span className={styles.firstPart}>Согласие на обработку</span>
              <span className={styles.secondPart}>персональных данных</span>
            </div>
        </Link>
      </div>
            </ul>
          </div>
        </div>
        </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
