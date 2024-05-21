import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/footer.module.css';

const MiddleFooter: React.FC = () => {
    return (
      <footer className={styles.footerMiddle}>
                <div className={styles.footerMiddleLogo}>
        <img src="/footerlogo.svg" alt="TCLiner Logo" className={styles.logo} />
        <div className={styles.icons}>
        <Image src="/telegram.svg" alt="telegram" width={23} height={23} />
          <Image src="/whatsapp.svg" alt="whatsapp" width={23} height={23} />
          <Image src="/phone.svg" alt="phone" width={26} height={26} />
          <Image src="/message.svg" alt="message" width={26} height={26} />
        </div>
        <p>&copy; 2023 tcliner.ru.</p>
        <p>Все права защищены.</p>
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
        <div className={styles.footerMiddleText}>
            <ul>
              <li><Link href="/magaziny">Магазины</Link></li>
              <li><Link href="/eda">Еда</Link></li>
              <li><Link href="/uslugy">Услуги</Link></li>
              <div className={styles.privacyItem}>
        <Link href="/privacy-policy">Политика конфиденциальности</Link>
      </div></ul>
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
      </footer>
    );
  };
  
  export default MiddleFooter;
  