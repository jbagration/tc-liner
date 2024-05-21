import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Map from '../components/Map';
import AdminsSection from '../components/AdminsSection';
import Image from 'next/image';
import styles from '../styles/shopcard.module.css';
import { Administrator, getAdministration } from '@/lib/api';
import Link from 'next/link';


const ContactsPage: React.FC = () => {
  const [admins, setAdmins] = useState<Administrator[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminData = await getAdministration();
        setAdmins(adminData || []);
      } catch (error) {
        console.error('Error fetching administration:', error);
      }
    };

    fetchAdmins();
  }, []);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://yastatic.net/taxi-widget/ya-taxi-widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.borderContainer}>
          <Image src="/contacts.svg" alt="contacts" width={112} height={112} />
          <h1>Контакты</h1>
          </div>
          
          <div className={styles.infoSection}>
          <div className={styles.infoItem}>
  <h2>Адрес</h2>
  <p>г. Москва, улица Авиаторов, 3а</p>
  <Link href="/kak-dobratsya">
    <div className={styles.infoItemAdress}>КАК ДОБРАТЬСЯ</div>
  </Link>
</div>

            <div className={styles.infoItem}>
              <h2>Телефоны</h2>
              <div>
                <h3>ИНФОСТОЙКА</h3>
                <p>+7 495 197 88 08</p>
              </div>
              <div>
                <h3>ПАРКОВКА</h3>
                <p>+7 495 162 88 08</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <h2>График работы</h2>
              <div>
                <h3>ЕЖЕДНЕВНО:</h3>
                <div className={styles.infoItemTime}>
                  <Image src="/clock.svg" alt="Clock" width={24} height={24} />
                  <p>10:00 - 22:00</p>
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className="ya-taxi-widget" data-ref="https%3A%2F%2Ftclainer.frontend.demowts.ru%2F" data-proxy-url="https://{app}.redirect.appmetrica.yandex.com/route?start-lat={start-lat}&amp;start-lon={start-lon}&amp;end-lat={end-lat}&amp;end-lon={end-lon}&amp;tariffClass={tariff}&amp;ref={ref}&amp;appmetrica_tracking_id={redirect}&amp;lang={lang}" data-tariff="econom" data-app="3" data-lang="ru" data-redirect="1178268795219780156" data-description="Москва, Россия, улица Льва Толстого, 16" data-size="s" data-theme="action" data-title="Вызвать такси" data-use-location="true" data-point-a="" data-point-b="37.588144,55.733842"></div>
            </div>
          </div>
          <Map />
          <AdminsSection admins={admins} />
        </div>
    </Layout>
  );
};

export default ContactsPage;
