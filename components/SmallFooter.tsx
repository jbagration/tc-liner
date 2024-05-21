import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/footer.module.css';

const SmallFooter: React.FC = () => {
    return (
      <footer className={styles.footerSmaller}>
<div className={styles.columns}>
          <div className={styles.column1}>
            <ul>
              <li><Link href="/magaziny">Магазины</Link></li>
              <li><Link href="/eda">Еда</Link></li>
              <li><Link href="/uslugy">Услуги</Link></li>
              </ul>
          </div>
          <div className={styles.column2}>
            <ul>
              <li><Link href="/novosti">Новости</Link></li>
              <li><Link href="/parkovka">Парковка</Link></li>
              <li><Link href="/o-nas">О нас</Link></li>
              <div className={styles.processingItem}>
      </div>
            </ul>
          </div>
          <div className={styles.column3}>
            <ul>
              <li><Link href="/arendatoram">Арендаторам</Link></li>
              <li><Link href="/kontakty">Контакты</Link></li>
              <div className={styles.consentItem}>
      </div>
            </ul>
          </div>
        </div>
        <form className={styles.subscribeForm}>
          <label htmlFor="email" className={styles.subscribeLabel}>
            Подписаться на новости:
          </label>
          <div className={styles.subscribeInputBlock}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={styles.subscribeInput}
          />
          <button type="submit" className={styles.subscribeButton}>
            <Image src="/arrow-right-circle.svg" alt="arrow" width={30} height={30} />
          </button>
          </div>
        </form>
        <div className={styles.leftSection}>
        <div className={styles.icons}>
        <Image src="/telegram.svg" alt="telegram" width={23} height={23} />
          <Image src="/whatsapp.svg" alt="whatsapp" width={23} height={23} />
          <Image src="/phone.svg" alt="phone" width={26} height={26} />
          <Image src="/message.svg" alt="message" width={26} height={26} />
        </div>
        <p>&copy; 2023 tcliner.ru.</p>
        <p>Все права защищены.</p>
      </div>
      <div className={styles.columns}>
            <div className={styles.privacyColumns}>
              <div className={styles.privacyItem}>
        <Link href="/privacy-policy">Политика конфиденциальности</Link>
      </div>
              <div className={styles.privacyItem}>
        <Link href="/personal-data-processing-policy">Положение об обработке персональных данных
        </Link>
      </div>
              <div className={styles.privacyItem}>
        <Link href="/consent-to-process-personal-data">Согласие на обработку персональных данных
        </Link>
      </div>
      </div>
          </div>
      </footer>
    );
  };
  
  export default SmallFooter;



  