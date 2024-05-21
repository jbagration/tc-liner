import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import Map from '../components/Map';
import styles from '../styles/shopcard.module.css';

const HowToGetTherePage: React.FC = () => {
  const [showMetro, setShowMetro] = useState<boolean>(true);
  const [showCar, setShowCar] = useState<boolean>(false);

  const toggleMetro = () => {
    setShowMetro(true);
    setShowCar(false);
  };

  const toggleCar = () => {
    setShowCar(true);
    setShowMetro(false);
  };

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
          <Image src="/location.svg" alt="Directions" width={112} height={112} />
          <h1>Как добраться</h1>
        </div>

        <div className={styles.filterContainer}>
  <div className={`${styles.buttonsContainerCar} ${styles.buttonsContainer}`}>
          <button
      onClick={toggleMetro}
      className={showMetro ? styles.active : ''}
    >
            <div className={styles.roundImageContainer}>
        <Image src="/metro.svg" alt="Search" width={30} height={30} />
      </div>
      На метро
    </button>
    <button
      onClick={toggleCar}
      className={showCar ? styles.active : ''}
    >
            <div className={styles.roundImageContainer}>
        <Image src="/car.svg" alt="Search" width={30} height={30} />
      </div>
      На машине
    </button>
          </div>

          <div className={styles.directionsText}>
            {showMetro && (
              <p>
                Удобный способ добраться до ТРЦ Лайнер — на метро, минуя пробки! Выход №1 со станции метро «Солнцево».
                Далее прямо по улице Попутная до улицы Авиаторов. Следуйте по улице Авиаторов до пешеходного перехода
                на другую сторону дороги. Далее идите прямо еще около 600 метров, пока с правой стороны не увидите ТРЦ Лайнер.
              </p>
            )}
            {showCar && (
              <p>
                Комфортно добраться до ТРЦ Лайнер вы можете на личном автотранспорте. Выбирайте для себя наиболее удобный маршрут и приезжайте к нам в выходные и будние дни.
              </p>
            )}
          </div>
        </div>
        <div className={styles.infoItemCar}>
              <div className="ya-taxi-widget" data-ref="https%3A%2F%2Ftclainer.frontend.demowts.ru%2F" data-proxy-url="https://{app}.redirect.appmetrica.yandex.com/route?start-lat={start-lat}&amp;start-lon={start-lon}&amp;end-lat={end-lat}&amp;end-lon={end-lon}&amp;tariffClass={tariff}&amp;ref={ref}&amp;appmetrica_tracking_id={redirect}&amp;lang={lang}" data-tariff="econom" data-app="3" data-lang="ru" data-redirect="1178268795219780156" data-description="Москва, Россия, улица Льва Толстого, 16" data-size="s" data-theme="action" data-title="Вызвать такси" data-use-location="true" data-point-a="" data-point-b="37.588144,55.733842"></div>
            </div>
            <Map />
      </div>
    </Layout>
  );
};

export default HowToGetTherePage;
